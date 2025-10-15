import React from 'react';

import styles from './Image.module.css'
import { ImageOff } from 'lucide-react';
export const ImageComponent = ({src, altSrc, objectFit = 'cover', alt = "Image", borderRadius, aspectRatio, height, width, minHeight, className}) => {

    const [imageError, setImageError] = React.useState(false);

    const [loading, toggleLoading] = React.useState(true);

    return (
        <div 
        style={{
            minHeight: minHeight ? imageError ? 90 : loading ? 150 : null : null,
            backgroundColor: imageError || loading ? 'black' : null,
            minWidth: loading ? 100 : null,
            borderRadius,
            aspectRatio,
            height,
            width
        }}
        className={`${styles.imageContainer} ${loading && src ? styles.loading : ''} ${className}`}>
            {imageError || !src ? (
                <ImageOff color='var(--text-color)' />
            ) : (
                <img
               //     ref={ref}
                    src={src}
                    alt={alt}
                    className={styles.image}
                    style={{ objectFit }}
                    onError={(e) => {
                        if (e.target.src !== altSrc && altSrc) {
                            e.target.src = altSrc;
                            return;
                        }
                        setImageError(true); toggleLoading(false)}}
                    onLoad={() => {toggleLoading(false)}}
                />
            )}
        </div>
    )
}
