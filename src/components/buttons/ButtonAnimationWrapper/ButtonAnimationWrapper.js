
// library's
import { useAnimation, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';

// state
import {selectAccentColor, selectPrimaryColor, selectSecondaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ButtonAnimationWrapper = ({action, className, width = 50, height = 50, borderRadius = '50%', justifyContent = 'center', invert = false, pointerOptions = null, children}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const handleAnimation = (color) => {

        animation.start({
            backgroundColor: color
        })
        
    }

    return (
        <motion.div
        onClick={action}
        className={className}
        style={{
            borderRadius: borderRadius,
            width: width,
            height: height,
            flexShrink: 0,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: justifyContent,
            alignItems: 'center',
            padding: 10,
            pointerEvents: pointerOptions, 
        }}
        animate={animation}
        onMouseEnter={() => {handleAnimation(!invert ? primaryColor : secondaryColor)}}
        onMouseLeave={() => {handleAnimation("rgba(255, 255, 255, 0)")}}
        onMouseDown={() => {handleAnimation(!invert ? accentColor : accentColor)}}
        onMouseUp={() => {handleAnimation(!invert ? primaryColor : secondaryColor)}}
        transition={{duration: 0.1}}
        >
            {children}
        </motion.div>
    )
}
