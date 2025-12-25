import React from 'react';

import styles from './Card.module.css';

import { motion } from 'framer-motion';

export const Card = ({className, children, ...props}, ref) => {
    return (
        <motion.div ref={ref} className={`${styles.container} ${className}`} {...props}>
            {children}
        </motion.div>
    )
}
