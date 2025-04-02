import React from 'react';
import styles from './SpinnerLoading.module.css';

const SpinnerLoading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default SpinnerLoading;
