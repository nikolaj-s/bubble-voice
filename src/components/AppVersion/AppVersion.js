// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectCurrentAppVersion } from '../../app/appSlice';

// style
import "./AppVersion.css";

import { Loading } from '../LoadingComponents/Loading/Loading';
import { PaypalDonateButton } from '../PaypalDonateButton/PaypalDonateButton';

export const AppVersion = () => {
    
    const color = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const appVersion = useSelector(selectCurrentAppVersion);

    const [loading, toggleLoading] = React.useState(false);

    const openLink = () => {
        
        try {

            const shell = window.require('electron').shell;

            shell.openExternal(`https://github.com/nikolaj-s/bubble-voice/releases/tag/v${appVersion}`);

        } catch (error) {
            window.open(`https://github.com/nikolaj-s/bubble-voice/releases/tag/v${appVersion}`);
        }
    
    }

    const checkForUpdate = async () => {

        let ipcRenderer;

        if (loading) return;

        try {
            toggleLoading(true);

            ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send('check-for-updates');

            setTimeout(() => {
                toggleLoading(false);
            }, 6000)
        } catch (err) {
            toggleLoading(false)
        }
        
    }

    return (
        <>
       
        <div 
        style={{backgroundColor: secondaryColor}}
        className='app-version-container'>
            
            <p
            style={{color: color}}
            >App Version: {appVersion}</p>
            <p style={{color: color}}>Copyright Bubble 2023</p>
            <p className='app-version-buttons' onClick={openLink} style={{color: color, cursor: 'pointer'}}>Release Notes</p>
            <p onClick={checkForUpdate} className='app-version-buttons' style={{color: color, cursor: 'pointer'}}>Check For Updates</p>
            <Loading loading={loading} />
        </div>
        <PaypalDonateButton />
        </>
    )
}
