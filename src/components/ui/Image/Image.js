import React from 'react';

import styles from './Image.module.css'
import { ImageOff } from 'lucide-react';
import { useGifControl } from '../../../hooks/useGifControl';

export const ImageComponent = ({src, objectFit = 'cover', alt = "Image", borderRadius, aspectRatio, height, width}) => {

 //   const {ref} = useGifControl({scale: 0.5})

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
               //     ref={ref}
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
