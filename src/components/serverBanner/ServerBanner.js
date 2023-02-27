// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Image } from '../Image/Image';
import { SettingsButton } from '../buttons/settingsButton/settingsButton'
// styles
import "./ServerBanner.css";
import { selectDisableTransparancyEffects } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const ServerBanner = ({serverName, serverImage}) => {

    const color = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor)

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects)
    
    const toggleServerSettings = () => {

        if (window.location.hash.includes('server-settings')) {
           
            window.location.hash = window.location.hash.split('/server-settings')[0]
            
        } else {
            if (window.location.hash.includes('appsettings')) {
                window.location.hash = window.location.hash.split('/appsettings')[0] + "/server-settings/overview"
            } else {
                window.location.hash = window.location.hash + '/server-settings/overview'
            }
            
        }
    }

    return (
        <motion.div 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        transition={{duration: 0.3}}
        className='server-banner-container' >
            <Image position='absolute' objectFit='cover' image={serverImage} />
            <motion.div 
            
            transition={{duration: 0.3}}
            style={{backgroundColor: disableTransparancyEffects ? primaryColor : `rgba(${primaryColor.split('(')[1].split(')')[0]}, 0.7)`}}
            className='server-title-overlay'>
                <h2
                style={{color: color}}
                >{serverName}</h2>
                <SettingsButton id="server-settings-button" flip_desc={true} action={toggleServerSettings} description='Edit' desc_space={14} width={18} height={18} padding={4}  />
            </motion.div>
        </motion.div>
    )
}
