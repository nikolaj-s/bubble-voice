import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PlayCircle, PauseCircle, Maximize2, Volume2, VolumeX } from 'lucide-react';
import styles from './VideoPlayer.module.css';
import VolumeSlider from '../../Inputs/VolumeSlider/VolumeSlider';
import { useSelector } from 'react-redux';
import ProgressBar from '../../ProgressBar/ProgressBar';

const INACTIVITY_TIMEOUT = 2500;

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const hideControlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [volumeHover, toggleVolumeHover] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { muteVideo } = useSelector(state => state.contentSettingsSlice);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play().catch(() => {});
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const loadMetadata = () => {
      setDuration(video.duration);
      setVolume(video.volume * 100);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', loadMetadata);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', loadMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && muteVideo) {
      setIsMuted(true);
      videoRef.current.muted = true;
    }
  }, [muteVideo]);

  const handleProgressClick = (value) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
    if (!newMuted && volume === 0) {
      setVolume(50);
      videoRef.current.volume = 0.5;
    }
  };

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
    >
      <video
        data-context={JSON.stringify({ type: 'video', src, title: src, duration: Math.floor(duration), query: src })}
        onClick={togglePlay}
        ref={videoRef}
        src={src}
        className={styles.customVideo}
        controls={false}
        playsInline
      />

      {!isPlaying && (
        <div className={styles.overlay} onClick={togglePlay}>
          <PlayCircle size={64} className={styles.overlayPlayIcon} />
        </div>
      )}

      <div className={styles.videoControls}>
        <div className={styles.controlWrapper}>
          <ProgressBar width="100%" duration={duration} currentTime={currentTime} onSeek={handleProgressClick} />
          <div className={styles.volumeControl}>
            <div onMouseEnter={() => toggleVolumeHover(true)} className={styles.volumeWrapper}>
              <button onClick={toggleMute} className={styles.controlButton}>
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              {volumeHover && (
                <div
                  onMouseEnter={() => toggleVolumeHover(true)}
                  onMouseLeave={() => toggleVolumeHover(false)}
                  className={styles.volumeSlider}
                >
                  <VolumeSlider
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default VideoPlayer;


