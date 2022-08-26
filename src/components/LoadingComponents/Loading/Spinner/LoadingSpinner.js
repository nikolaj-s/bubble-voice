// library
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const LoadingSpinner = () => {

    const color = useSelector(selectTextColor);

    return (
        <motion.div 
        style={{
            width: 75,
            height: 75
        }}
        
        animate={{rotate: ["0deg", "360deg"]}}
        transition={{ease: "linear", duration: "0.7", repeat: Infinity}}
        
        >
            <svg style={{width: '100%', height: '100%', objectFit: 'cover'}} width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5 12.5V6.25C33.3962 6.25 29.3326 7.05831 25.5411 8.62876C21.7497 10.1992 18.3047 12.5011 15.4029 15.4029C9.5424 21.2634 6.25 29.212 6.25 37.5H12.5C12.5 30.8696 15.1339 24.5107 19.8223 19.8223C24.5107 15.1339 30.8696 12.5 37.5 12.5V12.5Z" fill={color} />
            </svg>
        </motion.div>
    )
}
