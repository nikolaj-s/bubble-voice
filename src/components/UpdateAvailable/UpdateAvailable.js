
// library's
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

// state
import { fetchReleaseNotes, selectLoadingReleaseNotes, selectReleaseNotes, selectUpdateAvailableState } from '../../app/appSlice'
import {  selectAccentColor, selectGlassColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Loading } from '../LoadingComponents/Loading/Loading';
import { TextButton } from '../buttons/textButton/TextButton';
import { ReleaseNote } from '../../features/contentScreen/ReleaseNotes/ReleaseNote/ReleaseNote';

// style
import "./UpdateAvailable.css";
import { RestartIcon } from '../Icons/RestartIcon/RestartIcon';

export const UpdateAvailable = () => {

    const dispatch = useDispatch();

    const [close, toggleClose] = React.useState(false);

    const updateAvailable = useSelector(selectUpdateAvailableState);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const glassColor = useSelector(selectGlassColor);

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
        {updateAvailable && !close ?
            <div 
            style={{
                backgroundColor: glassColor
            }}
            className='update-available-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor,
                    boxShadow: '10px 10px 30px rgba(0,0,0,0.8)'
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
                    >A new update is ready to be installed, and is recommended for continued use of the application.</p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        marginRight: 10
                    }}>
                        <h2 onClick={() => {toggleClose(true)}} className='install-on-exit' style={{color: textColor}}>Install Later</h2>
                        <TextButton width={220} marginBottom={'5px'} action={restartNow} name={"Restart And Install"} icon={<RestartIcon width={20} height={20} />} />
                        
                    </div>
                   </div>
            </div>
        : null}
        </>
    )
}
