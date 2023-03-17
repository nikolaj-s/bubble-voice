// library's
import React from 'react'
import { motion } from "framer-motion"

import { TextButton } from '../textButton/TextButton';

import "./ApplyCancelButton.css";
import { useSelector } from 'react-redux';
import { selectSecondaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ApplyCancelButton = ({apply, cancel, active, name = "Apply", toggled = null, cancelName = "Cancel", position = 'relative', bottom = 0, right = 0, width = '250px'}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <motion.div 
        style={{
            position: position,
            bottom: bottom,
            right: right,
            width: width,
            borderTopLeftRadius: 5,
            backgroundColor: position === 'fixed' ? secondaryColor : null,
            paddingRight: position === 'fixed' ? 10 : null
        }}
        key={"apply-cancel-button"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
        
        className='apply-cancel-button-container'>
            <TextButton invert={true} toggled={toggled === null ? false : !toggled} textAlign='center' name={cancelName} action={cancel} />
            <TextButton toggled={toggled === null ? false :toggled} textAlign='center' name={name} action={toggled ? () => {} : apply} />
        </motion.div>
    )
}
