// library's
import React from 'react'
import {motion, useAnimation} from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const Image = ({image, objectFit = 'cover', position = 'relative', zIndex = 0, loadingState = '', opacity = 1, width = '100%', cursor = 'default', altWidth = '100%', imgHeight = '100%'}) => {

    const [loading, toggleLoading] = React.useState(true);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const imageAnimation = useAnimation();

    const handleImageLoad = () => {
        toggleLoading(false);

        imageAnimation.start({
            opacity: 1
        })
    }

    return (
        <div style={{zIndex: zIndex, position: position, objectFit: objectFit, width: width, height: '100%', opacity: opacity}}>
            {loading && image !== "" && image !== undefined ?
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
            onError={handleImageLoad} loading={loadingState} draggable={false} style={{maxHeight: '100%',width: width, maxWidth: altWidth, height: imgHeight, objectFit: objectFit, cursor: cursor}} initial={{opacity: 0}} animate={imageAnimation} onLoad={handleImageLoad} src={image} alt="Error Loading" />
        </div>
    )
}
