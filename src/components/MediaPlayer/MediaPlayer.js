
import styles from './MediaPlayer.module.css';
import { Search, Bookmark } from 'lucide-react';
import { PillSpacer } from '../ui/Spacers/PillSpacer/PillSpacer';
import SpinnerLoading from '../ui/Loading/Spinner/SpinnerLoading';
import TextLabelError from '../Error/TextLabelError/TextLabelError';
import { MediaPlayerQueue } from './MediaPlayerQueue/MediaPlayerQueue';
import { CurrentlyPlaying } from './CurrentlyPlaying/CurrentlyPlaying';
import { MediaPlayerControls } from './MediaPlayerControls/MediaPlayerControls';

export const MediaPlayer = ({
  queue = [],
  currentlyPlaying,
  playing,
  color,
  currentTime = 0,
  onTogglePlay = () => {},
  onSkip,
  onSeek,
  loading,
  openSearchMedia,
  error,
  volume,
  muted,
  hideQueue,
  toggleHideQueue = () => {},
  onVolumeChange = () => {},
  toggleMuted = () => {},
  openSaves = () => {},
  onReorder = () => {},
  viewHistory = () => {},
}) => {

  const duration = currentlyPlaying?.duration || 0;

  const handleSeek = (value) => {
    if (value >= 0 && value <= duration) {
        onSeek(Math.floor(value))
    }
  };

  return (
    <div id={'media-player-overlay'} data-context={JSON.stringify({currentlyPlaying, type: 'mediaplayer'})} className={styles.mediaPlayer}>
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
        <CurrentlyPlaying currentlyPlaying={currentlyPlaying} color={color} />
        <MediaPlayerControls 
        currentlyPlaying={currentlyPlaying}
        queue={queue}
        hideQueue={hideQueue}
        toggleHideQueue={toggleHideQueue}
        currentTime={currentTime} duration={duration} 
        handleSeek={handleSeek} onSkip={onSkip} 
        onTogglePlay={onTogglePlay} playing={playing} 
        onVolumeChange={onVolumeChange}
        volume={volume}
        muted={muted}
        toggleMuted={toggleMuted}
        viewHistory={viewHistory}
        />
        {!hideQueue && (<MediaPlayerQueue queue={queue} onReorder={onReorder} />)}
        {loading && (<SpinnerLoading />)}
    </div>
  );
};
