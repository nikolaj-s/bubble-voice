// Libraries
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Styles
import styles from './ServerButton.module.css';
import { useLocation } from 'react-router-dom';
import { ImageComponent } from '../../../ui/Image/Image';

export const ServerButton = ({ action, server_banner, server_name, server_id }) => {
    const [isHovered, setHovered] = useState(false);

    const [isPressed, setPressed] = useState(false);

    const location = useLocation();

    const isActive = location.pathname.includes(`/dashboard/server/${server_id}`);

    const handleAction = () => {
        action(server_id);
    }

    return (
        <div onClick={handleAction} className={`${styles['server-button-container']}`}
            id={`server-button-${server_id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            
        >
            {/* Server Icon */}
            <div className={`${isActive ? styles.active : ''} ${styles.activeWrapper}`} />
            <motion.div
                className={`${styles['server-button-image-container']}`}
            >
                <ImageComponent src={server_banner} />
            </motion.div>

            {/* Hover Tooltip */}
            {isHovered && (
                <motion.div
                    className={styles['server-button-name-container']}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                >
                    <h2 >{server_name}</h2>
                </motion.div>
            )}
        </div>
    );
};


