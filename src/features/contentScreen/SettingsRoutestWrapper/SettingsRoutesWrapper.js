// library's
import React from 'react'
import { useDispatch } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { AccountSettings } from '../../settings/appSettings/accountSettings/AccountSettings'
import { AppearanceSettings } from '../../settings/appSettings/appearanceSettings/AppearanceSettings'
import { KeyBindSettings } from '../../settings/appSettings/keyBindSettings/KeyBindSettings'
import { VoiceVideoSettings } from '../../settings/appSettings/voiceVideoSettings/VoiceVideoSettings'
import { setHeaderTitle } from '../contentScreenSlice'

// style's
import "./SettingsRoutesWrapper.css";

const Wrapper = () => {
    
    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => {
            if (window.location.hash.search('server') !== -1) {
                dispatch(setHeaderTitle('Select Channel'));
            } else {
                dispatch(setHeaderTitle('Select Server'));
            }
        }
    }, [])

    return (
        <div className='settings-routes-wrapper'>
            <AccountSettings />
            <AppearanceSettings />
            <KeyBindSettings />
            <VoiceVideoSettings />
        </div>
    )
}

export const SettingsRoutesWrapper = () => useRoutes([
    {path: "createserver/appsettings/*", element: <Wrapper />},
    {path: "server/:id/appsettings/*", element: <Wrapper />},
    {path: "appsettings/*", element: <Wrapper />}
])



