import React from 'react';

import styles from './Description.module.css'

export const Description = ({description}) => {
    
    return (
        <div className={styles.container}>
            <p>{description}</p>
        </div>
    )
}
