
import { PauseCircle } from "lucide-react";
import styles from "./StreamPausedOverlay.module.css";
import { Description } from "../../../ui/Description/Description";

const StreamPausedOverlay = () => (
  <div className={styles.overlay}>
    <div className={styles.card}>
      <PauseCircle size={44} className={styles.icon} />
      <div className={styles.title}>Stream Paused</div>
      <Description description={"Your stream preview is paused to save resources."} />
    </div>
  </div>
);

export default StreamPausedOverlay;
