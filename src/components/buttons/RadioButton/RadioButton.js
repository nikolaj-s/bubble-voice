// library's
import { useAnimation, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./RadioButton.css"

export const RadioButton = ({name, state, action}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const handleAnimation = (color) => {
        animation.start({
            backgroundColor: color
        })
    }

    const handleAction = () => {
        action();
    }

    return (
        <motion.div 
        onClick={handleAction}
        animate={animation}
        onMouseEnter={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(secondaryColor)}}
        transition={{duration: 0.1}}
        className='radio-button-container'>
            <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: state ? textColor : primaryColor
            }}>
            </div>
            <h3 style={{color: textColor}}>{name}</h3>
        </motion.div>
    )
}
