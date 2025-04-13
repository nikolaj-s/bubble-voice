import React from 'react';
import styles from './NoRecommendationsPlaceholder.module.css';

const oneLiner = "Start dropping media into channels from search and let the algorithm cook";

const NoRecommendationsPlaceholder = () => {
  return (
    <div className={styles.placeholderWrapper}>
      <div className={styles.bubbleContainer}>
        {Array.from({ length: 12 }).map((_, i) => {
            
            const dimension = 10 + Math.random() * 20;
            
          return (<span
            key={i}
            className={styles.bubble}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${dimension}px`,
              height: `${dimension}px`,
            }}
          />)
        })}
      </div>
      <div className={styles.message}>
        <h2>No Recommendations Yet</h2>
        <p>{oneLiner}</p>
      </div>
    </div>
  );
};

export default NoRecommendationsPlaceholder;
