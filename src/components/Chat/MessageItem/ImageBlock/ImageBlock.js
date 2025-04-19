import React from 'react'

import { ImageComponent } from '../../../ui/Image/Image'

import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const ImageBlock = ({image, loading, nsfw, styles}) => {

    const dispatch = useDispatch();

    const expandImage = () => {

        dispatch(setExpandedImage({image: image}));

        dispatch(setOverlay("expandImage"));

    }
    
    return (
        <>
        {image && loading ?
        <div className={`${styles.imageSkeleton} ${styles.skeleton}`} />
        : image ?
        <div 
        onClick={expandImage}
        className={styles.imageBlock}>
            <NsfwWrapper nsfw={{nsfw}}>
                <ImageComponent src={image} />
            </NsfwWrapper>
        </div>
        : null}
        </>
    )
}
