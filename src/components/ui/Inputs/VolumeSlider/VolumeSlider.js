
import { motion, AnimatePresence } from "framer-motion";
import styles from "./VolumeSlider.module.css";

const VolumeSlider = ({ value, onChange, step = 0.01, max = 1, min = 0, label, width, maxWidth }) => {
  const percent = (value - min) / (max - min);

  return (
    <div
      className={styles.volumeSlider}
      style={{ "--slider-percent": percent , width, maxWidth}}
    >
      <div className={styles.sliderWrapper}>
        <AnimatePresence>
          {label !== undefined && (
            <motion.div
              className={styles.volumeLabel}
            >
              {Math.floor(label)}%
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.slider}
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
