import React from 'react';

import styles from './TimeDisplay.module.css';

export const TimeDisplay = ({time}) => {

    return (
        <p className={styles.time}>{time}</p>
    )
}
