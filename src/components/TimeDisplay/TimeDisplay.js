import React from 'react';

import styles from './TimeDisplay.module.css';

export const TimeDisplay = ({time, margin = null}) => {

    return (
        <p 
        style={{margin: margin}}
        className={styles.time}>{time}</p>
    )
}
