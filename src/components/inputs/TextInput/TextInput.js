import { motion, useAnimation } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./TextInput.css";

export const TextInput = ({action, placeholder, inputValue, keyCode, type = 'text', stateSelector = ""}) => {

    const color = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const animation = useAnimation();

    const handleFocusAnimation = () => {
        animation.start({
            border: `solid 4px ${accentColor}`
        })
    }

    const handleBlurAnimation = () => {
        animation.start({
            border: `4px solid ${color}`
        })
    }

    const returnInputValue = (e) => {
        action(e.target.value, stateSelector)
    }

    const returnKeyCode = (e) => {
        keyCode(e.target.keyCode)
    }

    return (
        
        <motion.div onBlur={handleBlurAnimation} onFocus={handleFocusAnimation} animate={animation} style={{backgroundColor: color, border: `solid 4px ${color}`}} className='text-input-container'>
            <input onKeyUp={returnKeyCode} onChange={returnInputValue} type={type} placeholder={placeholder} value={inputValue} />
        </motion.div>
    )
}
