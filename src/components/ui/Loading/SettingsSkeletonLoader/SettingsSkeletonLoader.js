import React from 'react';
import styles from './SettingsSkeletonLoader.module.css';

export const SettingsSkeletonLoader = () => (
  <div className={styles.loaderContainer}>
    {/* Skeleton header */}
    <div className={`${styles.skeleton} ${styles.headerSkeleton}`} />

    {/* Skeleton rows for settings toggles */}
    <div className={styles.row}>
      <div className={`${styles.skeleton} ${styles.labelSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.toggleSkeleton}`} />
    </div>
    <div className={styles.row}>
      <div className={`${styles.skeleton} ${styles.labelSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.toggleSkeleton}`} />
    </div>
    <div className={`${styles.skeleton} ${styles.headerSkeleton}`} />

    <div className={styles.row}>
      <div className={`${styles.skeleton} ${styles.labelSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.toggleSkeleton}`} />
    </div>
    <div className={styles.row}>
      <div className={`${styles.skeleton} ${styles.labelSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.toggleSkeleton}`} />
    </div>
    {/* Skeleton button */}
    <div className={`${styles.skeleton} ${styles.buttonSkeleton}`} />
  </div>
);
