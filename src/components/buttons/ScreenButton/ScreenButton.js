// library's
import React from 'react'
import { Image } from '../../Image/Image'
import { motion, useAnimation } from 'framer-motion';

// style
import "./ScreenButton.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ScreenButton = ({thumbnail, id, name, action, icon}) => {

    const animation = useAnimation();

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const handleAction = (e) => {
        e.stopPropagation();
        action(id, name)
    }

    const handleAnimation = (color) => {
        animation.start({
            backgroundColor: color
        })
    }

    return (
        <motion.div 
        onClick={handleAction}
        animate={animation}
        style={{backgroundColor: accentColor}}
        transition={{duration: 0.1}}
        onMouseOver={() => {handleAnimation(secondaryColor)}}
        onMouseOut={() => {handleAnimation(accentColor)}}
        className='screen-button-container' >
            <Image zIndex={0} position='absolute' cursor='pointer' image={thumbnail} objectFit="contain" />
            <p
            style={{color: textColor}}
            >{name}</p>
            <div className='screen-app-icon-container'>
                <Image position='relative' image={icon} />
            </div>
        </motion.div>
    )
}
