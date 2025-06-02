import React from "react";
import { History } from "lucide-react";
import styles from "./MediaHistoryHeader.module.css";

const MediaHistoryHeader = () => (
  <div className={styles.header}>
    <div className={styles.iconWrap}>
      <History size={28} strokeWidth={2.2} className={styles.icon} />
    </div>
    <div>
      <h2 className={styles.title}>Media Time Machine</h2>
      <p className={styles.subtitle}>
        Relive your channel’s greatest hits — from guilty pleasures to legendary jams!
      </p>
    </div>
    <div className={styles.bubbles}>
      <span className={`${styles.bubble} ${styles.bubble1}`}></span>
      <span className={`${styles.bubble} ${styles.bubble2}`}></span>
      <span className={`${styles.bubble} ${styles.bubble3}`}></span>
      <span className={`${styles.bubble} ${styles.bubble4}`}></span>
    </div>
  </div>
);

export default MediaHistoryHeader;
