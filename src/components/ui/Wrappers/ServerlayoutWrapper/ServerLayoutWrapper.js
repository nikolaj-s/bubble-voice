import React from 'react';

import styles from './ServerLayoutWrapper.module.css'

export const ServerLayoutWrapper = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
