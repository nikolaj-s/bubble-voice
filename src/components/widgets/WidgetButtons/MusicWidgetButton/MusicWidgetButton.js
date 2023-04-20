// librarys
import React from 'react'
import { useSelector } from 'react-redux'
import { motion, useAnimation } from 'framer-motion'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "../ImageWidgetButton/ImageWidgetButton.css";

export const MusicWidgetButton = ({action, prev = false}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const handleAnimation = (color) => {
        if (prev) return;
        animation.start({
            border: `4px solid ${color}`
        })
    }

    const handleAction = () => {
        if (prev) return;

        action();
    }

    return (
        <motion.div 
        onClick={handleAction}
        animate={animation}
        onMouseOver={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(primaryColor)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        className='image-widget-button-container'
        style={{
            backgroundColor: primaryColor,
            border: `solid 4px ${primaryColor}`,
            cursor: prev ? 'default' : 'pointer',
            
        }}>
            <div>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.583 18.75H44.7913M5.20801 43.75H10.4163H5.20801ZM5.20801 37.5H10.4163H5.20801ZM5.20801 31.25H10.4163H5.20801ZM5.20801 25H10.4163H5.20801ZM16.6663 43.75H21.8747H16.6663ZM16.6663 37.5H21.8747H16.6663ZM16.6663 31.25H21.8747H16.6663ZM16.6663 25H21.8747H16.6663ZM16.6663 18.75H21.8747H16.6663ZM16.6663 12.5H21.8747H16.6663ZM16.6663 6.25H21.8747H16.6663ZM28.1247 43.75H33.333H28.1247ZM39.583 43.75H44.7913H39.583ZM28.1247 37.5H33.333H28.1247ZM39.583 37.5H44.7913H39.583ZM28.1247 31.25H33.333H28.1247ZM39.583 31.25H44.7913H39.583ZM39.583 25H44.7913H39.583Z" stroke={textColor} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </div>
            <h2 style={{color: textColor}}>Media</h2>
        </motion.div>
    )
}