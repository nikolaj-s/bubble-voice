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


const Wrapper = () => {
    
    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

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

    return (
        <div
        style={{
            backgroundColor: secondaryColor
        }} 
        className='settings-routes-wrapper'>
            <AccountSettings />
            <AppearanceSettings />
            <KeyBindSettings />
            <MiscellaneousSettings />
            <SoundSettings />
            <VoiceVideoSettings />
            <CloseSettings />
        </div>
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



