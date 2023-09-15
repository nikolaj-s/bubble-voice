import React from 'react'

import "./ProcessingIndicator.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { motion } from 'framer-motion'

export const ProcessingIndicator = () => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div style={{backgroundColor: accentColor}} className='processing-indicator-container'>
            <p style={{color: textColor}}>Processing</p>
            <motion.div 
            className='processing-bar-indication'
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                top: 0,
                left: 0,
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>   
        </div>
    )
}
