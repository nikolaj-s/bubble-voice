
// library's
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

// state
import { handleUpdateAvailable, selectUpdateAvailableState } from '../../app/appSlice'
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { ApplyCancelButton } from '../buttons/ApplyCancelButton/ApplyCancelButton';

// style
import "./UpdateAvailable.css";

export const UpdateAvailable = () => {

    const dispatch = useDispatch();

    const updateAvailable = useSelector(selectUpdateAvailableState);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const handleCancel = () => {
        dispatch(handleUpdateAvailable(false));
    }

    const restartNow = () => {
        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send('restart-to-update');

        } catch (error) {
            return;
        }
    }

    return (
        <>
        {updateAvailable ?
            <div 
            style={{
                backgroundColor: primaryColor
            }}
            className='update-available-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor
                }}
                className='update-available-inner-container'>
                    <p
                    style={{
                        color: textColor
                    }}
                    >A new update is ready to be installed.  Would you like to restart and install now or install on next launch?</p>
                    <ApplyCancelButton apply={restartNow} cancel={handleCancel} cancelName='Update Next Launch' name='Update Now'  />
                </div>
            </div>
        : null}
        </>
    )
}
