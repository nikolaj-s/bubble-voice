import React from 'react';

import styles from './Banner.module.css'
import { ImageComponent } from '../ui/Image/Image';

export const Banner = ({image, height = 80}) => {

    return (
        
        <div style={{height: 105}} className={styles.banner}>
            <ImageComponent borderRadius={'var(--border-radius)'} alt='banner' src={image} />
        </div>
    )

}
