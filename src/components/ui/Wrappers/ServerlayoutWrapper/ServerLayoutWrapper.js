import React from 'react';

import styles from './ServerLayoutWrapper.module.css'

export const ServerLayoutWrapper = ({children, hideUsers}) => {

    return (
        <div className={`${styles.container} ${hideUsers ? styles.hideUsers : ''}`}>
            {children}
        </div>
    )
}
