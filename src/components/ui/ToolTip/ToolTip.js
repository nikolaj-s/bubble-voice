import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./ToolTip.module.css";

const Tooltip = ({ content, position = "top", children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.tooltipWrapper}>
      <div
        className={styles.tooltipContainer}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
        <motion.div
          className={`${styles.tooltip} ${
            position === "top" ? styles.tooltipTop :
            position === "bottom" ? styles.tooltipBottom :
            position === "left" ? styles.tooltipLeft :
            styles.tooltipRight
          } ${visible ? styles.tooltipVisible : ""}`}
          initial={{
            opacity: 0,
            y: position === "top" ? -5 : position === "bottom" ? 20 : 0,
            x: position === "left" ? -5 : position === "right" ? 5 : "-50%"
          }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : position === "top" ? -5 : position === "bottom" ? 20 : 0,
            x: visible ? (position === "left" ? -10 : position === "right" ? 10 : "-50%") : (position === "left" ? -5 : position === "right" ? 5 : "-50%")
          }}
          transition={{ duration: 0.2 }}
        >
          {content}
        </motion.div>
      </div>
    </div>
  );
};

export default Tooltip;

