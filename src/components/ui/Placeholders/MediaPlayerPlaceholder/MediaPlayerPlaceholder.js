import React from 'react';
import styles from './MediaPlayerPlaceholder.module.css';
import { Play, Pause, SkipForward } from 'lucide-react';

const MediaPlayerPlaceholder = () => {
  const mockQueue = [
    { title: "Moonlight Forest", author: "Aria Nova" },
    { title: "Digital Drift", author: "Code Echo" },
    { title: "Bubble Pop", author: "Sonic Sphere" }
  ];

  const nowPlaying = {
    title: "Waves in the Cloud",
    author: "Nimbus Drive"
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.queueSection}>
        <h4 className={styles.queueTitle}>Up Next</h4>
        <ul className={styles.queueList}>
          {mockQueue.map((item, i) => (
            <li key={i} className={styles.queueItem}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.author}>{item.author}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.controls}>
          <button className={styles.iconButton}><Play size={18} /></button>
          <button className={styles.iconButton}><SkipForward size={18} /></button>
        </div>

        <div className={styles.nowPlaying}>
          <div className={styles.title}>{nowPlaying.title}</div>
          <div className={styles.author}>{nowPlaying.author}</div>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
};

export default MediaPlayerPlaceholder;
