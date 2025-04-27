// components/Helpers/DirectionsTooltip/DirectionsTooltip.jsx
import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import styles from "./DirectionsTooltip.module.css";

export const DirectionsTooltip = ({ message = "Helpful information goes here." }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <HelpCircle size={20} className={styles.icon} />

      {isVisible && (
        <div className={styles.tooltip}>
          {message}
        </div>
      )}
    </div>
  );
};
