// library's
import React from 'react'
import {motion, useAnimation} from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { ImageErrorIcon } from '../Icons/ImageErrorIcon/ImageErrorIcon';
import { NsfwImageOverlay } from './NsfwImageOverlay/NsfwImageOverlay';
import { selectDisableNsfwBlur } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
export const Image = ({aspect_ratio,alt_image = null, draggable = false,image_class, img_id, image, objectFit = 'cover', position = 'relative', zIndex = 0, loadingState = 'lazy', opacity = 1, width = '100%', cursor = 'default', altWidth = '100%', imgHeight = '100%', expandContent = () => {}, disableErr = false, hideOnError = false, id, imageError = "https://res.cloudinary.com/drlkgoter/image/upload/v1674339889/no-picture_m4dmai.jpg", onLoad = () => {}, backgroundColor = null, altHeight = '100%', minLoadHeight = null, borderRadius, errorIconDimension = 50, nsfw = false, height = '100%'}) => {

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const disableNsfwBlur = useSelector(selectDisableNsfwBlur);

    const imageAnimation = useAnimation();

    const handleImageLoad = (e) => {
        toggleLoading(false);
        
        imageAnimation.start({
            opacity: opacity
        })

        onLoad(e);
    }

    const handleError = (e) => {

        toggleLoading(false);
        
        if (alt_image) return e.target.src = alt_image;

        toggleError(true);
    console.log('error loading img')
    }

    return (
        <div id={id} style={{borderRadius: borderRadius,zIndex: zIndex, position: position, objectFit: objectFit, width: width, minHeight: loading && !error ? minLoadHeight : null, height: height, opacity: opacity, display: (error && hideOnError) ? 'none' : null, backgroundColor: backgroundColor, display: 'inline-block'}}>
            {loading && image !== "" && image !== undefined && disableErr === false && error === false ?
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
                minHeight: minLoadHeight,
                minWidth: '200px',
                flexShrink: 0,
                borderRadius: borderRadius,
                overflow: 'hidden'
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>         
            : nsfw && !disableNsfwBlur && !error ? 
            <NsfwImageOverlay borderRadius={borderRadius} />
            : null}
            
            {error && disableErr ? null : error ?
            <ImageErrorIcon width={errorIconDimension} height={errorIconDimension} />
            : <img 
            drag={draggable}
            className={image_class}
            id={img_id}
            onClick={(e) => {expandContent(e.target.src)}}
            onError={handleError} loading={loadingState} draggable={false} style={{maxHeight: altHeight, width: width, maxWidth: altWidth, height: imgHeight, objectFit: objectFit, cursor: cursor, opacity: loading ? 0 : opacity, transition: '0.1s', borderRadius: borderRadius, aspectRatio: aspect_ratio}} onLoad={handleImageLoad} src={image} />}
        </div>
    )
}
