import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PlayCircle, PauseCircle, Maximize2, Volume2, VolumeX } from 'lucide-react';
import styles from './VideoPlayer.module.css';
import VolumeSlider from '../../Inputs/VolumeSlider/VolumeSlider';
import { useSelector } from 'react-redux';
import ProgressBar from '../../ProgressBar/ProgressBar';

const VideoPlayer = ({ src }) => {

  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(100);
   // volume from 0 to 100
  const [volumeHover, toggleVolumeHover] = useState(false);

  const {muteVideo} = useSelector(state => state.contentSettingsSlice);

  // Toggle play/pause
  const togglePlay = () => {
    try {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current?.pause();
        } else {
          videoRef.current?.play().catch(() => {});
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
    
  };

  // Update current time and duration on video events
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setVolume(video.volume * 100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Update playing state when video plays or pauses
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {

    if (videoRef.current && muteVideo) {

      const newMuted = true;

      setIsMuted(newMuted);
      
      videoRef.current.muted = newMuted;
     
    }

  }, [muteVideo])

  // Handle progress bar click (seeking)
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  // Handle volume changes via slider
  const handleVolumeChange = (newVolume) => {

    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
      if (!newMuted && volume === 0) {
        // if unmuting and volume is 0, reset to 50%
        setVolume(50);
        videoRef.current.volume = 0.5;
      }
    }
  };



  return (
    <div onMouseLeave={() => {toggleVolumeHover(false)}} className={styles.customVideoContainer}>
      <video
        onClick={togglePlay}
        ref={videoRef}
        src={src}
        className={styles.customVideo}
        controls={false}
        playsInline
      />
      {/* Overlay play button when video is not playing */}
      {!isPlaying && (
        <div className={styles.overlay} onClick={togglePlay}>
          <PlayCircle size={64} className={styles.overlayPlayIcon} />
        </div>
      )}
      <div className={styles.videoControls}>
        <div className={styles.controlWrapper}>
          <div className={styles.timeDisplay}>
            {formatTime(currentTime)}
          </div>
          <div className={styles.volumeControl}>
            <div 
            onMouseEnter={() => {toggleVolumeHover(true)}}
            className={styles.volumeWrapper}>
              <button onClick={toggleMute} className={styles.controlButton}>
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              {volumeHover && <div 
              onMouseEnter={() => {toggleVolumeHover(true)}}
              onMouseLeave={() => {toggleVolumeHover(false)}}
              className={styles.volumeSlider}>
                <VolumeSlider
                  min={0}
                  max={100}
                  step={1}
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>}
            </div>
          
          </div>
        </div>
        
       <ProgressBar duration={duration} currentTime={currentTime} onSeek={handleProgressClick} />
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default VideoPlayer;

