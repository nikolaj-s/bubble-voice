import React from 'react';
import styles from './MediaPlayer.module.css';
import { MediaItem } from './MediaItem/MediaItem';
import { Play, Pause, SkipForward, Music2, Search, Bookmark } from 'lucide-react';
import IconButton from '../ui/Buttons/IconButton/IconButton';
import { LineSpacer } from '../ui/Spacers/LineSpacer/LineSpacer';
import { ToolBar } from '../ui/Wrappers/ToolBar/ToolBar';
import { PillSpacer } from '../ui/Spacers/PillSpacer/PillSpacer';
import EmptyListPlaceholder from '../ui/Placeholders/EmptyListPlaceholder/EmptyListPlaceholder';
import SpinnerLoading from '../ui/Loading/Spinner/SpinnerLoading';
import TextLabelError from '../Error/TextLabelError/TextLabelError';

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
  error
}) => {

  const duration = currentlyPlaying?.duration || 0;

  const progressPercent = duration ? Math.min((currentTime / duration) * 100, 100) : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(Math.min(newTime, duration));
  };

  return (
    <div className={styles.mediaPlayer}>
        <button onClick={openSearchMedia} className={styles.searchMediaButton}>
            <span className={styles.searchMediaTitle}>What do you want to play?</span>
            <span className={styles.searchMediaWrapper}>
                <Search style={{marginRight: 10}} color='var(--text-color)' />
                <PillSpacer  verticle={true} />
                <div className={styles.saves}>
                    <Bookmark color='var(--text-color)' />
                </div>
            </span>
        </button>
        {error && (<TextLabelError error={error} label='Error:' />)}
        <div className={styles.queue}>
            {queue.length > 0 ? (
            queue.slice().reverse().map((media, index) => (
                <MediaItem key={media._id || index} {...media} inQueue={true} />
            ))
            ) : (
            <EmptyListPlaceholder message='No Media In The Queue' />
            )}
        </div>
     
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
                <MediaItem {...currentlyPlaying} />
            ) : (
                <span className={styles.title}><Music2 size={16} /> No media playing</span>
            )}
            </div>
        </div>

        <div className={styles.progressBarWrapper} onClick={handleSeek}>
            <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>
        </div>
        {loading && (<SpinnerLoading />)}
    </div>
  );
};
