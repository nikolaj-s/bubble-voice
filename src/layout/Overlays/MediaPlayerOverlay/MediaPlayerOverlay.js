import React from 'react'
import NativeFullScreenWrapper from '../../../components/ui/Wrappers/NativeFullScreenWrapper/NativeFullScreenWrapper'
import { useMediaPlayer } from '../../../hooks/useMediaPlayer'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../../features/Search/searchSlice'
import { setOverlay } from '../../../features/Overlay/overlaySlice'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import { MediaPlayer } from '../../../components/MediaPlayer/MediaPlayer'


export const MediaPlayerOverlay = ({close}) => {

    const dispatch = useDispatch();
    
    const {enabled, isPlaying, currentlyPlaying, queue, loading, next, toggleIsPlaying, currentTime, seek, error} = useMediaPlayer();

    const handleOpenSearchMedia = () => {
        
        dispatch(setFilter({path: "videos"}));

        dispatch(setOverlay('search'));
    }

    const handleSeek = (value) => {
        
        if (!currentlyPlaying) return;

        seek(Math.floor(value));
    }

    if (!enabled) return null;

    return (
        <FullScreenWrapper onClose={close}>
            <MediaPlayer 
            queue={queue}
            currentlyPlaying={currentlyPlaying}
            playing={isPlaying}
            currentTime={currentTime}
            onTogglePlay={toggleIsPlaying}
            onSeek={seek}
            loading={loading}
            onSkip={next}
            error={error}
            openSearchMedia={handleOpenSearchMedia}
            />
        </FullScreenWrapper>
    )
}
