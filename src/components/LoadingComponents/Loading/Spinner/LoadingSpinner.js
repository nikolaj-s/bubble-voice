// library
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const LoadingSpinner = ({width = 75, height = 75}) => {

    const color = useSelector(selectTextColor);

    return (
        <motion.div 
        style={{
            width: width,
            height: height
        }}
        
        >
            <svg className='scale-animation' width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M472.997 255.872C473.633 375.717 376.996 472.929 257.152 473C137.308 473.071 39.6395 375.974 39.0031 256.128C38.3668 136.283 135.004 39.071 254.848 39C374.692 38.9291 472.361 136.026 472.997 255.872Z" fill="url(#paint0_linear_0_1)"/>
            <path
            className='rotation'
            
            d="M255.908 25C128.33 25 24.9492 128.422 25 256C25.03 331.173 60.9645 397.96 116.581 440.143M406.069 80.44C455.58 122.807 486.972 185.741 487 256C487.051 383.578 383.67 487 256.092 487C246.711 487 237.46 486.441 228.371 485.354" stroke="#CFF1FF" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M115 225C134.763 169.323 178.593 126.574 236 115" stroke="#C6EEFF" strokeWidth="50" strokeLinecap="round"/>
            <defs>
            <linearGradient id="paint0_linear_0_1" x1="112" y1="106.5" x2="409.271" y2="397.734" gradientUnits="userSpaceOnUse">
            <stop stopColor="#51C9FC"/>
            <stop offset="1" stopColor="#021218"/>
            </linearGradient>
            </defs>
            </svg>
        </motion.div>
    )
}
