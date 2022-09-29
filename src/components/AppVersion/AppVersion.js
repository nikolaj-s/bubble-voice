// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectCurrentAppVersion } from '../../app/appSlice';

// style
import "./AppVersion.css";

export const AppVersion = () => {
    
    const color = useSelector(selectTextColor);

    const appVersion = useSelector(selectCurrentAppVersion);

    const openLink = () => {
        
        try {

            const shell = window.require('electron').shell;

            shell.openExternal(`https://github.com/nikolaj-s/bubble-voice/releases/tag/v${appVersion}`);

        } catch (error) {
            window.open(`https://github.com/nikolaj-s/bubble-voice/releases/tag/v${appVersion}`);
        }
    
    }

    return (
        <div className='app-version-container'>
            <p
            style={{color: color}}
            >App Version: {appVersion}</p>
            <p style={{color: color}}>Copyright Bubble 2022</p>
            <p onClick={openLink} style={{color: color, cursor: 'pointer'}}>Release Notes</p>
        </div>
    )
}
