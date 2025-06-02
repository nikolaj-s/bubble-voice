import React, { useState } from "react";
import styles from "./StreamOverlay.module.css";

const StreamOverlay = ({ name, button, className = "" }) => {
  const [hovered, setHovered] = useState(false);
    
  return (
    <div
      className={`${styles.overlay} ${hovered ? styles.show : ""} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.name}>{name}</span>
      <span className={styles.button}>{button}</span>
    </div>
  );
};

export default StreamOverlay;
