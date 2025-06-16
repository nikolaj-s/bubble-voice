import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMediaToPlayer } from '../../../features/MediaPlayer/Thunks/addMediaToPlayer';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { fetchSavedMedia } from '../../../features/MediaPlayer/Thunks/fetchSavedMedia';
import SavedMedia from '../../../components/MediaPlayer/SavedMedia/SavedMedia';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import { Bookmark } from 'lucide-react';

export const MediaPlayerSaves = () => {

    const dispatch = useDispatch();

    const {loading: mediaPlayerLoading, enabled} = useSelector(state => state.mediaPlayerSlice);

    const {loading, error} = useSelector(state => state.savedMediaSlice);

    const {channel} = useSelector(state => state.widgetsSlice);

    const saves = useSelector(state => state.savedMediaSlice.saves[channel]);

    const channelDetails = useSelector(state => state.channelsSlice.channels[channel]) || {};

    const playMediaInChannel = (media) => {

        if (mediaPlayerLoading || !enabled) return;

        dispatch(addMediaToPlayer(media));

        dispatch(setOverlay('mediaPlayer'));

    }

    React.useEffect(() => {

        if (!saves) {
            dispatch(fetchSavedMedia(channel))
        }

    }, [saves, dispatch, channel]);

    return (
        <ScrollLoadWrapper loading={loading}>
            <ContentHeader Icon={Bookmark} title={`Saved Media For: ${channelDetails?.channel_name}`} />
            <SavedMedia savedItemAction={playMediaInChannel} media={saves} loading={loading} error={error} />
        </ScrollLoadWrapper>
    )
}
