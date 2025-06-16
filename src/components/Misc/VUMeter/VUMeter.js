import React from "react";
import styles from "./VUMeter.module.css";

const VUMeter = ({ volume = 0, voiceThreshold = 0, isSpeaking = false }) => {
  const pidCount     = 30;
  const activePids   = Math.floor((volume / 100) * pidCount);
  const thresholdPct = Math.min(100, Math.max(0, voiceThreshold));

  return (
    <div
      className={`${styles.vuMeterContainer}`}
    >
      <div className={styles.vuMeterBar}>
        {Array.from({ length: pidCount }, (_, i) => (
          <div
            key={i}
            className={`${styles.vuMeterPid} ${
              i < activePids ? styles.active : ""
            }`}
          />
        ))}

        {voiceThreshold != null && (
          <div
            className={`${styles.thresholdLine} ${isSpeaking ? styles.speaking : null}`}
            style={{ left: `${thresholdPct}%`, backgroundColor: isSpeaking ? 'var(--success-color)' : null }}
          />
        )}
      </div>
    </div>
  );
};

export default VUMeter;



