import React from "react";
import styles from "./StreamDisabledOverlay.module.css";
import TextButton from "../../../ui/Buttons/TextButton/TextButton";

const funMessages = [
  "The show’s about to begin!",
  "This stream is on intermission...",
  "Ready to join the fun?",
  "Want to see what’s next?",
  "You’re one click away from the action!"
];
const getRandomMessage = () =>
  funMessages[Math.floor(Math.random() * funMessages.length)];

export const StreamDisabledOverlay = ({
  displayName,
  streamName,
  streamPreview,
  onWatch
}) => {
  return (
    <div className={styles.overlay}>
      {streamPreview && (
        <div
          className={styles.previewBackground}
          style={{
            backgroundImage: `url('${streamPreview}')`
          }}
        />
      )}
      <div className={styles.overlayContent}>
        <h2 className={styles.header}>
          {displayName}
          {streamName && <span className={styles.streamName}> — {streamName}</span>}
        </h2>
        <p className={styles.funMessage}>{getRandomMessage()}</p>
        <TextButton title="Watch Stream" action={onWatch} />
      </div>
    </div>
  );
};
