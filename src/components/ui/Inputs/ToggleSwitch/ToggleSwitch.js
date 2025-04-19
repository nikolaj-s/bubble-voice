import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ initialState = false, onToggle }) => {

    const [isChecked, setIsChecked] = useState(initialState);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        if (onToggle) onToggle(!isChecked);
    };

    React.useEffect(() => {
      setIsChecked(initialState);
    }, [initialState])

  return (
    <div onClick={handleToggle} className={`${styles.toggleContainer} ${isChecked ? styles.activeContainer : ''}`}>
      <div
        className={`${styles.toggleBackground} ${isChecked ? styles.activeToggle : ''}`} 
      >
        <motion.div
          className={styles.toggleButton}
          layout
          transition={{duration: 0.1}}
          animate={{
            x: isChecked ? "30px" : "2px",
          }}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
