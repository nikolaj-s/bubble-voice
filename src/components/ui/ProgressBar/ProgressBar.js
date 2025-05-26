import { useState, useRef } from "react";

import styles from './ProgressBar.module.css'

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const ProgressBar = ({ currentTime, duration, onSeek, width }) => {
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverX, setHoverX] = useState(0);
  const wrapperRef = useRef(null);

  const progressPercent = duration ? Math.min((currentTime / duration) * 100, 100) : 0;

  const handleMouseMove = (e) => {
    if (!wrapperRef.current || !duration) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    setHoverX(x);
    setHoverTime(duration * percent);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  const handleSeek = (e) => {
    if (!wrapperRef.current || !duration) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekTime = duration * (clickX / rect.width);
    if (seekTime < 0) return;
    onSeek(seekTime);
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.progressBarWrapper}
      onClick={handleSeek}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{width}}
    >
      {/* Hover Preview Tooltip */}
      {hoverTime !== null && (
        <div
          className={styles.hoverTooltip}
          style={{ left: `${hoverX}px` }}
        >
          {formatTime(hoverTime)}
        </div>
      )}

      {/* Current Time Tooltip */}
      <div
        className={styles.currentTooltip}
        style={{ left: `${progressPercent}%` }}
      >
        {formatTime(currentTime)}
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
