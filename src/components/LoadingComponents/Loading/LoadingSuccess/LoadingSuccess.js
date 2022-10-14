// library
import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// state
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const LoadingSuccess = ({width = 75, height =  75}) => {

    const textColor = useSelector(selectTextColor)

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        style={{
            width: width,
            height: height
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
            <path d="M38.25 7C20.9906 7 7 20.9917 7 38.25C7 55.5083 20.9917 69.5 38.25 69.5C55.5083 69.5 69.5 55.5083 69.5 38.25C69.5 20.9917 55.5083 7 38.25 7ZM30.9844 57L30.9635 56.9792L30.9458 57L16.375 42L23.6969 34.5375L30.9646 42.0208L52.8396 19.501L60.125 26.999L30.9844 57Z" fill={textColor}/>
            </svg>
        </motion.div>
    )
}
