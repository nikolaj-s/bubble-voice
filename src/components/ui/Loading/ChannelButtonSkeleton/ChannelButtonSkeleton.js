import React from "react";
import { motion } from "framer-motion";
import styles from "./ChannelButtonSkeleton.module.css";

const ChannelButtonSkeleton = () => {
    return (
        <motion.div 
            className={styles.skeletonContainer} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
        >
            <div className={styles.skeletonIcon}></div>
            <div className={styles.skeletonText}></div>
        </motion.div>
    );
};

export default ChannelButtonSkeleton;
