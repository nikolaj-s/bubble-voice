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
import { ScreenShareMenu } from './ScreenShareMenu/ScreenShareMenu';

// state
import { resetControlState, selectAudioState, selectingScreensState, selectLoadingWebCam, selectMicrophoneState, selectScreenShareState, selectWebCamState, toggleControlState, toggleLoadingWebCam } from './ControlBarSlice';
import { selectCurrentChannelId } from '../server/ServerSlice';
import { playSoundEffect } from '../settings/soundEffects/soundEffectsSlice';
import { selectAccentColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

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

    const current_channel_id = useSelector(selectCurrentChannelId);

    const selectingScreens = useSelector(selectingScreensState);

    const accentColor = useSelector(selectAccentColor);

    const loadingWebCam = useSelector(selectLoadingWebCam);

    const toggleFunction = (state) => {
        
        if (window.location.hash.includes("/appsettings/voice-video")) return;

        if (current_channel_id === null) return;

        if (state === 'webCamState' && loadingWebCam) return;

        if (state === 'webCamState' && webCamState === true) dispatch(toggleLoadingWebCam(true))
        
        dispatch(playSoundEffect('controlSoundEffect'))

        dispatch(toggleControlState(state))

        if (state === 'audioState' && microphoneState) {

            dispatch(toggleControlState('microphoneState'))
        
        } else if (state === 'audioState' && (microphoneState === false && audioState === false)) {
            dispatch(toggleControlState('microphoneState'))
        }

        if (state === 'microphoneState' && audioState === false) {
            
            dispatch(toggleControlState('audioState'))
        
        }

    }

    const toggleAppSettings = () => {
        const url = window.location.hash.split('#')[1]

        if (url.search('/appsettings') === -1) {
            if (url.includes('server-settings')) {
                navigate(url.split('/server-settings')[0] + '/appsettings/account')
            } else {
                navigate(url + "/appsettings/account")
            }
            
        } else {
            navigate(url.split('/appsettings')[0])
        }
            
    }

    React.useEffect(() => {
        dispatch(resetControlState());
    // eslint-disable-next-line
    }, [current_channel_id])

    return (
        <>
            {selectingScreens ? <ScreenShareMenu /> : null}
            <div className='control-bar-container' 
            style={{borderTop: `solid 2px ${accentColor}`}}
            >
                <SettingsButton action={toggleAppSettings} />
                <div className='controls-wrapper'>
                    <WebCamButton 
                    action={() => {toggleFunction('webCamState')}} 
                    state={webCamState} 
                    active={current_channel_id === null}
                    id={'web-cam-toggle-button'}
                    loading={loadingWebCam}
                    />
                    <MicToggleButton 
                    action={() => {toggleFunction('microphoneState')}} 
                    state={microphoneState} 
                    active={current_channel_id === null}
                    id={"toggle-microphone-button"}
                    />
                    <AudioToggleButton 
                    action={() => {toggleFunction('audioState')}} 
                    state={audioState} 
                    active={current_channel_id === null}
                    id={"mute-audio-toggle-button"}
                    />
                    <ShareScreenButton 
                    action={() => {toggleFunction('screenShareState')}} 
                    state={screenShareState} 
                    active={current_channel_id === null}
                    />
                </div>
                <ConnectionIndicator active={current_channel_id !== null} />
            </div>
        </>
    )
}
