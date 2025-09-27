import React from 'react';

import styles from './Card.module.css';

import { motion } from 'framer-motion';

export const Card = ({className, children, ...props}) => {
    return (
        <motion.div className={`${styles.container} ${className}`} {...props}>
            {children}
        </motion.div>
    )
}
