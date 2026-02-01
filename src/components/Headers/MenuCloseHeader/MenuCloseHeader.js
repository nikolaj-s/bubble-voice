import React from 'react'

import styles from './MenuCloseHeader.module.css';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { X } from 'lucide-react';

export const MenuCloseHeader = ({title, onClose}) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <IconButton 
            Icon={X}
            onClick={onClose}
            title={'Close'}
            />
        </div>

    )
}
