import React from 'react';

import styles from './MediaTitle.module.css'

export const MediaTitle = ({icon: Icon, title}) => {
  return (
    <div className={styles.mediaTitle}>
        {Icon && <Icon size={20} style={{ marginRight: 8 }} />}
        <span>{title}</span>
    </div>
  )
}
