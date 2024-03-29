// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { AccountSettings } from '../appSettings/accountSettings/AccountSettings'
import { AppearanceSettings } from '../appSettings/appearanceSettings/AppearanceSettings'
import { KeyBindSettings } from '../appSettings/keyBindSettings/KeyBindSettings'
import { VoiceVideoSettings } from '../appSettings/voiceVideoSettings/VoiceVideoSettings'
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice'

// state
import { selectSecondaryColor } from '../appSettings/appearanceSettings/appearanceSettingsSlice'

// style's
import "./SettingsRoutesWrapper.css";
import { SoundSettings } from '../appSettings/soundSettings/SoundSettings'
import { CloseSettings } from '../../../components/CloseSettings/CloseSettings'
import { MiscellaneousSettings } from '../appSettings/MiscellaneousSettings/MiscellaneousSettings'
import { MenuButton } from '../../../components/buttons/MenuButton/MenuButton'
import { motion } from 'framer-motion'
import { SocialSettings } from '../appSettings/socialSettings/socialSettings'
import { WindowSettings } from '../appSettings/WindowSettings/WindowSettings'
import { NotificationSettings } from '../appSettings/NotificationSettings/NotificationSettings'

const Wrapper = () => {
    
    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const [open, toggleOpen] = React.useState(false);

    React.useEffect(() => {
        return () => {
            if (window.location.hash.search('server') !== -1) {
                dispatch(setHeaderTitle('Select Channel'));
            } else {
                dispatch(setHeaderTitle('Select Server'));
            }
        }
    // eslint-disable-next-line
    }, [])

    const openMobileSettingsMenu = () => {
        const el = document.getElementsByClassName('settings-routes-wrapper')[0]

        if (open) {
            el.style.display = 'none'
            toggleOpen(false);
        } else {
            el.style.display = 'flex'
            toggleOpen(true)
        }
    }

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.1}}
        style={{
            backgroundColor: secondaryColor,
            borderLeft: `solid 2px ${secondaryColor}`,
            borderTop: `30px solid ${secondaryColor}`,
            borderRight: `8px solid ${secondaryColor}`,
            borderBottom: `8px solid ${secondaryColor}`
        }} 
        className='settings-routes-wrapper'>
            <AccountSettings />
            <AppearanceSettings />
            <KeyBindSettings />
            <MiscellaneousSettings />
            <SoundSettings />
            <VoiceVideoSettings />
            <SocialSettings />
            <WindowSettings />
            <NotificationSettings />
            <CloseSettings />
            <MenuButton position={'fixed'} action={openMobileSettingsMenu} top={0} right={60} />
        </motion.div>
    )
}

export const SettingsRoutesWrapper = () => useRoutes([
    {path: "createserver/appsettings/*", element: <Wrapper />},
    {path: "join-server/:id/appsettings/*", element: <Wrapper />},
    {path: "server/:id/create-channel-menu/appsettings/*", element: <Wrapper />},
    {path: "server/:id/channel/:id/create-channel-menu/appsettings/*", element: <Wrapper />},
    {path: "server/:id/channel/:id/appsettings/*", element: <Wrapper />},
    {path: "server/:id/channel/:id/server-settings/:id/appsettings/*", element: <Wrapper />},
    {path: "server/:id/appsettings/*", element: <Wrapper />},
    {path: "server/:id/server-settings/:id/appsettings/*", element: <Wrapper />},
    {path: "appsettings/*", element: <Wrapper />}
])



