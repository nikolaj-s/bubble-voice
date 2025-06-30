import React from 'react';

import styles from './NavButton.module.css';

export const NavButton = ({icon, name, action = () => {}, active}) => {
    return (
        <button className={`${styles.button} ${active && styles.active}`} onClick={action} onTouchEnd={action} >
            <span className={styles.icon}>
                {icon}
            </span>
            <span className={styles.name}>
                {name}
            </span>
        </button>
    )
}


