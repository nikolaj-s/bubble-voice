// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// state
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

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
            height: '122px',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
            border: `solid 4px ${primaryColor}`
        }}
        animate={{
            height: '170px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            border: 'solid 0px transparent'
        }}
        transition={{duration: 0.3}}
        className='server-banner-container' >
            <Image position='absolute' objectFit='cover' image={serverImage} />
            <motion.div 
            initial={{
                right: "-100%",
                height: '150%',
                width: '200%',
            }}
            animate={{
                right: 0,
                width: '100%',
                height: '40px', 
            }}
            transition={{duration: 0.3}}
            style={{backgroundColor: `rgba(${primaryColor.split('(')[1].split(')')[0]}, 0.7)`}}
            className='server-title-overlay'>
                <h2
                style={{color: color}}
                >{serverName}</h2>
            </motion.div>
        </motion.div>
    )
}
