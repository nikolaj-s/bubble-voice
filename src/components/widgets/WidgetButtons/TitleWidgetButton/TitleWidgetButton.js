// librarys
import React from 'react'
import { useSelector } from 'react-redux'
import { motion, useAnimation } from 'framer-motion'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./TitleWidgetButton.css";

export const TitleWidgetButton = ({action}) => {

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
        className='title-widget-button-container'
        style={{
            backgroundColor: primaryColor,
            border: `solid 4px ${primaryColor}`
        }}>
            <h2 
            style={{
                color: textColor,
            }}>Title</h2>
        </motion.div>
    )
}
