import React from 'react';
import styles from './TextIndicator.module.css';

export const TextIndicator = ({ backgroundColor = 'var(--button-background)', title = '', padding, minWidth }) => {
  return (
    <div
      className={styles.indicator}
      style={{ backgroundColor, padding, minWidth }}
    >
      <span className={styles.cutoutText}>{title}</span>
    </div>
  );
};
