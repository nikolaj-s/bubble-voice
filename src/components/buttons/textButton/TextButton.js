import { motion, useAnimation } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./TextButton.css";

export const TextButton = ({name, action, textAlign = 'center', toggled = false, marginBottom, marginTop}) => {

    const color = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const animation = useAnimation();

    React.useEffect(() => {
        if (toggled) {
            animation.start({
                opacity: 0.5,
                cursor: 'default',
                border: `solid 4px ${color}`
            })
        } else {
            animation.start({
                opacity: 1,
                cursor: 'pointer',
                border: `solid 4px ${color}`
            })
        }
    // eslint-disable-next-line
    }, [toggled, color])

    const handleAnimation = (arg) => {
        if (toggled) return
        animation.start({
            border: `solid 4px ${arg}`
        })
    }

    return (
        <motion.button 
        onMouseEnter={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(color)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        animate={animation} onClick={action} className='text-button' 
        style={{
            backgroundColor: color,
            border: `4px solid ${color}`, 
            textAlign: textAlign, 
            color: textColor, 
            marginBottom: marginBottom,
            marginTop: marginTop}}>
            {name}
        </motion.button>
    )
}
