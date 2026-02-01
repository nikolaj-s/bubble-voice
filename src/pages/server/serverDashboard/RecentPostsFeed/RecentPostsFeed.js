import React from 'react';
import ContentHeader from '../../../../components/Headers/ContentHeader/ContentHeader';
import { MessageSquareText, MessageSquareX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ContentPlaceholder from '../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import SpinnerLoading from '../../../../components/ui/Loading/Spinner/SpinnerLoading';
import { MessageItem } from '../../../../components/Chat/MessageItem/MessageItem';
import { fetchRecentPosts } from '../../../../features/RecentPostsFeed/Thunks/fetchRecentPosts';
import TextLabelError from '../../../../components/Error/TextLabelError/TextLabelError';
import RecentPostsByChannel from './RecentPostByChannel/RecentPostsByChannel';

export const RecentPostsFeed = () => {
    const dispatch = useDispatch();

    const cardRef = React.useRef(null);
    const observerRef = React.useRef(null);
    const hasLoadedRef = React.useRef(false);

    const { feed, loading, error } = useSelector((state) => state.recentPostsFeedSlice);

    const { server_id } = useSelector((state) => state.serverDetailsSlice);

    const {users} = useSelector(state => state.serverUsersSlice);

    const { channels } = useSelector((state) => state.channelsSlice);

    const groupedByChannel = React.useMemo(() => {
    const groups = {};
    for (const message of feed) {
        const channelId = message?.channel_id;
        if (!channelId) continue;
        (groups[channelId] ??= []).push(message);
    }
    return groups;
    }, [feed]);


  React.useEffect(() => {
    // Reset state when server changes
    hasLoadedRef.current = false;

    if (!server_id || !cardRef.current) return;

    // Clean up any existing observer
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            dispatch(fetchRecentPosts(server_id));
            observerRef.current?.disconnect();
            }
        },
        {
            threshold: 0.2,
            rootMargin: '150px', // preload slightly before visible
        }
    );

    observerRef.current.observe(cardRef.current);

    return () => {
        observerRef.current?.disconnect();
    };
  }, [server_id, dispatch]);

  return (
    <div style={{position: 'relative'}} ref={cardRef}>
      <ContentHeader style={{marginBottom: 10}} Icon={MessageSquareText} title="Recent Posts" />

      {error && <TextLabelError error={error} />}

      {!loading && feed?.length === 0 && (
        <ContentPlaceholder
          icon={MessageSquareX}
          title="No Recent Posts"
          message="Whoops nothing to display here!"
        />
      )}

      <RecentPostsByChannel MessageItem={MessageItem} users={users} groupedByChannel={groupedByChannel} channels={channels}  />


      {loading && <SpinnerLoading />}
    </div>
  );
};
