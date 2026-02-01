import React from 'react';

import styles from './PillSpacer.module.css'

export const PillSpacer = ({verticle = false, height}) => {
    return (
        <div className={styles.spacer} 
        style={verticle ? {
            width: 2,
            height: height || '60%',
            margin: '0px 5px',
            opacity: 0.5
        } : {}}
        />
    )
}
