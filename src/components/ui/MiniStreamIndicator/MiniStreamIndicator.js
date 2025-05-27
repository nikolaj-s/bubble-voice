import React, { useState } from "react";
import styles from "./MiniStreamIndicator.module.css";
import { Subtitle } from "../Titles/Subtitle/Subtitle";

const MiniStreamIndicator = ({
  name = "Screen",
  thumbnail = null,
  type = "screen",
  icon = null,
  channel_bar,
  hide_title,
  action = () => {},
}) => {

  const [showThumb, setShowThumb] = useState(false);

  const [titleVisible, toggleTitleVisible] = useState(true);

  React.useEffect(() => {

    let timeout;

    toggleTitleVisible(true);

    if (hide_title) {
      timeout = setTimeout(() => {
        toggleTitleVisible(false);
      }, 1000)
    }

    return () => {
      clearTimeout(timeout);
    }

  }, [hide_title, name])

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {setShowThumb(true); toggleTitleVisible(true)}}
      onMouseLeave={() => {setShowThumb(false); if (hide_title) toggleTitleVisible(false)}}
      onFocus={() => setShowThumb(true)}
      onBlur={() => setShowThumb(false)}
      tabIndex={0} // makes it focusable by keyboard
      onClick={(e) => {
        e.stopPropagation();
        action();
      }}
      title={name}
      role="button"
    > 
    
      <div className={styles.miniStreamIndicator}>
        <div className={styles.liveIndicator} />
        {titleVisible && (<>
        <Subtitle>streaming: </Subtitle>
        <span className={styles.text}>
          {name}
        </span>
        </>)}
      </div>
      {thumbnail && (
        <div
          className={`${styles.thumbnailPreview} ${
            showThumb ? styles.thumbVisible : ""
          }`}
        >
          <img src={thumbnail} alt={name} className={styles.thumbnail} />
        </div>
      )}
    </div>
  );
};

export default MiniStreamIndicator;
