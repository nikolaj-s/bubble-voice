import React from 'react';

import styles from './BoxLabel.module.css';

export const BoxLabel = ({label, maxWidth, style}) => {
    return (
        <div style={{maxWidth, ...style}} className={styles.container}>
            {label}
        </div>
    )
}

