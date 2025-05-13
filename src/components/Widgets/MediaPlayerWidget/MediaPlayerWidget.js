import React from 'react'

import SavedMedia from '../../MediaPlayer/SavedMedia/SavedMedia'
import { useDispatch, useSelector } from 'react-redux'
import { addMediaToPlayer } from '../../../features/Channel/MediaPlayer/Thunks/addMediaToPlayer';

export const MediaPlayerWidget = ({editing, saves = []}) => {

    const dispatch = useDispatch();
    
    const {loading, enabled} = useSelector(state => state.mediaPlayerSlice);

    const playMediaInChannel = (media) => {

        if (editing) return;

        if (loading || !enabled) return;

        dispatch(addMediaToPlayer(media));

    }

    return (
        <>
        <SavedMedia savedItemAction={playMediaInChannel} media={saves} />
        </>
    )
}
