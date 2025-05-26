import React from 'react';
import styles from './MediaPlayer.module.css';
import { MediaItem } from './MediaItem/MediaItem';
import { Play, Pause, SkipForward, Music2, Search, Bookmark } from 'lucide-react';
import IconButton from '../ui/Buttons/IconButton/IconButton';
import { PillSpacer } from '../ui/Spacers/PillSpacer/PillSpacer';
import SpinnerLoading from '../ui/Loading/Spinner/SpinnerLoading';
import TextLabelError from '../Error/TextLabelError/TextLabelError';
import ProgressBar from '../ui/ProgressBar/ProgressBar';
import { MediaPlayerQueue } from './MediaPlayerQueue/MediaPlayerQueue';

export const MediaPlayer = ({
  queue = [],
  currentlyPlaying,
  playing,
  currentTime = 0,
  onTogglePlay = () => {},
  onSkip,
  onSeek,
  loading,
  openSearchMedia,
  error,
  openSaves = () => {},
  onReorder = () => {}
}) => {

  const duration = currentlyPlaying?.duration || 0;

  const handleSeek = (value) => {
    if (value >= 0 && value <= duration) {
        onSeek(Math.floor(value))
    }
  };

  return (
    <div className={styles.mediaPlayer}>
        <button onClick={openSearchMedia} className={styles.searchMediaButton}>
            <span className={styles.searchMediaTitle}>What do you want to play?</span>
            <span className={styles.searchMediaWrapper}>
                <Search style={{marginRight: 10}} color='var(--text-color)' />
                <PillSpacer height={'calc(100% - 20px)'}  verticle={true} />
                <div onClick={(e) => {e.stopPropagation(); openSaves()}} className={styles.saves}>
                    <Bookmark color='var(--text-color)' />
                </div>
            </span>
        </button>
        {error && (<TextLabelError error={error} label='Error:' />)}
        <MediaPlayerQueue queue={queue} onReorder={onReorder} />
        <div className={styles.controls}>
            <div className={styles.controlsLeft}>
                <IconButton 
                width={50}
                height={50}
                padding={10}
                borderRadius={'50%'}
                backgroundColor='var(--button-background)'
                Icon={playing ? <Pause color='var(--text-color)' /> : <Play color='var(--text-color)' />}
                onClick={onTogglePlay}
                title={playing ? 'Pause' : 'Play'}
                />
                <IconButton
                    Icon={<SkipForward color='var(--text-color)' />}
                    title={"Skip"}
                    onClick={onSkip}
                />
            </div>
            <div className={styles.currentlyPlaying}>
            {currentlyPlaying ? (
                <MediaItem {...currentlyPlaying} context={currentlyPlaying} />
            ) : (
            <div className={styles.nothingPlaying}>
                <Music2 width={48} /> No media playing
            </div>
            )}
            </div>
        </div>
        <div style={{position: 'relative', zIndex: 15}}>
            <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
        </div>
        {loading && (<SpinnerLoading />)}
    </div>
  );
};
