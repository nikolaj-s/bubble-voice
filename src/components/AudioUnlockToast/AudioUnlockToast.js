import React from "react";
import styles from "./AudioUnlockToast.module.css";

const AudioUnlockToast = ({ onUnlock }) => (
  <div className={styles.toast} onClick={onUnlock} role="alert">
    <div className={styles.content}>
      <span className={styles.title}>Audio requires your interaction</span>
      <span className={styles.subtitle}>Tap to enable audio for this session</span>
    </div>
  </div>
);

export default AudioUnlockToast;
