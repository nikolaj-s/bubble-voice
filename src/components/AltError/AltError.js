// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { motion } from 'framer-motion';

// component's
import { WarningIcon } from '../Icons/WarningIcon/WarningIcon';

// style's
import "./AltError.css";

export const AltError = ({error = false, errorMessage, marginTop}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <>
        {error ?
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        style={{
            marginTop: marginTop
        }}
        className='alt-error-container'>
            <WarningIcon />
            <p
            style={{color: textColor}}
            >{errorMessage}</p>
        </motion.div>
        : null
        }
        </>
    )
}
