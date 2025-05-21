import React from 'react';
import styles from './ServerSkeletonLoader.module.css';

const ServerSkeletonLoader = ({ count = 8 }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.circle} />
      ))}
    </div>
  );
};

export default ServerSkeletonLoader;
