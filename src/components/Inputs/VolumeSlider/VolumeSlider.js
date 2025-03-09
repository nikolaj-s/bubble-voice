import React from "react";
import { motion } from "framer-motion";

const VolumeSlider = ({ value, onChange }) => {
  return (
    <div className="volume-slider">
      {/* Volume Bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider"
      />

      {/* Display Volume Percentage */}
      <motion.div
        className="volume-label"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {value}%
      </motion.div>
    </div>
  );
};

export default VolumeSlider;
