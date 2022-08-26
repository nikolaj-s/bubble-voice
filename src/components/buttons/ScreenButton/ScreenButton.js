// library's
import React from 'react'
import { Image } from '../../Image/Image'
import { motion, useAnimation } from 'framer-motion';

// style
import "./ScreenButton.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ScreenButton = ({thumbnail, id, name, action}) => {

    const animation = useAnimation();

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const handleAction = () => {
        action(id)
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
        style={{backgroundColor: secondaryColor}}
        transition={{duration: 0.2}}
        onMouseOver={() => {handleAnimation(accentColor)}}
        onMouseOut={() => {handleAnimation(secondaryColor)}}
        className='screen-button-container' >
            <Image image={thumbnail} objectFit="contain" />
            <p
            style={{color: textColor}}
            >{name}</p>
        </motion.div>
    )
}
