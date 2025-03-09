import React from 'react';

import styles from './Banner.module.css'
import { ImageComponent } from '../Image/Image';

export const Banner = ({image, height = 80}) => {

    return (
        
        <div style={{height: 80}} className={styles.banner}>
            <ImageComponent alt='banner' src={image} />
        </div>
    )

}
