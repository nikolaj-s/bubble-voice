import React from "react";
import styles from "./RadioToggle.module.css";

const RadioToggle = ({ options, selected, onChange }) => {
  return (
    <div className={styles.container}>
      {options.map(({ label, value, icon: Icon, description }) => (
        <label key={value} 
        className={styles.radioOption}
        style={{
            cursor: value === selected ? 'default' : null
        }}
        >
          <input
            type="radio"
            name="radioToggle"
            value={value}
            checked={selected === value}
            onChange={() => onChange(value)}
            className={styles.hiddenInput}
          />
          <div className={styles.customRadio}>
            
          </div>
          <div className={styles.textContainer}>
            <span className={styles.label}>{label}</span>
            {description && <span className={styles.description}>{description}</span>}
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioToggle;

