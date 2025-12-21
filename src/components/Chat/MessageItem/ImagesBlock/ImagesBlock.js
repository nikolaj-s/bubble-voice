import React from 'react';

import styles from './ImagesBlock.module.css';
import { ImageComponent } from '../../../ui/Image/Image';
import { ImageTooltipWrapper } from '../../../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper';
import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import { useDispatch } from 'react-redux';
import { setImages } from '../../../../features/Media/ExpandedImage/expandedImageSlice';

export const ImagesBlock = ({images = [], nsfw}) => {

    const dispatch = useDispatch();

    if (images?.length === 0) return null;

    return (
        <div className={styles.container}>
            {images.map((image, key) => (
                <div onClick={() => {dispatch(setImages(images))}} key={key} className={styles.imageWrapper}>
                    <NsfwWrapper nsfw={{nsfw}}>
                    <ImageTooltipWrapper image={{src: image, type: 'image'}}>
                        <ImageComponent src={image} objectFit='cover' />
                    </ImageTooltipWrapper>
                    </NsfwWrapper>
                </div>
            ))}
        </div>
    )
}
