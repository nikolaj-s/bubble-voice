import React from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion
import styles from './CardWrapper.module.css'; // Import the CSS module

const CardWrapper = ({ children }) => {
  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation to move to the final state
      exit={{ opacity: 0, y: -50 }} // Exit animation
      transition={{ duration: 0.5 }} // Duration of animation
    >
      {children} {/* Rendering children passed to the component */}
    </motion.div>
  );
};

export default CardWrapper;
