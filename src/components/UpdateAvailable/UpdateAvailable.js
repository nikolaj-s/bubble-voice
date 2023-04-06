
// library's
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

// state
import { fetchReleaseNotes, selectLoadingReleaseNotes, selectReleaseNotes, selectUpdateAvailableState } from '../../app/appSlice'
import {  selectAccentColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Loading } from '../LoadingComponents/Loading/Loading';
import { TextButton } from '../buttons/textButton/TextButton';
import { ReleaseNote } from '../../features/contentScreen/ReleaseNotes/ReleaseNote/ReleaseNote';

// style
import "./UpdateAvailable.css";

export const UpdateAvailable = () => {

    const dispatch = useDispatch();

    const updateAvailable = useSelector(selectUpdateAvailableState);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const releaseNotes = useSelector(selectReleaseNotes);

    const loadingReleaseNotes = useSelector(selectLoadingReleaseNotes);

    const restartNow = () => {
        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send('restart-to-update');

        } catch (error) {
            return;
        }
    }

    React.useEffect(() => {
        if (updateAvailable) {

            dispatch(fetchReleaseNotes());
        
        }
        
    // eslint-disable-next-line
    }, [updateAvailable])

    return (
        <>
        {updateAvailable ?
            <div 
            style={{
                backdropFilter: 'blur(10px)'
            }}
            className='update-available-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor,
                    border: `solid 4px ${accentColor}`
                }}
                className='update-available-inner-container'>
                    <div className='new-release-note-wrapper'>
                        {releaseNotes[0] ?
                        <ReleaseNote data={releaseNotes[0]} />
                        : null}
                        <Loading loading={loadingReleaseNotes} />
                    </div>
                    <p
                    style={{
                        color: textColor
                    }}
                    >A new update is ready to be installed, and is required for continued use of the application.</p>
                    <TextButton marginBottom={'1rem'} action={restartNow} name={"Restart And Install"} />
                </div>
            </div>
        : null}
        </>
    )
}
