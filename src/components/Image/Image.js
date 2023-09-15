// library's
import React from 'react'
import {motion, useAnimation} from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import {AltImageIcon } from '../Icons/AltImageIcon/AltImageIcon'
export const Image = ({image_class, img_id, image, objectFit = 'cover', position = 'relative', zIndex = 0, loadingState = 'lazy', opacity = 1, width = '100%', cursor = 'default', altWidth = '100%', imgHeight = '100%', expandContent = () => {}, disableErr = false, hideOnError = false, id, imageError = "https://res.cloudinary.com/drlkgoter/image/upload/v1674339889/no-picture_m4dmai.jpg", onLoad = () => {}, backgroundColor = null, altHeight = '100%', minLoadHeight = null, borderRadius}) => {

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const [size, setSize] = React.useState({});

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const imageAnimation = useAnimation();

    const handleImageLoad = (e) => {
        toggleLoading(false);
        
        imageAnimation.start({
            opacity: opacity
        })

        onLoad(e);
    }

    const handleError = (e) => {

        if (disableErr) return toggleLoading(false);

        toggleError(true);
    
    }

    return (
        <div id={id} style={{zIndex: zIndex, position: position, objectFit: objectFit, width: width, height: '100%', opacity: opacity, display: (error && hideOnError) ? 'none' : null, backgroundColor: backgroundColor}}>
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
                flexShrink: minLoadHeight ? '0' : null
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>         
            : null}
            
            {error ?
            <AltImageIcon />
            : <motion.img 
            
            className={image_class}
            id={img_id}
            onClick={() => {expandContent(image)}}
            onError={handleError} loading={loadingState} draggable={false} style={{maxHeight: altHeight, width: width, maxWidth: altWidth, height: imgHeight, objectFit: objectFit, cursor: cursor, opacity: (!image || image === "") ? 0 : 1, transition: '0.1s', borderRadius: borderRadius}} transition={{duration: 0.05}} initial={{opacity: 0}} animate={imageAnimation} onLoad={handleImageLoad} src={image} />}
        </div>
    )
}
