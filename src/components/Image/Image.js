// library's
import React from 'react'
import {motion, useAnimation} from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const Image = ({image, objectFit = 'cover', position = 'relative', zIndex = 0, loadingState = '', opacity = 1, width = '100%', cursor = 'default', altWidth = '100%', imgHeight = '100%', expandContent = () => {}, disableErr = false, hideOnError = false, id, imageError = "https://res.cloudinary.com/drlkgoter/image/upload/v1674339889/no-picture_m4dmai.jpg"}) => {

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const imageAnimation = useAnimation();

    const handleImageLoad = () => {
        toggleLoading(false);

        imageAnimation.start({
            opacity: opacity
        })
    }

    const handleError = (e) => {

        if (disableErr) return toggleLoading(false);

        toggleError(true);

        e.target.src = imageError
    
    }

    return (
        <div id={id} style={{zIndex: zIndex, position: position, objectFit: objectFit, width: width, height: '100%', opacity: opacity, display: (error && hideOnError) ? 'none' : null}}>
            {loading && image !== "" && image !== undefined && disableErr === false ?
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>         
            : null}
            <motion.img 
            onClick={() => {expandContent(image)}}
            onError={handleError} loading={loadingState} draggable={false} style={{maxHeight: '100%',width: width, maxWidth: altWidth, height: imgHeight, objectFit: objectFit, cursor: cursor}} initial={{opacity: 0}} animate={imageAnimation} onLoad={handleImageLoad} src={image} />
        </div>
    )
}
