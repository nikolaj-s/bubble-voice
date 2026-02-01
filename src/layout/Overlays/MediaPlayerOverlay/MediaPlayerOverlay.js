
import { useMediaPlayer } from '../../../hooks/useMediaPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../../features/Search/searchSlice'
import { setOverlay } from '../../../features/Overlay/overlaySlice'
import { MediaPlayer } from '../../../components/MediaPlayer/MediaPlayer'
import { setMediaPlayerVolume, toggleHideQueue, toggleMediaPlayerMuted } from '../../../features/MediaPlayer/mediaPlayerSlice'
import { setChannelToViewWidgetsOf } from '../../../features/Widgets/widgetsSlice'

export const MediaPlayerOverlay = ({close}) => {

    const dispatch = useDispatch();

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);
    
    const {enabled, isPlaying, currentlyPlaying, queue, loading, next, toggleIsPlaying, currentTime, seek, error, reorder, color, volume, isMuted, hideQueue} = useMediaPlayer();

    const handleOpenSearchMedia = () => {
        
        dispatch(setFilter({path: "videos"}));

        dispatch(setOverlay('search'));
    }

    const handleSeek = (value) => {
        
        if (!currentlyPlaying) return;

        seek(Math.floor(value));
    }

    const openSaves = () => {
        
        dispatch(setChannelToViewWidgetsOf(currentVoiceChannel));

        dispatch(setOverlay('mediaPlayerSaves'));

    }

    const onVolumeChange = (value) => {
        dispatch(setMediaPlayerVolume(value))
    }

    const toggleMuted = () => {
        dispatch(toggleMediaPlayerMuted())
    }

    const handleToggleHideQueue = () => {
        dispatch(toggleHideQueue())
    }

    const viewHistory = () => {
        dispatch(setOverlay("mediaPlayerHistory"));
    }

    if (!enabled) return null;

    return (
        <MediaPlayer 
        onClose={close}
        queue={queue}
        currentlyPlaying={currentlyPlaying}
        playing={isPlaying}
        currentTime={currentTime}
        onTogglePlay={toggleIsPlaying}
        onSeek={handleSeek}
        loading={loading}
        onSkip={next}
        error={error}
        openSearchMedia={handleOpenSearchMedia}
        openSaves={openSaves}
        onReorder={reorder}
        color={color}
        volume={volume}
        muted={isMuted}
        onVolumeChange={onVolumeChange}
        toggleMuted={toggleMuted}
        hideQueue={hideQueue}
        toggleHideQueue={handleToggleHideQueue}
        viewHistory={viewHistory}
        />
    )
}
