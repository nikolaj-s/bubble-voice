import React from "react";
import { PauseCircle } from "lucide-react";
import styles from "./StreamPausedOverlay.module.css";

const StreamPausedOverlay = () => (
  <div className={styles.overlay}>
    <div className={styles.card}>
      <PauseCircle size={44} className={styles.icon} />
      <div className={styles.title}>Stream Paused</div>
      <div className={styles.message}>
        <span className={styles.strong}>Your stream preview is paused to save resources.</span>
        <br />
        You’re still <span className={styles.live}>LIVE</span>!<br />
        <span className={styles.tip}>Return to this tab to resume previewing instantly.</span>
      </div>
    </div>
  </div>
);

export default StreamPausedOverlay;
