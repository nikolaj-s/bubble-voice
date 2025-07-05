import React from 'react';
import styles from './ProcessingBlock.module.css';

const ProcessingBlock = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className={styles.processingBlock}>
      <span className={styles.label}>Processing…</span>
      <div className={styles.loadingBar} />
    </div>
  );
};

export default ProcessingBlock;
