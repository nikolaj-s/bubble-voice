// MiniStreamIndicator.js
import React from "react";
import PropTypes from "prop-types";
import { Play, Radio } from "lucide-react";

import styles from "./MiniStreamIndicator.module.css";
import { Subtitle } from "../Titles/Subtitle/Subtitle";
import { TextIndicator } from "../TextIndicator/TextIndicator";

const MiniStreamIndicator = ({
  name = "Screen",
  thumbnail = null,
  icon = null,
  streamColor = "var(--card-background-color)",
  onClick,
}) => {
  const Icon = icon || <Play className={styles.placeholderIcon} />;

  const handleClick = () => {
    onClick?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      className={styles.card}
      title={name}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ background: streamColor }}
    >
      <div className={styles.thumbWrapper}>
        {thumbnail ? (
          <img src={thumbnail} alt={name} className={styles.thumbnail} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            {Icon}
          </div>
        )}

        <div className={styles.hud}>
          <span className={styles.livePill}>
            <Radio size={12} className={styles.liveIcon} />
            <TextIndicator backgroundColor="var(--success-color)" title="LIVE" />
          </span>
        </div>

        <div className={styles.sheen} aria-hidden="true" />
      </div>

      <div className={styles.footer}>
        <Subtitle width="100%" textAlign="center">
          {name}
        </Subtitle>
      </div>
    </button>
  );
};

MiniStreamIndicator.propTypes = {
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  icon: PropTypes.node,
  streamColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default MiniStreamIndicator;
