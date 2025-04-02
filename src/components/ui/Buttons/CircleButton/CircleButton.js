// Libraries
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Styles
import styles from './CircleButton.module.css';

export const CircleButton = ({ action, name, children, isActive}) => {

    const [isHovered, setHovered] = useState(false);

    const [isPressed, setPressed] = useState(false);

    const handleAction = () => {
        action();
    };

    return (
        <div 
            onClick={handleAction} 
            className={styles['circle-button-container']}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
        >
            {/* Active Indicator */}
            <div className={`${isActive ? styles.active : ''} ${styles.activeWrapper}`} />

            {/* Children Content */}
            <motion.div className={styles['circle-button-content']}>
                {children}
            </motion.div>

            {/* Hover Tooltip */}
            {isHovered && (
                <motion.div
                    className={styles['circle-button-name-container']}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                >
                    <h2>{name}</h2>
                </motion.div>
            )}
        </div>
    );
};
