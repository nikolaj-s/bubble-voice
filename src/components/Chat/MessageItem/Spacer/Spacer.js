import React from 'react';
import styles from './Spacer.module.css';

const Spacer = ({ date }) => {
  return (
    <div className={styles.spacerContainer}>
      <div className={styles.line}></div>
      <span className={styles.date}>{date}</span>
      <div className={styles.line}></div>
    </div>
  );
};

export default Spacer;
