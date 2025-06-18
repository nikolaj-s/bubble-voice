import React from 'react';

import styles from './Image.module.css'
import { ImageOff } from 'lucide-react';

export const ImageComponent = ({src, objectFit = 'cover', alt = "Image", borderRadius, aspectRatio, height, width}) => {

    const [imageError, setImageError] = React.useState(false);

    const [loading, toggleLoading] = React.useState(true);

    return (
        <div 
        style={{
            minHeight: imageError ? 90 : loading ? 150 : null,
            backgroundColor: imageError || loading ? 'black' : null,
            minWidth: loading ? 100 : null,
            borderRadius,
            aspectRatio,
            height,
            width
        }}
        className={`${styles.imageContainer} ${loading && src ? styles.loading : ''}`}>
            {imageError || !src ? (
                <ImageOff color='var(--text-color)' />
            ) : (
                <img
                    loading='lazy'
                    decoding='async'
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
