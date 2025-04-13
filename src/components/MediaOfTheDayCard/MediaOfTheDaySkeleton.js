import React from 'react';
import styles from './MediaOfTheDaySkeleton.module.css';

const MediaOfTheDaySkeleton = () => {
  return (
    <div className={styles.mediaCard}>
      <div className={styles.mediaContent}>
        <div className={`${styles.media} ${styles.skeleton}`} />

        <div className={styles.mediaTitle}>
          <div className={`${styles.icon} ${styles.skeleton}`} />
          <div className={`${styles.titleText} ${styles.skeleton}`} />
        </div>
      </div>

      <div className={styles.mediaFooter}>
        <div className={`${styles.queryText} ${styles.skeleton}`} />
        <div className={styles.mediaTags}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className={`${styles.mediaTag} ${styles.skeleton}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaOfTheDaySkeleton;
