import { motion } from "framer-motion";

import { useState } from "react";

import styles from "./ToolTip.module.css";

const Tooltip = ({ content, position = "top", children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <motion.div
        className={`${styles.tooltip} ${
          position === "top" ? styles.tooltipTop : styles.tooltipBottom
        } ${visible ? styles.tooltipVisible : ""}`}
        initial={{ opacity: 0, y: position === "top" ? -5 : 20, x: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : position === "top" ? -5 : 20, x: '-50%' }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.div>
    </div>
  );
};

export default Tooltip;
