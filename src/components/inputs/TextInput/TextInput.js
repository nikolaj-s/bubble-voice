import { motion, useAnimation } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./TextInput.css";

export const TextInput = ({action = () => {}, placeholder, inputValue, keyCode = false, type = 'text', stateSelector = "", marginBottom = '0', marginTop = '0', id}) => {

    const color = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const focusColor = useSelector(selectTextColor);

    const animation = useAnimation();

    const returnInputValue = (e) => {
        action(e.target.value, stateSelector)
    }

    const returnKeyCode = (e) => {
        if (e.button === 0 || e.button === 1) return;

        if (keyCode === false) {
            return
        }
        
        keyCode(e.keyCode, stateSelector, e)
    }

    const handleMouseButton = (e) => {
        if (e.button === 0 || e.button === 1) return;
        
        if (keyCode === false) return;

        keyCode(e.button, stateSelector, {key: String(e.nativeEvent.which), nativeEvent: {key: `Mouse Button ${e.nativeEvent.which}`}, keyCode: e.nativeEvent.which})
    }

    const handleAnimation = (e, color) => {

        if (e !== false) action(e.target.value);
    
        animation.start({
            border: `2px solid ${color}`
        })
    }

    return (
        
        <motion.div
        onBlur={(e) => {handleAnimation(e, color)}} 
        onFocus={(e) => {handleAnimation(e, focusColor)}}
        onMouseOver={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(false, accentColor)
            }  
        }}
        onMouseOut={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(false, color)
            }
        }}
        animate={animation} 
        style={{
            backgroundColor: color,
            border: `solid 2px ${color}`,
            marginBottom: marginBottom,
            marginTop: marginTop
        }} 
        className='text-input-container'>
            <input id={id} onMouseUpCapture={handleMouseButton} className='text-input' style={{color: focusColor}} onKeyUp={returnKeyCode} onChange={returnInputValue} type={type} placeholder={placeholder} value={inputValue} />
        </motion.div>
    )
}
