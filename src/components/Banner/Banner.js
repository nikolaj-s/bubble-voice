import React from 'react';

import styles from './Banner.module.css'
import { ImageComponent } from '../ui/Image/Image';

export const Banner = ({image, height = 135, padding}) => {

    return (
        
        <div style={{height, padding}} className={styles.banner}>
            <ImageComponent alt='banner' src={image} minHeight={0} />
        </div>
    )

}
