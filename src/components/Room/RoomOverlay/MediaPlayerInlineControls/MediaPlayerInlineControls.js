
import { PillSpacer } from '../../../ui/Spacers/PillSpacer/PillSpacer';
import IconButton from '../../../ui/Buttons/IconButton/IconButton';
import { AudioLines, ChevronDown, Pause, Play, SkipForward, Volume1, Volume2, VolumeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

import styles from './MediaPlayerInlineControls.module.css';

import { useMediaPlayer } from '../../../../hooks/useMediaPlayer';
import VolumeSlider from '../../../ui/Inputs/VolumeSlider/VolumeSlider';
import { setMediaPlayerVolume, toggleMediaPlayerMuted } from '../../../../features/MediaPlayer/mediaPlayerSlice';
import { triggerContext } from '../../../../lib/services/helperFunctions';

export const MediaPlayerInlineControls = () => {

    const dispatch = useDispatch();

    const {enabled, toggleIsPlaying, isPlaying, isMuted, next, volume, showInlineControls } = useMediaPlayer();

    const handleMute = () => {
        dispatch(toggleMediaPlayerMuted());
    }

    const handleVolume = (value) => {
        dispatch(setMediaPlayerVolume(value));
    }

    if (!enabled) return null;

    return (
        <div id='room-media-player-overlay-button' data-context={JSON.stringify({type: 'mediaplayer'})} style={{display: 'flex', height: '100%', alignItems: 'center',}}>
        
        <IconButton 
        
        key={'media-player-button'}
        padding={8}
        width={60}
        height={40}
        title={'Media Player'}
        Icon={
        <>
        <AudioLines color='var(--text-color)' />
       
        </>
       }
        onClick={() => {dispatch(setOverlay('mediaPlayer'))}}
        />
        {showInlineControls && 
        <div className={`${styles.buttonWrapper} hideOnMobile`}>
            <IconButton 
            Icon={
                !isPlaying ?
                <Play color='var(--text-color)' />
                :
                <Pause color='var(--text-color)' />
            }
            title={isPlaying ? "Pause" : "Play"}
            onClick={toggleIsPlaying}
            />
            <IconButton 
            Icon={<SkipForward color='var(--text-color)' />}
            onClick={next}
            title={"Skip"}
            />
            <IconButton 
            Icon={isMuted ? <VolumeOff color='var(--text-color)' /> : volume < 0.5 ? <Volume1 color='var(--text-color)' /> : <Volume2 color='var(--text-color)' />}
            onClick={handleMute}
            title={isMuted ? "Unmute" : "Mute"}
            />
            <VolumeSlider className={'hideOnMobile'} maxWidth={80} min={0} max={1} step={0.01} value={volume} label={volume * 100} onChange={handleVolume}  />
        </div>}
        <PillSpacer verticle={true} />
        </div>
    )
}