import React from "react";
import styles from "./SkeletonForm.module.css";

const SkeletonForm = () => (
  <div className={styles.skeletonLoader}>
    <div className={styles.skeletonField}></div>
    <div className={styles.skeletonField}></div>
    <div className={styles.skeletonField}></div>
    <div className={styles.skeletonButton}></div>
  </div>
);

export default SkeletonForm;
