import React from 'react';

import styles from './LineSpacer.module.css'

export const LineSpacer = ({margin}) => {
  return (
    <div style={{margin}} className={styles.spacer} />
  )
}
