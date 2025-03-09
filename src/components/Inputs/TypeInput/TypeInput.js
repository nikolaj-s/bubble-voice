import React from "react";
import styles from "./TypeInput.module.css"; // We'll use a CSS module for styles

const TypeInput = ({ selected, types, onSelect }) => {
  return (
    <div className={styles.typeInputWrapper}>
      {types.map((type, index) => (
        <button
          key={index}
          className={`${styles.typeButton} ${selected === type ? styles.selected : ""}`}
          onClick={() => onSelect(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeInput;
