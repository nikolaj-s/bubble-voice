import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import { fetchMediaHistory } from '../../../features/MediaPlayer/Thunks/fetchMediaHistory';
import { MediaItem } from '../../../components/MediaPlayer/MediaItem/MediaItem';
import styles from './MediaPlayerHistory.module.css';
import TextInput from '../../../components/ui/Inputs/TextInput/TextInput';
import StickyWrapper from '../../../components/ui/Wrappers/StickyWrapper/StickyWrapper';
import { addMediaToPlayer } from '../../../features/MediaPlayer/Thunks/addMediaToPlayer';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import NoMediaHistoryPlaceholder from './NoMediaHistoryPlaceholder/NoMediaHistoryPlaceholder';
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import { HistoryIcon } from 'lucide-react';

export const MediaPlayerHistory = () => {
    const dispatch = useDispatch();

    const [page, setPage] = React.useState(1);
    const [title, setTitle] = React.useState("");
    const [query, setQuery] = React.useState("");
    const [localLoading, setLocalLoading] = React.useState(false);
    const [throttleTimeout, setThrottleTimeout] = React.useState(null);

    const { currentVoiceChannel } = useSelector(state => state.voiceChannelSlice);
    const { history, loading, error, no_more } = useSelector(state => state.mediaHistorySlice.historyByChannel[currentVoiceChannel]) || { history: [] };

    // Debounced dispatch for fetching media history
    React.useEffect(() => {
        if (!currentVoiceChannel) return;

        setLocalLoading(true);
        const timeout = setTimeout(() => {
            dispatch(fetchMediaHistory({ channel_id: currentVoiceChannel, page, title }))
                .finally(() => setLocalLoading(false));
        }, 350); // adjust debounce ms as needed

        return () => clearTimeout(timeout);
    }, [currentVoiceChannel, dispatch, page, title]);

    // Debounce query -> title for searching
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setTitle(query);
        }, 400); // slightly less than above to help UX

        return () => clearTimeout(timeout);
    }, [query]);

    // Throttled loadMore: only allow once every 700ms
    const loadMoreRef = React.useRef();
    loadMoreRef.current = () => {
        if (throttleTimeout) return;
        setLocalLoading(true);
        setPage(p => p + 1);
        const timeout = setTimeout(() => setThrottleTimeout(null), 700);
        setThrottleTimeout(timeout);
    };

    React.useEffect(() => () => {
        // Clean up timeouts on unmount
        if (throttleTimeout) clearTimeout(throttleTimeout);
    }, [throttleTimeout]);

    const handlePlay = (media) => {
        dispatch(addMediaToPlayer(media));
        dispatch(setOverlay("mediaPlayer"));
    };

    return (
        <ScrollLoadWrapper
            noMoreItems={no_more}
            loadMore={() => loadMoreRef.current()}
            loading={loading || localLoading}
        >
            <ContentHeader title={"Media Time Machine"} subTitle={"Relive your channel’s greatest hits — from guilty pleasures to legendary jams!"} Icon={HistoryIcon} />
            <StickyWrapper stickyOffset={25} >
                <TextInput value={query} onChange={setQuery} placeholder={'Search'} />
                <TextLabelError error={error} />
            </StickyWrapper>
            <div className={styles.mediaWrapper}>
                {history?.length === 0 && (!loading && !localLoading)
                    ? <NoMediaHistoryPlaceholder />
                    : history?.map((media, key) => (
                        <MediaItem position={key} {...media} key={key} action={() => { handlePlay(media) }} context={media} inQueue={false} />
                    ))}
            </div>
        </ScrollLoadWrapper>
    )
}
