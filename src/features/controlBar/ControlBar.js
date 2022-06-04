// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// components
import { WebCamButton } from '../../components/buttons/mediaButtons/webcamButton/WebCamButton';
import { SettingsButton } from '../../components/buttons/settingsButton/settingsButton';
import { MicToggleButton } from '../../components/buttons/mediaButtons/micToggleButton/MicToggleButton';
import { AudioToggleButton } from '../../components/buttons/mediaButtons/audioToggleButton/AudioToggleButton';
import { ShareScreenButton } from '../../components/buttons/mediaButtons/shareScreenButton/ShareScreenButton';
import { ConnectionIndicator } from '../../components/connectionIndicator/ConnectionIndicator';

// state
import { selectAudioState, selectMicrophoneState, selectScreenShareState, selectWebCamState, toggleControlState } from './ControlBarSlice';

// style's
import "./ControlBar.css";

export const ControlBar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // state
    const webCamState = useSelector(selectWebCamState);

    const microphoneState = useSelector(selectMicrophoneState);

    const audioState = useSelector(selectAudioState);

    const screenShareState = useSelector(selectScreenShareState);

    const toggleFunction = (state) => {
        dispatch(toggleControlState(state))
    }

    const toggleAppSettings = () => {
        const url = window.location.hash.split('#')[1]

        if (url.search('/appsettings') === -1) {
            navigate(url + "/appsettings/account")
        } else {
            navigate(url.split('/appsettings')[0])
        }
            
    }

    return (
        <div className='control-bar-container'>
            <SettingsButton action={toggleAppSettings} />
            <div className='controls-wrapper'>
                <WebCamButton 
                action={() => {toggleFunction('webCamState')}} 
                state={webCamState} />
                <MicToggleButton 
                action={() => {toggleFunction('microphoneState')}} 
                state={microphoneState} />
                <AudioToggleButton 
                action={() => {toggleFunction('audioState')}} 
                state={audioState} />
                <ShareScreenButton 
                action={() => {toggleFunction('screenShareState')}} 
                state={screenShareState} />
            </div>
            <ConnectionIndicator />
        </div>
    )
}
