import React, { useMemo } from "react";
import styles from "./VideoTimeDisplay.module.css";

/**
 * Format N seconds -> m:ss (e.g., 0 -> 0:00, 65 -> 1:05)
 */
function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
  const sec = Math.floor(totalSeconds);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VideoTimeDisplay({
  currentTime = 0,
  duration = 0,
  className = "",
  style,
}) {
  const ct = useMemo(() => formatTime(currentTime), [currentTime]);
  const dur = useMemo(() => formatTime(duration), [duration]);

  return (
    <div
      className={`${styles.time} ${className}`}
      style={style}
      role="timer"
      aria-label={`Video time ${ct} of ${dur}`}
    >
      <span className={styles.now}>{ct}</span>
      <span className={styles.sep}> / </span>
      <span className={styles.total}>{dur}</span>
    </div>
  );
}
