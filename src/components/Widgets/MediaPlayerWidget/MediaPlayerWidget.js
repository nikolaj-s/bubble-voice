import React from 'react'

import SavedMedia from '../../MediaPlayer/SavedMedia/SavedMedia'
import { useDispatch, useSelector } from 'react-redux'
import { addMediaToPlayer } from '../../../features/MediaPlayer/Thunks/addMediaToPlayer';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { fetchSavedMedia } from '../../../features/MediaPlayer/Thunks/fetchSavedMedia';

export const MediaPlayerWidget = ({editing}) => {

    const dispatch = useDispatch();
    
    const {loading: mediaPlayerLoading, enabled} = useSelector(state => state.mediaPlayerSlice);

    const {loading, error} = useSelector(state => state.savedMediaSlice);

    const {channel} = useSelector(state => state.widgetsSlice);

    const saves = useSelector(state => state.savedMediaSlice.saves[channel]);

    const playMediaInChannel = (media) => {

        if (editing) return;

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
        <>
        <SavedMedia savedItemAction={playMediaInChannel} media={saves} loading={loading} error={error} />
        </>
    )
}
