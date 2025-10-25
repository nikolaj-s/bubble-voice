import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ initialState = false, onToggle, disable }) => {

    const [isChecked, setIsChecked] = useState(initialState);

    const handleToggle = () => {
        if (disable) return;

        setIsChecked(!isChecked);

        if (onToggle) onToggle(!isChecked);
    };

    React.useEffect(() => {
      setIsChecked(initialState);
    }, [initialState])

  return (
    <div onClick={handleToggle} className={`${styles.toggleContainer} ${isChecked ? styles.activeContainer : ''} ${disable && (styles.disable)}`}>
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
