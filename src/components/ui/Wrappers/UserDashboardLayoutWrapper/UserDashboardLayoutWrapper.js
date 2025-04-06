import React from 'react';

import styles from './UserDashBoardLayout.module.css'

export const UserDashboardLayoutWrapper = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
