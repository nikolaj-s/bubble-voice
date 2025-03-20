import React from "react";
import { motion } from "framer-motion";

import styles from "./VolumeSlider.module.css";

const VolumeSlider = ({ value, onChange, step = 0.01, max = 1, min = 0, label }) => {


  return (
    <div className={styles.volumeSlider}>
      {/* Volume Bar */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        style={{
          '--slider-value': value / (max - min), // This will adjust the filled portion
        }}
      />

      {/* Display Volume Percentage */}
      <motion.div
        className={styles.volumeLabel}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {Math.floor(label)}%
      </motion.div>
    </div>
  );
};

export default VolumeSlider;

