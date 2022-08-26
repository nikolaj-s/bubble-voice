import React from 'react'

import { CloseWindow } from '../../../components/buttons/windowButtons/closeWindow/closeWindow';
import { ExpandWindow } from '../../../components/buttons/windowButtons/expandWindow/expandWindow';
import { MinimizeWindow } from '../../../components/buttons/windowButtons/minimizeWindow/minimizeWindow';

import "./WindowControls.css";


export const WindowControls = () => {

    let ipcRenderer;

    try {
        ipcRenderer  = window.require('electron').ipcRenderer;

    } catch (error) {
        ipcRenderer = null;
    }
    // takes argument to send to main to handle custom window buttons
    // ipcMain is only listening to the following events
    // max, min, and close
    const handleWindowControl = (arg) => {
        if (ipcRenderer === null) return;
        ipcRenderer.send(arg);
    }
    
    return (
        <div className='window-controls-container'>
            {ipcRenderer === null ? null :
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
