import React from 'react';
import styles from './ConnectingIndicator.module.css';
import { Wifi, Loader } from 'lucide-react';

const ConnectingIndicator = ({ label = "Connecting to channel..." }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bubblePulse}>
        <Wifi className={styles.icon} size={32} />
        <span className={styles.text}>{label}</span>
        <div className={styles.loader}>
          <Loader className={styles.loaderIcon} size={20} />
        </div>
      </div>

      {/* Artistic background orbs */}
      <div className={styles.orb} style={{ top: '10%', left: '15%' }} />
      <div className={styles.orb} style={{ bottom: '15%', right: '20%' }} />
      <div className={styles.orb} style={{ top: '40%', right: '5%' }} />
    </div>
  );
};

export default ConnectingIndicator;
