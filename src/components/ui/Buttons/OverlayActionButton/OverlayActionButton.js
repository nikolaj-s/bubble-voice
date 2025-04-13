import React from 'react';

import styles from './OverlayActionButton.module.css';

const OverlayActionButton = ({ title, action }) => {
  return (
    <button className={styles.overlay} onClick={action} type="button">
      <span className={styles.title}>{title}</span>
    </button>
  );
};


export default OverlayActionButton;
