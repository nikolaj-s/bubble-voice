import React from 'react'

import { ImageComponent } from '../../../ui/Image/Image'

import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';
import LazyImageWrapper from '../../../ui/Wrappers/LazyImageWrapper/LazyImageWrapper';

export const ImageBlock = ({image, loading, nsfw, styles, width, height = 350}) => {

    const dispatch = useDispatch();

    const expandImage = () => {

        dispatch(setExpandedImage({image: image}));

        dispatch(setOverlay("expandImage"));

    }
    
    const aspectRatio = width && height ? width / height : undefined;

    return (
        <>
        {image && loading ?
        <div className={`${styles.imageSkeleton} ${styles.skeleton}`} />
        : image ?
        <div 
        onClick={expandImage}
        className={styles.imageBlock}>
            <NsfwWrapper nsfw={{nsfw}}>
                <LazyImageWrapper 
                aspectRatio={aspectRatio} 
                width={aspectRatio ? '100%' : null}
                height={height > 350 || !height ? 350 : height}
                >
                    <ImageComponent src={image} />
                </LazyImageWrapper>
            </NsfwWrapper>
        </div>
        : null}
        </>
    )
}
