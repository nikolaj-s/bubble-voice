// UniversalVideoPlayer.jsx
import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './UniversalVideoPlayer.module.css';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

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

export const UniversalVideoPlayer = ({ src, autoplay = false }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(autoplay);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hovering, setHovering] = useState(false);
  const timeoutRef = useRef(null);

  const isControllable = ReactPlayer.canPlay(src);

  const formattedSrc = isControllable ? src : getFormattedEmbedURL(src);

  const togglePlay = () => setPlaying((prev) => !prev);

  const toggleMute = () => setMuted((prev) => !prev);

  const handleProgress = (state) => {
    setProgress(state.played); // Sync internal play state
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    playerRef.current.seekTo(newProgress);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const resetHideTimeout = () => {
    clearTimeout(timeoutRef.current);
    setShowControls(true);
    timeoutRef.current = setTimeout(() => {
      if (!hovering) setShowControls(false);
    }, 2000);
  };

  useEffect(() => {
    resetHideTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, [hovering, playing]);

  return (
    <div
      className={styles.playerWrapper}
      onMouseMove={resetHideTimeout}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        timeoutRef.current = setTimeout(() => setShowControls(false), 1500);
      }}
    >
      {isControllable ? (
        <>
          <ReactPlayer
            ref={playerRef}
            url={formattedSrc}
            playing={playing}
            muted={muted}
            volume={volume}
            onProgress={handleProgress}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            controls={false}
            width="100%"
            height="100%"
            className={styles.reactPlayer}
          />
          {showControls && (
            <div className={styles.controls}>
              <button onClick={togglePlay} className={styles.controlBtn}>
                {playing ? <Pause /> : <Play />}
              </button>
              <div className={styles.volumeWrapper}>
                
                <button onClick={toggleMute} className={styles.controlBtn}>
                  {muted ? <VolumeX /> : <Volume2 />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className={styles.volumeBar}
                />
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={progress}
                onChange={handleSeek}
                className={styles.progressBar}
              />
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