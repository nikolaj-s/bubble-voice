import React from "react";
import { motion } from "framer-motion";
import styles from "./UserButton.module.css";

const UserButtonSkeleton = () => {
  return (
    <motion.div
      className={styles.userButton}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className={`${styles.skeleton} ${styles.avatar}`} />
      <div className={styles.textContainer}>
        <div className={`${styles.skeleton} ${styles.name}`} />
        <div className={`${styles.skeleton} ${styles.status}`} />
      </div>
    </motion.div>
  );
};

export default UserButtonSkeleton;
