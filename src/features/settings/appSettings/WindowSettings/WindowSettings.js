import React from 'react'
import { useRoutes } from 'react-router'
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader'
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle'
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton'

const Settings = () => {
    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Window Settings"} />
            <InputTitle title={"Enable app start on windows boot"} />
            <ToggleButton />
            <InputTitle title={"Close button minimizes bubble back to the tray"} />
            <ToggleButton />
        </div>
    )
}


export const WindowSettings = () => useRoutes([
    {path: "window-settings", element: <Settings />}
])