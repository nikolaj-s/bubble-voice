import React from 'react';

import styles from './MediaPreview.module.css';
import { ImageComponent } from '../../ui/Image/Image';
import { CircleX } from 'lucide-react';

export const MediaPreview = ({preview, clear}) => {

    return (
        <div onClick={clear} className={styles.container}>
            <ImageComponent src={preview} />
            <div className={styles.overlay}>
                <CircleX color='var(--text-color)' />
            </div>
        </div>
    )
}
