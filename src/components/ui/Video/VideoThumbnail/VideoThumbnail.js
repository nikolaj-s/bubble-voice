import React from 'react';
import { Play } from 'lucide-react';
import styles from './VideoThumbnail.module.css';
import { ImageComponent } from '../../Image/Image';

/**
 * Formats a duration in seconds into h:mm:ss or m:ss
 * @param {number} seconds
 * @returns {string}
 */
const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

/**
 * @param {Object} props
 * @param {string} props.thumbnail - Thumbnail image URL
 * @param {string} props.title - Title of the video
 * @param {number} props.duration - Duration in seconds
 */
const VideoThumbnail = ({ thumbnail, title, duration, action, width, maxWidth }) => {
  return (
    <div onClick={action} style={{width, maxWidth}} className={styles.wrapper}>
      <ImageComponent src={thumbnail} />
      <div className={styles.overlay}>
        <span className={styles.title} title={title}>{title}</span>
        <div className={styles.meta}>
          <Play size={16} className={styles.icon} />
          <span className={styles.duration}>{formatDuration(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
