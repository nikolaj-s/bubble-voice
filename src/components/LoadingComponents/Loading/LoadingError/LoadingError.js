// library
import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// state
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const LoadingError = () => {

    const textColor = useSelector(selectTextColor)

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        style={{
            width: 75,
            height: 75
        }}
        className='loading-icon-atr'
        >
            <svg 
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }}
            width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.3531 6.25C20.2031 6.25 6.25 20.2687 6.25 37.5C6.25 54.7312 20.2687 68.75 37.5 68.75C54.7312 68.75 68.75 54.7312 68.75 37.5C68.75 20.2687 54.6656 6.25 37.3531 6.25ZM40.625 53.125H34.375V46.875H40.625V53.125ZM40.625 40.625H34.375V21.875H40.625V40.625Z" fill={textColor} />
            </svg>
        </motion.div>
    )
}