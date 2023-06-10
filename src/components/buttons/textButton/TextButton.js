import { motion, useAnimation } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./TextButton.css";

export const TextButton = ({name, action, textAlign = 'center', toggled = false, marginBottom, marginTop, id, invert, altInvert}) => {

    const color = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const animation = useAnimation();

    React.useEffect(() => {
        if (toggled) {
            animation.start({
                opacity: altInvert ? 1 : 0.5,
                cursor: 'default',
                border: `solid 3px ${color}`
            })
        } else {
            animation.start({
                opacity: altInvert ? 0.5 : 1,
                cursor: 'pointer',
                border: `solid 3px ${color}`
            })
        }
    // eslint-disable-next-line
    }, [toggled, color])

    const handleAnimation = (arg) => {
        if (toggled) return
        animation.start({
            border: `solid 3px ${arg}`,
        })
    }

    return (
        <motion.button 
        id={id}
        onMouseEnter={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(color)}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        animate={animation} onClick={action} className='text-button' 
        style={{
            backgroundColor: invert ? accentColor : color,
            border: `3px solid ${color}`, 
            textAlign: textAlign, 
            color: textColor, 
            marginBottom: marginBottom,
            marginTop: marginTop}}>
            {name}
        </motion.button>
    )
}
