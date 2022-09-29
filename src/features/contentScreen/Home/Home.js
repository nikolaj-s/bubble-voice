// library's
import { motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const Home = () => {

    const color = useSelector(selectTextColor);

    return (
        <motion.div 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 0.5
        }}
        exit={{
            opacity: 0
        }}
        key={'home-content-wrapper'}
        className='home-content-wrapper'>
            <h1 style={{color: color}}>No Server Selected</h1>
            <h3 style={{color: color}}>Join or Create a Server</h3>
        </motion.div>
    )
}
