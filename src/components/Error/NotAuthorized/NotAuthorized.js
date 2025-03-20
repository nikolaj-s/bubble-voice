
import React from 'react';

import styles from './NotAuthorized.module.css'
import { ShieldAlert } from 'lucide-react';

export const NotAuthorized = ({message = "You are not authorized to access this content", permission, children}) => {

    const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-color')
    .trim();
    
    if (permission === true) {
        return (<>{children}</>)
    } else {
        return (
            <div className={styles.container}>
                <ShieldAlert width={200} height={200} color={textColor} />
                <h3>{message}</h3>
            </div>
        )
    }
    
}
