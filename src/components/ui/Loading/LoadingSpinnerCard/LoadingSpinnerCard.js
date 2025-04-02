import React from "react";
import styles from "./LoadingSpinnerCard.module.css"; // We'll create a CSS module for styles

const LoadingSpinnerCard = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinnerCard;
