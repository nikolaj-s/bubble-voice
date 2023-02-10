// library's
import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style's
import "./SettingsCategoryButton.css";

export const SettingsCategoryButton = ({name, link, action, active}) => {

    const animation = useAnimation();
    
    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const [hover, toggleHover] = React.useState(false);

    const handleAction = () => {
        action(link)
    }

    const handleAnimation = (arg) => {

        toggleHover(arg)

    }


    return (
        <motion.div 
        animate={animation}
        onMouseEnter={() => {handleAnimation(true)}}
        onMouseLeave={() => {handleAnimation(false)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        onClick={handleAction}
        className='settings-category-button'
        style={{
            backgroundColor: active ? accentColor : hover ? primaryColor : secondaryColor,
            cursor: active ? 'default' : 'pointer',
        }}
        >
            <h3 style={{color: textColor}}>{name}</h3>
        </motion.div>
    )
}
