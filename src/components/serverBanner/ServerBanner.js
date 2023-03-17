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
import { HideButton } from '../buttons/HideButton/HideButton';

export const ServerBanner = ({serverName, serverImage}) => {

    const [hideServerBar, toggleHideServerBar] = React.useState(false)

    const color = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor)

    const handleHideServerBar = () => {
        if (hideServerBar) {
            document.getElementById('side-server-list-wrapper').style.display = 'flex';
            document.getElementById('side-server-list-wrapper').style.width = '55px';
        } else {
            document.getElementById('side-server-list-wrapper').style.display = 'none';
            document.getElementById('side-server-list-wrapper').style.width = '0px';
        }

        toggleHideServerBar(!hideServerBar)
    }

    React.useEffect(() => {
        
        return () => {
            try {
                document.getElementById('side-server-list-wrapper').style.display = 'flex';
                document.getElementById('side-server-list-wrapper').style.width = '55px';
            } catch(err) {
                return;
            }
        }
    }, [])

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
                <HideButton hiddenState={hideServerBar} action={handleHideServerBar} flip_description={true} invert={false} altInvert={true} width={15} height={15} padding={4} margin={"0 0 0 3px"} />
                <h2
                style={{color: color}}
                >{serverName}</h2>
            </motion.div>
        </motion.div>
    )
}
