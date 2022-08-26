// library's
import React from 'react'
import { motion } from "framer-motion"

import { TextButton } from '../textButton/TextButton';

import "./ApplyCancelButton.css";

export const ApplyCancelButton = ({apply, cancel, active, name = "Apply", toggled = null}) => {

    

    return (
        <motion.div key={"apply-cancel-button"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
        
        className='apply-cancel-button-container'>
            <TextButton toggled={toggled === null ? false : !toggled} textAlign='center' name={"Cancel"} action={cancel} />
            <TextButton toggled={toggled === null ? false :toggled} textAlign='center' name={name} action={apply} />
        </motion.div>
    )
}
