import React from 'react';
import styles from './TextIndicator.module.css';

export const TextIndicator = ({ backgroundColor = 'var(--button-background)', title = '' }) => {
  return (
    <div
      className={styles.indicator}
      style={{ backgroundColor }}
    >
      <span className={styles.cutoutText}>{title}</span>
    </div>
  );
};
