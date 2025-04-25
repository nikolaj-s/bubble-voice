// VideoPreview.jsx
// VideoPreview.jsx
import React from 'react';
import styles from './VideoPreview.module.css';
import { Play } from 'lucide-react';

export const VideoPreview = ({ title, src, thumbnail, query, tags, nsfw, width, height, duration, snippet, url, action }) => {
  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isMp4 = src?.includes('.mp4');

  const getSiteName = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '').split('.')[0];
    } catch {
      return '';
    }
  };

  const siteName = getSiteName(url);

  return (
    <div 
    data-context={JSON.stringify({title, src, thumbnail, url, query, tags, nsfw, width, height, duration, type: 'video'})}
    onClick={() => {action({title, src, thumbnail, tags, nsfw, url, duration})}} className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        {isMp4 ? (
          <video 
            className={styles.video} 
            poster={thumbnail} 
            muted 
            preload="metadata"
            onMouseOver={(e) => e.currentTarget.play()} 
            onMouseOut={(e) => e.currentTarget.pause()}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <img className={styles.video} src={thumbnail} alt={title} />
        )}

        <div className={styles.overlay}>
          <Play className={styles.playIcon} />
          <span className={styles.duration}>{formatDuration(duration)}</span>
        </div>
      </div>
      <div className={styles.info}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.snippet}>{tags || snippet}</p>
        <div className={styles.meta}>
          <span className={styles.query}>{siteName}</span>
          {nsfw && <span className={styles.nsfw}>NSFW</span>}
        </div>
      </div>
    </div>
  );
};

