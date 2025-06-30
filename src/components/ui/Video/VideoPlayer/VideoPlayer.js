import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Fullscreen, Maximize, PlayCircle, Volume2, VolumeX } from 'lucide-react';
import styles from './VideoPlayer.module.css';
import VolumeSlider from '../../Inputs/VolumeSlider/VolumeSlider';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../ProgressBar/ProgressBar';
import RedditAudioSrc from '../../../RedditAudioSrc/RedditAudioSrc';
import ReactPlayer from 'react-player';
import IconButton from '../../Buttons/IconButton/IconButton';
import { expandVideo } from '../../../../features/Media/ExpandedVideo/expandedVideoSlice';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

const INACTIVITY_TIMEOUT = 2500;

const VideoPlayer = ({ src, title }) => {

  const dispatch = useDispatch();

  const playerRef = useRef(null);

  const hideControlsTimeoutRef = useRef(null);

  const [interacted, toggleInteracted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [volumeHover, toggleVolumeHover] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { muteVideo } = useSelector(state => state.contentSettingsSlice);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  const handleSeek = (value) => {
    playerRef.current?.seekTo(value, 'seconds');
    setCurrentTime(value);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (!newMuted && volume === 0) {
      setVolume(50);
    }
  };

  useEffect(() => {
    if (muteVideo) {
      setIsMuted(true);
    }
  }, [muteVideo]);

  useEffect(() => {
    return () => clearTimeout(hideControlsTimeoutRef.current);
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeoutRef.current);
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, INACTIVITY_TIMEOUT);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setShowControls(false);
        clearTimeout(hideControlsTimeoutRef.current);
      }}
      className={`${styles.customVideoContainer} ${!showControls ? styles.hideCursor : ''}`}
      data-context={JSON.stringify({ type: 'video', src, title: title || src, duration: Math.floor(duration), query: title || src })}
    >
      <ReactPlayer
        ref={playerRef}
        url={duration === 0 ? src : interacted ? src : null}
        playing={isPlaying}
        muted={isMuted}
        volume={volume / 100}
        width="100%"
        height="100%"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onError={(e) => {console.log(e)}}
        controls={false}
        playsinline
      />
      <RedditAudioSrc autoPlay={false} currentTime={currentTime} isPlaying={isPlaying} muted={isMuted} url={src} volume={volume / 100} />
      <div className={styles.overlay} style={{opacity: isPlaying ? 0 : null}} onClick={() => {togglePlay(); toggleInteracted(true)}}>
          {!isPlaying && (<PlayCircle size={64} className={styles.overlayPlayIcon} />)}
      </div>
      <div className={styles.videoControls}>
        <div className={styles.controlWrapper}>
          <ProgressBar width="100%" duration={duration} currentTime={currentTime} onSeek={handleSeek} />
          <div className={styles.volumeControl}>
            <div onMouseEnter={() => toggleVolumeHover(true)} className={styles.volumeWrapper}>
              <button onClick={toggleMute} className={styles.controlButton}>
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
                <div
                  className={styles.volumeSlider}
                >
                  <VolumeSlider
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={handleVolumeChange}
                    label={volume}
                  />
                </div>
            </div>
            <IconButton Icon={Maximize} title={'Expand'} onClick={() => {dispatch(expandVideo({src})); dispatch(setOverlay('expandVideo')); setIsPlaying(false)}} />
          </div>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default VideoPlayer;
