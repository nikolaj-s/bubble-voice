// librarys
import React from 'react'
import { useSelector } from 'react-redux'
import { motion, useAnimation } from 'framer-motion'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "../ImageWidgetButton/ImageWidgetButton.css";

export const VideoWidgetButton = ({action}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const handleAnimation = (color) => {
        animation.start({
            border: `4px solid ${color}`
        })
    }

    return (
        <motion.div 
        onClick={action}
        animate={animation}
        onMouseOver={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(primaryColor)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        className='image-widget-button-container'
        style={{
            backgroundColor: primaryColor,
            border: `solid 4px ${primaryColor}`
        }}>
            <div>
            <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.25 12.5H18.75C11.8464 12.5 6.25 18.0964 6.25 25V50C6.25 56.9036 11.8464 62.5 18.75 62.5H56.25C63.1536 62.5 68.75 56.9036 68.75 50V25C68.75 18.0964 63.1536 12.5 56.25 12.5Z" stroke={textColor} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46.875 37.5L31.25 28.125V46.875L46.875 37.5Z" stroke={textColor} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </div>
            <h2 style={{color: textColor}}>Video</h2>
        </motion.div>
    )
}