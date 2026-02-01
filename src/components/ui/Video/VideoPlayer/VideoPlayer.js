import { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Maximize, PlayCircle, Volume2, VolumeX } from 'lucide-react';
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

const VideoPlayer = ({ src, title, thumbnail, DURATION, color }) => {
  const dispatch = useDispatch();
  const { muteVideo } = useSelector((state) => state.contentSettingsSlice);

  const containerRef = useRef(null);
  const playerRef = useRef(null);

  const hideControlsTimeoutRef = useRef(null);
  const wasPlayingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DURATION || 0);

  const [volume, setVolume] = useState(100);
  const [showControls, setShowControls] = useState(true);

  // --- basic controls ---
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleProgress = useCallback((state) => {
    setCurrentTime(state.playedSeconds);
  }, []);

  const handleDuration = useCallback((dur) => {
    setDuration(dur);
  }, []);

  const handleSeek = useCallback((value) => {
    playerRef.current?.seekTo(value, 'seconds');
    setCurrentTime(value);
  }, []);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next && volume === 0) setVolume(50);
      return next;
    });
  }, [volume]);

  // --- global mute setting ---
  useEffect(() => {
    if (muteVideo) setIsMuted(true);
  }, [muteVideo]);

  // --- cleanup ---
  useEffect(() => {
    return () => clearTimeout(hideControlsTimeoutRef.current);
  }, []);

  // --- hide controls after inactivity ---
  const scheduleHideControls = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideControlsTimeoutRef.current);
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, INACTIVITY_TIMEOUT);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowControls(false);
    clearTimeout(hideControlsTimeoutRef.current);
  }, []);

  // --- auto pause when not in view ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = entry?.isIntersecting;

        if (!inView) {
          // remember if it was playing so we can resume only in that case
          wasPlayingRef.current = isPlaying;
          if (isPlaying) setIsPlaying(false);
          return;
        }

        // back in view: resume only if it was playing before leaving view
        if (wasPlayingRef.current) {
          setIsPlaying(true);
          wasPlayingRef.current = false;
        }
      },
      {
        // tweak to taste: 0.25 means it pauses when less than 25% visible
        threshold: 0.25,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [isPlaying]);

  const contextPayload = {
    type: 'video',
    src,
    title: title || src,
    duration: Math.floor(duration),
    query: title || src,
    thumbnail,
    color,
  };

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      onMouseMove={scheduleHideControls}
      onMouseLeave={handleMouseLeave}
      className={`${styles.customVideoContainer} ${!showControls ? styles.hideCursor : ''}`}
      data-context={JSON.stringify(contextPayload)}
    >
      <ReactPlayer
        ref={playerRef}
        url={src}
        playing={isPlaying}
        muted={isMuted}
        volume={volume / 100}
        width="100%"
        height="100%"
        light={isPlaying ? false : thumbnail}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onError={(e) => console.log(e)}
        controls={false}
        playsinline
      />

      <RedditAudioSrc
        autoPlay={false}
        currentTime={currentTime}
        isPlaying={isPlaying}
        muted={isMuted}
        url={src}
        volume={volume / 100}
      />

      {/* big play overlay */}
      <div
        className={styles.overlay}
        style={{ opacity: isPlaying ? 0 : undefined }}
        onClick={() => {
          togglePlay();
          scheduleHideControls();
        }}
      >
        {!isPlaying && <PlayCircle size={64} className={styles.overlayPlayIcon} />}
      </div>

      {/* controls */}
      <div className={styles.videoControls}>
        <div className={styles.controlWrapper}>
          <ProgressBar
            width="100%"
            duration={duration}
            currentTime={currentTime}
            onSeek={handleSeek}
          />

          <div className={styles.volumeControl}>
            <div className={styles.volumeWrapper}>
              <IconButton
                Icon={isMuted ? VolumeX : Volume2}
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
              />

              <div className={styles.volumeSlider}>
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

            <IconButton
              Icon={<Maximize color='var(--text-color)' strokeWidth={2.5} />}
              title="Expand"
              onClick={() => {
                dispatch(expandVideo({ src }));
                dispatch(setOverlay('expandVideo'));
                setIsPlaying(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  DURATION: PropTypes.number,
  color: PropTypes.string,
};

export default VideoPlayer;
