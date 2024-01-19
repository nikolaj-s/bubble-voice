import React from 'react'

import { CloseWindow } from '../../../components/buttons/windowButtons/closeWindow/closeWindow';
import { ExpandWindow } from '../../../components/buttons/windowButtons/expandWindow/expandWindow';
import { MinimizeWindow } from '../../../components/buttons/windowButtons/minimizeWindow/minimizeWindow';

import "./WindowControls.css";
import { useSelector } from 'react-redux';
import { selectOnMacOs } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';


export const WindowControls = () => {

    const onMac = useSelector(selectOnMacOs);

    const [browser, toggleBrowser] = React.useState(false);

    React.useEffect(() => {

        try {
            let ipcRenderer = window.require('electron').ipcRenderer;
        } catch (e) {
            toggleBrowser(true);
        }

    }, [])

    // takes argument to send to main to handle custom window buttons
    // ipcMain is only listening to the following events
    // max, min, and close
    const handleWindowControl = (arg) => {
        let ipcRenderer;
        
        try {
            ipcRenderer  = window.require('electron').ipcRenderer;

            if (ipcRenderer === null) return;

            ipcRenderer.send(arg);

        } catch (error) {
            ipcRenderer = null;
        }
        
    }
    
    return (
        <div className='window-controls-container'>
            {browser || onMac ? null :
            (
            <>
            <MinimizeWindow action={handleWindowControl} />
            <ExpandWindow action={handleWindowControl} />
            <CloseWindow action={handleWindowControl} />
            </>
            )
            }
        </div>
    )
}
