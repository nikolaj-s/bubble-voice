// library's
import React from 'react'
import { motion } from "framer-motion"

import { TextButton } from '../textButton/TextButton';

import "./ApplyCancelButton.css";
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectSecondaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ApplyCancelButton = ({apply, cancel, active, name = "Apply", toggled = null, cancelName = "Cancel", position = 'fixed', flip}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <motion.div 
        style={{
            backgroundColor: secondaryColor,
            position: position,
            justifyContent: flip ? 'flex-start' : 'flex-end',
            zIndex: position === 'relative' ? 0 : null,
            borderTop: position === 'relative' ? null : `solid 3px ${primaryColor}`
        }}
        key={"apply-cancel-button"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
        
        className='apply-cancel-button-container'>
            <TextButton invert={true} toggled={toggled === null ? false : !toggled} textAlign='center' name={cancelName} action={cancel} />
            <TextButton toggled={toggled === null ? false :toggled} textAlign='center' name={name} action={toggled ? () => {} : apply} />
        </motion.div>
    )
}
