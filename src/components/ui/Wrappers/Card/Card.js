import React from 'react';

import styles from './Card.module.css'

export const Card = ({className, children, ...props}) => {
    return (
        <div className={`${styles.container} ${className}`} {...props}>
            {children}
        </div>
    )
}
