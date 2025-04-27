// components/FixedSideMenuWrapper.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FixedSideMenuWrapper.module.css';

export const FixedSideMenuWrapper = ({ close = () => {}, children }) => {
    return (
        <>
            <div onClick={close} className={styles.close} />
          
            <motion.div
                className={styles.container}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                {children}
            </motion.div>
        </>
    );
};
