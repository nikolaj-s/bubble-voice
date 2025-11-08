// UniversalVideoPlayer.jsx
import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './UniversalVideoPlayer.module.css';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import ProgressBar from '../../ProgressBar/ProgressBar';
import VolumeSlider from '../../Inputs/VolumeSlider/VolumeSlider';
import IconButton from '../../Buttons/IconButton/IconButton';
import PlayPauseFlash from '../../PlayPauseFlash/PlayPauseFlash';
import RedditAudioSrc from '../../../RedditAudioSrc/RedditAudioSrc';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoVolume } from '../../../../features/Settings/Sound/soundSlice';
import VideoTimeDisplay from '../../../VideoTimeDisplay/VideoTimeDisplay';

const getFormattedEmbedURL = (src) => {
  try {
    const url = new URL(src);

    const host = url.hostname.replace('www.', '');

    if (host.includes('pornhub.com')) {
      const videoId = url.pathname.split('/').pop();
      return `https://www.pornhub.com/embed/${videoId}`;
    }
    if (host.includes('xvideos.com')) {
      const videoId = url.pathname.split('video.')[1].split('/')[0];
      return `https://www.xvideos.com/embedframe/${videoId}`;
    }
    if (host.includes('redgifs.com')) {
      const gifId = url.pathname.split('/').pop();
      return `https://redgifs.com/ifr/${gifId}`;
    }

    return src;
  } catch {
    return src;
  }
};

export const UniversalVideoPlayer = ({ src, autoplay = false, maxWidth }) => {

  const dispatch = useDispatch();

  const playerRef = useRef(null);

  const [playing, setPlaying] = useState(autoplay);

  const [muted, setMuted] = useState(false);

  const volume = useSelector(state => state.soundSlice.videoVolume)

  const [progress, setProgress] = useState(0);

  const [showControls, setShowControls] = useState(true);

  const [hovering, setHovering] = useState(false);

  const [isIdle, setIsIdle] = useState(false);

  const timeoutRef = useRef(null);

  const isControllable = ReactPlayer.canPlay(src);

  const formattedSrc = isControllable ? src : getFormattedEmbedURL(src);

  const togglePlay = () => setPlaying((prev) => !prev);

  const toggleMute = () => setMuted((prev) => !prev);

  const handleProgress = (state) => {
    setProgress(state.playedSeconds); // Sync internal play state
  };

  const handleSeek = (newProgress) => {
    
    setProgress(newProgress);

    playerRef.current.seekTo(newProgress);

  };

  const handleVolumeChange = (newVolume) => {
    dispatch(setVideoVolume(newVolume));
    setMuted(newVolume === 0);
  };

   useEffect(() => {
    return () => {
      // 1) clear your hide‐controls timeout
      clearTimeout(timeoutRef.current);

      // 2) grab the “internal” player and pause/stop it
      const internal = playerRef.current?.getInternalPlayer();
      if (internal) {
        // YouTube iframe API
        if (typeof internal.pauseVideo === 'function') {
          internal.pauseVideo();
        }
        // HTML5 <video> element
        else if (typeof internal.pause === 'function') {
          internal.pause();
        }
        // Vimeo / other players
        else if (typeof internal.stopVideo === 'function') {
          internal.stopVideo();
        }
      }
    };
  }, []);

  const resetHideTimeout = () => {
    clearTimeout(timeoutRef.current);
    setShowControls(true);
    setIsIdle(false);
  
    timeoutRef.current = setTimeout(() => {
      if (!hovering && playing) {
        setShowControls(false);
        setIsIdle(true);
      }
    }, 2000);
  };  

  useEffect(() => {
    if (playing) resetHideTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, [hovering, playing]);
  

  const onPlayerReady = () => {
    const internal = playerRef.current?.getInternalPlayer();
    
    if (internal) {
      internal.volume = volume;
    }
  };

  return (
    <div
    style={{maxWidth}}
    className={`${styles.playerWrapper} ${isIdle ? styles.idle : ''}`}
      onMouseMove={resetHideTimeout}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        timeoutRef.current = setTimeout(() => {
          setShowControls(false);
          setIsIdle(true);
        }, 500);
      }}
    >
      {isControllable ? (
        <>
          <PlayPauseFlash isPlaying={playing} />
          <ReactPlayer
            ref={playerRef}
            url={formattedSrc}
            playing={playing}
            muted={muted}
            volume={volume}
            onReady={onPlayerReady}
            playsinline
            onProgress={handleProgress}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            controls={false}
            
            width="100%"
            height="100%"
            className={styles.reactPlayer}
          />
          {/* <RedditAudioSrc currentTime={Math.floor(progress)} isPlaying={playing} muted={muted} url={src} volume={volume} /> */}
          <div className={styles.playerOverlay} onClick={togglePlay} />
          {showControls && (
            <div className={styles.controls}> 
              <ProgressBar duration={playerRef.current?.getDuration()} currentTime={progress} onSeek={handleSeek} />
              <div className={styles.buttonsWrapper}>
                <IconButton 
                onClick={togglePlay}
                title={playing ? 'Pause' : 'Play'}
                Icon={playing ? <Pause color='var(--text-color)' /> : <Play color='var(--text-color)'/>}
                />
                <div className={styles.volumeWrapper}>
                  <IconButton
                  title={muted ? 'Unmute' : 'Mute'}
                  Icon={muted ? <VolumeX color='var(--text-color)' /> : <Volume2 color='var(--text-color)' />}
                  onClick={toggleMute}
                  />
                  <VolumeSlider
                  label={volume * 100}
                  width={80}
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  />
                </div>
                <VideoTimeDisplay currentTime={progress} duration={playerRef?.current?.getDuration()} />
              </div>
            </div>
          )}
        </>
      ) : (
        <iframe
          src={formattedSrc}
          title="Embedded Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          className={styles.iframePlayer}
        />
      )}
    </div>
  );
};