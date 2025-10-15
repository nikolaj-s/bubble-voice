import React from 'react';

import styles from './Banner.module.css'
import { ImageComponent } from '../ui/Image/Image';

export const Banner = ({image, height = 105, padding}) => {

    return (
        
        <div style={{height, padding}} className={styles.banner}>
            <ImageComponent borderRadius={'var(--border-radius)'}  alt='banner' src={image} minHeight={0} />
        </div>
    )

}
