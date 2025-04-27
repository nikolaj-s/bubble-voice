import React from 'react';

import styles from './ToolBar.module.css'

export const ToolBar = ({children, ...props}) => {
    return (
        <div {...props} className={styles.toolBar}>
            {children}
        </div>
    )
}
