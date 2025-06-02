import React from 'react';

import styles from './Image.module.css'
import { ImageOff } from 'lucide-react';

export const ImageComponent = ({src, objectFit = 'cover', alt = "Image"}) => {

    const [imageError, setImageError] = React.useState(false);

    const [loading, toggleLoading] = React.useState(true);

    return (
        <div 
        key={src}
        style={{
            minHeight: imageError ? 90 : loading ? 150 : null,
            backgroundColor: imageError || loading ? 'black' : null,
            minWidth: loading ? 100 : null
        }}
        className={`${styles.imageContainer} ${loading && src ? styles.loading : ''}`}>
            {imageError || !src ? (
                <ImageOff color='var(--text-color)' />
            ) : (
                <img
                    
                    src={src}
                    alt={alt}
                    className={styles.image}
                    style={{ objectFit }}
                    onError={() => {setImageError(true); toggleLoading(false)}}
                    onLoad={() => {toggleLoading(false)}}
                />
            )}
        </div>
    )
}
