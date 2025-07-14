import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollLoadWrapper from '../ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import StickyWrapper      from '../ui/Wrappers/StickyWrapper/StickyWrapper';
import ContentPlaceholder from '../ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import TextLabelError     from '../Error/TextLabelError/TextLabelError';
import TextInput          from '../ui/Inputs/TextInput/TextInput';
import { Ban }            from 'lucide-react';

import { getMoments }        from '../../features/Moments/Thunks/getMoments';
import { setSelectedMoment } from '../../features/Moments/momentSlice';
import { setOverlay }        from '../../features/Overlay/overlaySlice';
import { MomentsItem }       from './MomentsItem/MomentsItem';

export const Moments = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    moments,
    noMoreMoments,
  } = useSelector(s => s.momentsSlice);

  const { server_id }          = useSelector(s => s.serverDetailsSlice);
  const { currentTextChannel } = useSelector(s => s.textChannelSlice);

  const [page, setPage]           = useState(1);
  const [query, setQuery]         = useState('');
  const [debouncedQuery, setDQ]   = useState(query);

  // debounce the search
  useEffect(() => {
    const h = setTimeout(() => setDQ(query.trim()), 500);
    return () => clearTimeout(h);
  }, [query]);

  // reset page when channel or query changes
  useEffect(() => {
    setPage(1);
  }, [currentTextChannel, debouncedQuery]);

  // fetch any time page, channel, server or query changes
  useEffect(() => {
    if (loading) return;
    // if page>1 but no more, skip
    if (page > 1 && noMoreMoments) return;

    dispatch(getMoments({
      channel_id: currentTextChannel || undefined,
      page,
      query: debouncedQuery
    }));
  }, [dispatch, server_id, currentTextChannel, page, debouncedQuery]);

  const openMoment = m => {
    dispatch(setSelectedMoment(m));
    dispatch(setOverlay('moment'));
  };

  const loadMore = () => {
    if (!loading && !noMoreMoments) {
      setPage(p => p + 1);
    }
  };

  return (
    <ScrollLoadWrapper
      loadMore={loadMore}
      contentGap={5}
      loading={loading}
      noMoreItems={noMoreMoments}
    >
      <StickyWrapper>
        <TextInput
          placeholder="Search Moments…"
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
        />
      </StickyWrapper>

      {error && <TextLabelError error={error} />}

      {moments.length === 0 ? (
        <ContentPlaceholder
          icon={Ban}
          title={currentTextChannel ? 'No Moments in This Channel' : 'No Moments Yet'}
        />
      ) : (
        moments.map(m => (
          <MomentsItem key={m._id} moment={m} onClick={openMoment} />
        ))
      )}
    </ScrollLoadWrapper>
  );
};
