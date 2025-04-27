import React from "react";
import { motion } from "framer-motion";
import styles from "./FullScreenWrapper.module.css"; // Assuming you're using CSS modules

const FullScreenWrapper = ({ children, onClose, maxContentWidth = 800, backgroundColor = 'var(--background-color)', width }) => {
  const handleWrapperClick = () => {
    onClose();
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{backgroundColor: 'rgba(0,0,0,0)'}}
      animate={{backgroundColor: 'var(--overlay-color)'}}
      exit={{backgroundColor: 'rgba(0,0,0,0)'}}
      // Attach the click handler
    >
      <motion.div

      style={{
        maxWidth: maxContentWidth,
        backgroundColor,
        width
      }}
      initial={{ opacity: 0, scale: 0.8,}}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
       
        className={styles.content}
      >
        {children}
      </motion.div>
      <div className={styles.closeListener} onClick={handleWrapperClick} />
    </motion.div>
  );
};

export default FullScreenWrapper;
