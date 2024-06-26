import { motion, useAnimation } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./TextInput.css";
import { SearchIcon } from '../../Icons/SearchIcon/SearchIcon';

export const TextInput = ({action = () => {}, placeholder, inputValue, keyCode = false, type = 'text', stateSelector = "", marginBottom = '0', marginTop = '0', id, invert, showSearchIcon = false, enableClear = false}) => {

    const color = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

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
            border: `3px solid ${color}`
        })
    }

    return (
        
        <motion.div
        onKeyDown={(e) => {e.stopPropagation()}}
        onBlur={(e) => {handleAnimation(e, color)}} 
        onFocus={(e) => {handleAnimation(e, focusColor)}}
        onMouseOver={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(false, accentColor)
            }  
        }}
        transition={{duration: 0.1}}
        onMouseOut={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(false, invert ? secondaryColor :  color)
            }
        }}
        animate={animation} 
        style={{
            backgroundColor: invert ? secondaryColor : color,
            border: `solid 3px ${invert ? secondaryColor : color}`,
            marginBottom: marginBottom,
            marginTop: marginTop
        }} 
        className='text-input-container'>
            <input id={id} onMouseUpCapture={handleMouseButton} className='text-input' style={{color: focusColor}} onKeyUp={returnKeyCode} onChange={returnInputValue} type={type} placeholder={placeholder} value={inputValue} />
            {showSearchIcon ? <SearchIcon /> : null}
        </motion.div>
    )
}
