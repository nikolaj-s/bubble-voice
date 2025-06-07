import React from 'react';

import styles from './TimeDisplay.module.css';

export const TimeDisplay = ({time, margin = null, className}) => {

    return (
        <p 
        style={{margin: margin}}
        className={`${styles.time} ${className}`}>{time}</p>
    )
}
