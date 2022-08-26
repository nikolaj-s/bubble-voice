// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./TextArea.css";

export const TextArea = ({action = () => {}, placeHolder, inputValue, margin}) => {

    const animation = useAnimation();

    const color = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleAnimation = (color) => {
        animation.start({
            border: `4px solid ${color}`
        })
    }

    const returnInputValue = (e) => {
        action(e.target.value);
    }

    return (
        <motion.div
        animate={animation}
        className='text-area-container'
        style={{border: `4px solid ${color}`}}
        onBlur={() => {handleAnimation(color)}}
        onFocus={() => {handleAnimation(textColor)}}
        onMouseOver={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(accentColor)
            }
        }}
        onMouseOut={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(color)
            }
        }}
        >
            <textarea 
            onChange={returnInputValue} style={{color: textColor, backgroundColor: color}} placeholder={placeHolder} value={inputValue} />
        </motion.div>
    )
}
