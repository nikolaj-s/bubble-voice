// library's
import { useAnimation, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./RadioButton.css"

export const RadioButton = ({name, state, action, margin, invert, width = 'calc(100% - 10px)', image = false}) => {

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

    const handleAction = (e) => {
        e?.stopPropagation();
        action();
    }

    return (
        <motion.div 
        onClick={handleAction}
        animate={animation}
        onMouseEnter={() => {handleAnimation(invert ? secondaryColor : accentColor)}}
        onMouseLeave={() => {handleAnimation(invert ? accentColor : secondaryColor)}}
        transition={{duration: 0.1}}
        style={{backgroundColor: (state && image) ? accentColor : invert ? accentColor : secondaryColor, margin: margin, width: width, height: image ? 45 : null}}
        className='radio-button-container'>
            <div style={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: state ? textColor : primaryColor,
            }}>
            </div>
            {image ?
            <div style={{
                width: 45,
                height: 45,
                borderRadius: '50%',
                overflow: 'hidden',
                marginLeft: 10
            }}>
                <img style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                   
                }} src={image} />
            </div>
            : null}
            <h3 style={{color: textColor, marginLeft: image ? 10 : null}}>{name}</h3>
        </motion.div>
    )
}
