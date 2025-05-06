import React from 'react';

import styles from './ImageTooltipWrapper.module.css'
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const ImageTooltipWrapper = ({image, children, style = {width: '100%', height: '100%', borderRadius: '5px', overflow: 'hidden'}, disableDefaultBehaviour = false}) => {

    const dispatch = useDispatch();

    const expand = () => {

        if (disableDefaultBehaviour) return;

        dispatch(setExpandedImage({data: image, image: image.src}));

        dispatch(setOverlay("expandImage"));

    }

    return (
        <div 
        id={image.src}
        style={style}
        onClick={expand}
        className={styles.container}
        data-context={JSON.stringify({...image, type: 'imageSearchResult'})} >
            {children}
        </div>
    )
}
