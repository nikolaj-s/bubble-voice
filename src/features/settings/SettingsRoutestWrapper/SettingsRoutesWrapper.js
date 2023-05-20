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
import { selectSecondaryColor, selectAccentColor } from '../appSettings/appearanceSettings/appearanceSettingsSlice'

// style's
import "./SettingsRoutesWrapper.css";
import { SoundSettings } from '../appSettings/soundSettings/SoundSettings'
import { CloseSettings } from '../../../components/CloseSettings/CloseSettings'
import { MiscellaneousSettings } from '../appSettings/MiscellaneousSettings/MiscellaneousSettings'
import { MenuButton } from '../../../components/buttons/MenuButton/MenuButton'
import { motion } from 'framer-motion'

const Wrapper = () => {
    
    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectAccentColor);

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
        style={{
            backgroundColor: secondaryColor,
            borderLeft: `solid 2px ${textColor}`
        }} 
        className='settings-routes-wrapper'>
            <AccountSettings />
            <AppearanceSettings />
            <KeyBindSettings />
            <MiscellaneousSettings />
            <SoundSettings />
            <VoiceVideoSettings />
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



