// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// state
import {  selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Image } from '../Image/Image';

// styles
import "./ServerBanner.css";

export const ServerBanner = ({serverName, serverImage}) => {

    const color = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor)

    return (
        <motion.div 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        style={{backgroundColor: primaryColor}}
        transition={{duration: 0.3}}
        className='server-banner-container' >
            <Image id={"server-banner-image"} position='absolute' objectFit='cover' image={serverImage} />
            <motion.div 
            
            transition={{duration: 0.3}}
            style={{backgroundColor: primaryColor}}
            className='server-title-overlay'>
                <h2
                style={{color: color}}
                >{serverName}</h2>
            </motion.div>
        </motion.div>
    )
}
