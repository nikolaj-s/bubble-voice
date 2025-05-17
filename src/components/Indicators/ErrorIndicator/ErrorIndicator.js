import React from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './ErrorIndicator.module.css';

const ErrorIndicator = ({ message = "Something went wrong." }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bubblePulse}>
        <AlertTriangle className={styles.icon} size={36} />
        <span className={styles.text}>{message}</span>
      </div>

      {/* Background decorative orbs */}
      <div className={styles.orb} style={{ top: '10%', left: '10%' }} />
      <div className={styles.orb} style={{ bottom: '20%', right: '15%' }} />
      <div className={styles.orb} style={{ top: '50%', right: '5%' }} />
    </div>
  );
};

export default ErrorIndicator;
