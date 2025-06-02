import React from "react";
import { Music2 } from "lucide-react";
import styles from "./NoMediaHistoryPlaceholder.module.css";

const NoMediaHistoryPlaceholder = () => (
  <div className={styles.wrapper}>
    <div className={styles.iconWrap}>
      <Music2 size={38} strokeWidth={2.2} className={styles.icon} />
    </div>
    <div className={styles.text}>
      <h3>No Media History Yet!</h3>
      <p>
        Looks like your channel’s time machine is out of fuel.<br />
        Queue up a jam, video, or meme—your legendary media story starts here!
      </p>
    </div>
    {/* Fun floating notes/bubbles */}
    <span className={`${styles.note} ${styles.note1}`}>♪</span>
    <span className={`${styles.note} ${styles.note2}`}>♬</span>
    <span className={`${styles.note} ${styles.note3}`}>🫧</span>
  </div>
);

export default NoMediaHistoryPlaceholder;
