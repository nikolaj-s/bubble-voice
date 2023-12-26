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
import { selectCreateChannelMenuState, selectUsersPermissions, setServerbannerAmbiance, toggleCreateChannelMenu } from '../../features/server/ServerSlice';
import { GetImageColorData } from '../../util/GetImageColorData';
import { AltDownIcon } from '../Icons/AltDownIcon/AltDownIcon';
import { ServerManageMenu } from './ServerManageMenu/ServerManageMenu';

export const ServerBanner = ({serverName, serverImage, handleLeave}) => {

    const color = useSelector(selectTextColor);

    const [hover, toggleHover] = React.useState(false);

    const [open, toggleOpen] = React.useState(false);

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const disableServerAmbiance = useSelector(selectServerAmbiance);

    const createChannelMenuOpen = useSelector(selectCreateChannelMenuState);

    const permissions = useSelector(selectUsersPermissions)

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

    const openCreateChannelMenu = () => {
        
        dispatch(toggleCreateChannelMenu(!createChannelMenuOpen))

    }

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
        <>
        <motion.div 
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        onClick={() => {toggleOpen(!open)}}
        onContextMenu={(e) => {e?.stopPropagation(); e?.preventDefault(); toggleOpen(!open)}}
        style={{
            borderBottomLeftRadius: open ? 0 : null,
            borderBottomRightRadius: open ? 0 : null,
            filter: hover ? 'brightness(110%)' : null,
           
        }}
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}

        transition={{duration: 0.3}}
        className='server-banner-container' >
            {serverImage ?
            <Image disableErr={true} cursor='pointer' backgroundColor={secondaryColor} id={"server-banner-image"} position='absolute' objectFit='cover' image={serverImage} />
            :
            <div className='server-banner-placeholder' />
            }
            <motion.div 
            style={{
                opacity: hover ? 1 : 0.8
            }}
            transition={{duration: 0.3}}
            className='server-title-overlay'>
                <h2
                style={{color: color}}
                >{serverName}</h2>
                <AltDownIcon flip={open}  />
            </motion.div>
            
        </motion.div>
        <ServerManageMenu openServerSettings={toggleServerSettings} leaveServer={handleLeave} permissions={permissions} openAddChannel={openCreateChannelMenu} open={open} />
        </>
    )
}
