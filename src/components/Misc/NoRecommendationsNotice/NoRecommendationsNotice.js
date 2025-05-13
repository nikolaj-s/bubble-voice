import React from 'react';
import { Sparkles, Wand2, Meh, RefreshCw } from 'lucide-react';
import styles from './NoRecommendationsNotice.module.css';

const NoRecommendationsNotice = ({ message = "No recommendations just yet..." }) => {
  return (
    <div className={styles.notice}>
      <div className={styles.bubbles}>
        <div className={styles.bubble} />
        <div className={styles.bubble} />
        <div className={styles.bubble} />
      </div>

      <div className={styles.iconRow}>
        <Sparkles size={28} />
        <Wand2 size={28} />
        <Meh size={28} />
      </div>

      <p className={styles.text}>{message}</p>

      <div className={styles.suggestion}>
        <RefreshCw size={16} /> Try searching or adding some tags to get things bubbling.
      </div>
    </div>
  );
};

export default NoRecommendationsNotice;
