import React from 'react';
import styles from './MediaItem.module.css';
import { Music2 } from 'lucide-react';

export const MediaItem = ({ title, duration, thumbnail, src }) => {
  return (
    <div className={styles.mediaItem}>
      {thumbnail ? (
        <img src={thumbnail} alt="" className={styles.thumbnail} />
      ) : (
        <div className={styles.fallbackIcon}><Music2 size={20} /></div>
      )}
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.duration}>{formatDuration(duration)}</div>
      </div>
    </div>
  );
};

const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};
