import React from 'react';

import styles from './PillSpacer.module.css'

export const PillSpacer = ({verticle = false, height}) => {
    return (
        <div className={styles.spacer} 
        style={verticle ? {
            width: 5,
            height: height || 'calc(100% - 5px)',
            margin: '0px 5px'
        } : {}}
        />
    )
}
