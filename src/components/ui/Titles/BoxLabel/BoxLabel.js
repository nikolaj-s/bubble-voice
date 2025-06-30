import React from 'react';

import styles from './BoxLabel.module.css';

export const BoxLabel = ({label, maxWidth}) => {
    return (
        <div style={{maxWidth}} className={styles.container}>
            {label}
        </div>
    )
}

