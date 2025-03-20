import React from "react";
import styles from "./TypeInput.module.css"; // We'll use a CSS module for styles

import {motion} from 'framer-motion';

const TypeInput = ({ selected, types, onSelect }) => {

  const handleSelect = (type) => {

    onSelect(type);
  
  };

  return (
    <div className={styles.container}>
      {types.map(({ type, title, description }) => (
        <motion.div
          key={type}
          className={`${styles.option} ${selected === type ? styles.selected : ""}`}
          onClick={() => handleSelect(type)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TypeInput;
