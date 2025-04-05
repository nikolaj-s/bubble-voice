import { CircleX } from 'lucide-react'

import React from 'react'

import styles from './OverlayCloseButton.module.css'

export const OverlayCloseButton = ({action}) => {

    return (
        <div 
        onClick={action}
        className={styles.button}>
            <CircleX 
            strokeWidth={1}
            size={45}
            color='var(--text-color)' />
            <p>ESC</p>
        </div>
    )
}
