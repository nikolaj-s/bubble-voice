import React from 'react';

import styles from './BoxLabel.module.css';

export const BoxLabel = ({label}) => {
    return (
        <div className={styles.container}>
            <p>{label}</p>
        </div>
    )
}

