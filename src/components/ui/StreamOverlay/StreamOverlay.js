import React, { useState } from "react";
import styles from "./StreamOverlay.module.css";

const StreamOverlay = ({ name, button, className = "", altName }) => {
  const [hovered, setHovered] = useState(false);
    
  return (
    <div
      className={`${styles.overlay} ${hovered ? styles.show : ""} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.name}>{name}{altName && (<span className={styles.altName}> - {altName}</span>)}</span>
      <span className={styles.button}>{button}</span>
    </div>
  );
};

export default StreamOverlay;
