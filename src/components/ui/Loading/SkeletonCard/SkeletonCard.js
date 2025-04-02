import React from 'react';
import { motion } from 'framer-motion';
import styles from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <motion.div 
      className={styles.skeletonCard} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`${styles.skeletonImage} ${styles.skeletonShimmer}`} 
      />
      <motion.div 
        className={`${styles.skeletonTitle} ${styles.skeletonShimmer}`} 
      />
      <motion.div 
        className={`${styles.skeletonText} ${styles.skeletonShimmer}`} 
      />
      <motion.div 
        className={`${styles.skeletonText} ${styles.skeletonShimmer}`} 
      />
      <motion.div 
        className={`${styles.skeletonText} ${styles.small} ${styles.skeletonShimmer}`} 
      />
    </motion.div>
  );
};

export default SkeletonCard;
