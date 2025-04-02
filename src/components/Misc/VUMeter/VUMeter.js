import React, { useState, useEffect } from "react";
import styles from "./VUMeter.module.css"; // Importing CSS Module
import VolumeSlider from "../../ui/Inputs/VolumeSlider/VolumeSlider";

const VUMeter = ({ volume, voiceThreshold }) => {
  // Define how many "pids" (segments) the meter will have
  const pidCount = 30;

  // Calculate the number of pids to light up based on the volume level
  const activePids = Math.floor((volume / 100) * pidCount);

  // Calculate the position of the threshold based on the volume floor and the bar width
  const thresholdPosition = Math.floor((voiceThreshold / 100) * pidCount);

  return (
    <div className={styles.vuMeterContainer}>
      <div className={styles.vuMeterBar}>
        {/* Render the pids */}
        {Array.from({ length: pidCount }, (_, index) => (
          <div
            key={index}
            className={`${styles.vuMeterPid} ${index < activePids ? styles.active : ""}`}
          ></div>
        ))}
        {/* Render the threshold line */}
        {voiceThreshold && 
        <div
          className={styles.thresholdLine}
          style={{ left: `${(thresholdPosition / pidCount) * 100}%` }}
        />}
      </div>
    </div>
  );
};

export default VUMeter;


