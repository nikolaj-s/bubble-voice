import { motion, useAnimation } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./TextButton.css";

export const TextButton = ({name, action, textAlign = 'center', toggled = false, marginBottom, marginTop, id, invert, altInvert, icon, width}) => {

    const color = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const animation = useAnimation();

    React.useEffect(() => {
        if (toggled) {
            animation.start({
                opacity: altInvert ? 1 : 0.5,
                cursor: 'default',
                border: `solid 3px ${color}`,
                backgroundColor: color
            })
        } else {
            animation.start({
                opacity: altInvert ? 0.5 : 1,
                cursor: 'pointer',
                border: `solid 3px ${color}`,
                backgroundColor: color
            })
        }
    // eslint-disable-next-line
    }, [toggled, color])

    const handleAnimation = (arg) => {
        if (toggled) return
        animation.start({
            border: `solid 3px ${arg}`,
            backgroundColor: arg === textColor ? secondaryColor : arg
        })
    }

    return (
        <motion.button 
        transition={{duration: 0.1}}
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
            width: width,
            marginTop: marginTop}}>
           <p style={{maxWidth: icon ? 'calc(100% - 30px)' : null}}>{name}</p>
           {textAlign === 'center' ? null :
            icon
           }
        </motion.button>
    )
}
