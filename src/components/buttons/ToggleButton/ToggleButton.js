// library's
import React from 'react';
import { useAnimation, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ToggleButton.css";


export const ToggleButton = ({state = false, action}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleAnimation = (color) => {
        animation.start({
            border: `solid 3px ${color}`
        })
    }

    return (
        <motion.div onClick={action} 
        animate={animation}
        className='toggle-button-container'
        style={{
            justifyContent: state ? 'flex-end' : 'flex-start',
            backgroundColor: primaryColor,
            border: `solid 3px ${primaryColor}`,
        }}
        onMouseOver={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(primaryColor)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(primaryColor)}}
        >
            <div
            style={{
                backgroundColor: state ? textColor : accentColor
            }}
            className='switch'></div>
        </motion.div>
    )
}
