import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./StreamDisabledOverlay.module.css";
import TextButton from "../../../ui/Buttons/TextButton/TextButton";

const funMessages = [
  "The show’s about to begin!",
  "This stream is on intermission…",
  "Ready to join the fun?",
  "Want to see what’s next?",
  "You’re one click away from the action!",
];

const getRandomMessage = () =>
  funMessages[Math.floor(Math.random() * funMessages.length)];

export const StreamDisabledOverlay = ({
  displayName,
  streamName,
  streamPreview,
  onWatch,
}) => {
  const [randomMessage, setRandomMessage] = useState("");
  const [compact, setCompact] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    setRandomMessage(getRandomMessage());
  }, []);

  // Compact mode when the stream window is very small
  useEffect(() => {
    if (!rootRef.current) return;
    const el = rootRef.current;

    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect || el.getBoundingClientRect();
      // Toggle compact when either dimension is very tight
      setCompact(cr.width < 280 || cr.height < 220);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const bgStyle = useMemo(() => {
    if (!streamPreview) return undefined;
    // Avoid quotes breaking CSS url()
    const url = streamPreview.replace(/["'()\\\s]/g, (m) => {
      // spaces to %20, others escaped
      return m === " " ? "%20" : `\\${m}`;
    });
    return { backgroundImage: `url("${url}")` };
  }, [streamPreview]);

  // Keyboard accessibility
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onWatch?.();
    }
  };

  return (
    <div ref={rootRef} className={styles.overlay} role="region" aria-label="Stream unavailable">
      {streamPreview && (
        <>
          <div className={styles.previewBackground} style={bgStyle} />
          <div className={styles.vignette} />
          <div className={styles.scrim} />
        </>
      )}

      <div className={`${styles.content} ${compact ? styles.compact : ""}`}>
        <div className={styles.titleRow}>
          <h2 className={styles.header} title={displayName || "Stream"}>
            {displayName || "Stream"}
          </h2>
          {streamName && (
            <span className={styles.streamName} title={streamName}>
              — {streamName}
            </span>
          )}
        </div>

        {!compact && (
          <p className={styles.funMessage} aria-live="polite">
            {randomMessage}
          </p>
        )}

        <TextButton
          title="Watch Stream"
          action={onWatch}
          onKeyDown={handleKey}
          aria-label="Watch Stream"
        />
        <p className={styles.hint}>
          Press <kbd>Enter</kbd> to join
        </p>
      </div>
    </div>
  );
};
