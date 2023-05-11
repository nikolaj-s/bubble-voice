// library's
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// state
import { selectSecondaryColor, selectServerAmbiance, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Image } from '../Image/Image';

// styles
import "./ServerBanner.css";
import { setServerbannerAmbiance } from '../../features/server/ServerSlice';
import { GetImageColorData } from '../../util/GetImageColorData';

export const ServerBanner = ({serverName, serverImage}) => {

    const color = useSelector(selectTextColor);

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const disableServerAmbiance = useSelector(selectServerAmbiance);

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

    const bannerLoaded = (e) => {
        try {

            if (disableServerAmbiance) return;

           const color = GetImageColorData(e);
        
            dispatch(setServerbannerAmbiance(color));
            
        } catch (err) {
            console.log(err)
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
            <Image backgroundColor={secondaryColor} disableErr={true} onLoad={bannerLoaded} id={"server-banner-image"} position='absolute' objectFit='cover' image={serverImage} />
            <motion.div 
            
            transition={{duration: 0.3}}
            className='server-title-overlay'>
                <h2
                style={{color: color}}
                >{serverName}</h2>
            </motion.div>
        </motion.div>
    )
}
