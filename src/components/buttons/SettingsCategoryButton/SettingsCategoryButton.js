// library's
import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style's
import "./SettingsCategoryButton.css";

export const SettingsCategoryButton = ({name, link, action, active}) => {

    const animation = useAnimation();
    
    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleAction = () => {
        action(link)
    }

    const handleAnimation = (arg) => {

        animation.start({
            border: `solid 4px ${arg}`
        })

    }

    React.useEffect(() => {
        if (active === false) {
            animation.start({
                border: `solid 4px ${primaryColor}`
            })
        }
    // eslint-disable-next-line
    }, [active, primaryColor])

    return (
        <motion.div 
        animate={animation}
        onMouseEnter={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(active ? accentColor : primaryColor)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        onClick={handleAction}
        className='settings-category-button'
        style={{
            backgroundColor: active ? accentColor : primaryColor,
            cursor: active ? 'default' : 'pointer',
            border: `solid 4px ${active ? accentColor : primaryColor}`
        }}
        >
            <h3 style={{color: textColor}}>{name}</h3>
        </motion.div>
    )
}
