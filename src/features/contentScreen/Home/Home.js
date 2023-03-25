// library's
import { motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const Home = () => {

    const color = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    return (
        <motion.div 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0
        }}
        style={{backgroundColor: glass ? glassColor : secondaryColor}}
        key={'home-content-wrapper'}
        className='home-content-wrapper'>
            <h1 style={{color: color}}>No Server Selected</h1>
            <h3 style={{color: color}}>Join or Create a Server</h3>
        </motion.div>
    )
}
