import React from "react";
import styles from "./BoolInput.module.css";

const BoolInput = ({ name, value, onChange }) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <label className={styles.boolInput}>
      <input
        type="checkbox"
        checked={value}
        onChange={handleToggle}
      />
      {name.replace(/_/g, " ")}
    </label>
  );
};

export default BoolInput;
