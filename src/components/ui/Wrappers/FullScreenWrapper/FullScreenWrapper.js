import React from "react";
import { motion } from "framer-motion";
import styles from "./FullScreenWrapper.module.css"; // Assuming you're using CSS modules

const FullScreenWrapper = ({ children, onClose }) => {
  const handleWrapperClick = () => {
    onClose();
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{backgroundColor: 'rgba(0,0,0,0)'}}
      animate={{backgroundColor: 'rgba(0,0,0,0.4)'}}
      exit={{backgroundColor: 'rgba(0,0,0,0)'}}
      onClick={handleWrapperClick} // Attach the click handler
    >
      <motion.div
      initial={{ opacity: 0, scale: 0.8,}}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.content}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default FullScreenWrapper;
