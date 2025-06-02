import { Ellipsis, History, ListMusic, Pause, Play, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import styles from './MediaPlayerControls.module.css';
import ProgressBar from '../../ui/ProgressBar/ProgressBar';
import VolumeSlider from '../../ui/Inputs/VolumeSlider/VolumeSlider';
import { triggerContext } from '../../../lib/services/helperFunctions';

export const MediaPlayerControls = ({playing, onTogglePlay, currentTime, duration, onSkip, handleSeek, volume, onVolumeChange, muted, toggleMuted, hideQueue, toggleHideQueue, queue, currentlyPlaying, viewHistory }) => {
    return (
         <div className={styles.controlsProgressWrapper} >
            <div
            className={styles.controls}>
                <div className={styles.placeHolder} >
                    <IconButton 
                    Icon={<Ellipsis color='var(--text-color)' />}
                    title={'More'}
                    onClick={(e) => {triggerContext(e, 'media-player-overlay')}}
                    />
                    <IconButton 
                    className='hideOnMobile'
                    Icon={<History  color='var(--text-color)'/>}
                    title="View Media History"
                    onClick={viewHistory}
                    />
                </div>
                <div className={styles.controlsLeft}>
                    <IconButton 
                    Icon={
                    <>
                    {queue.length > 0 && (<div className={styles.queueIndication} />)}
                    <ListMusic color={!hideQueue ? 'var(--success-color)' : 'var(--text-color)'} />
                    </>
                    }
                    title={hideQueue ? "Show Queue" : "Hide Queue"}
                    onClick={toggleHideQueue}
                    />
                    <IconButton 
                    width={50}
                    height={50}
                    padding={10}
                    
                    borderRadius={'50%'}
                    backgroundColor='var(--accent-color)'
                    Icon={playing ? <Pause color='var(--text-color)' /> : <Play color='var(--text-color)' />}
                    onClick={onTogglePlay}
                    title={playing ? 'Pause' : 'Play'}
                    />
                    <IconButton
                        disabled={queue.length === 0 && !currentlyPlaying}
                        Icon={<SkipForward color='var(--text-color)' />}
                        title={"Skip"}
                        onClick={onSkip}
                    />
                </div>
                <div className={styles.audioControls}>
                    <IconButton 
                    title={muted ? 'Unmute' : 'Mute'}
                    onClick={toggleMuted}
                    Icon={
                        muted ?
                        <VolumeX color='var(--text-color)' />
                        :
                        volume < 0.5 ?
                        <Volume1 color='var(--text-color)'/>
                        :
                        <Volume2 color='var(--text-color)' />
                    }
                    />
                    <VolumeSlider className={'hideOnMobile'} onChange={onVolumeChange} value={volume} step={0.01} maxWidth={80} max={1} min={0} label={volume * 100} />
                </div>
            </div>
            <div style={{position: 'relative', zIndex: 15}}>
                <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
            </div>
        </div>
    )
}
