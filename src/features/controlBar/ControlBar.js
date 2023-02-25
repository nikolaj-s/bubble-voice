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
import { ScreenShareMenu } from './ScreenShareMenu/ScreenShareMenu';

// state
import { resetControlState, selectAudioState, selectingScreensState, selectLoadingScreenShare, selectLoadingWebCam, selectMicrophoneState, selectScreenShareState, selectWebCamState, toggleControlState, toggleLoadingWebCam } from './ControlBarSlice';
import { selectCurrentChannel, selectCurrentChannelId } from '../server/ServerSlice';
import { playSoundEffect } from '../settings/soundEffects/soundEffectsSlice';
import { selectPrimaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

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

    const channel = useSelector(selectCurrentChannel);

    const selectingScreens = useSelector(selectingScreensState);

    const accentColor = useSelector(selectPrimaryColor);

    const loadingWebCam = useSelector(selectLoadingWebCam);

    const loadingScreenShare = useSelector(selectLoadingScreenShare);

    const toggleFunction = (state) => {

        if (channel.disable_streams) return;
        
        if (window.location.hash.includes("/appsettings/voice-video")) return;

        if (current_channel_id === null) return;

        if (state === 'webCamState' && loadingWebCam) return;

        if (state === 'webCamState' && webCamState === true) dispatch(toggleLoadingWebCam(true))

        if (state === 'screenShareState' && loadingScreenShare === true) return;

        dispatch(toggleControlState(state))

        if (eval(state) === true) {
            dispatch(playSoundEffect('controlSoundEffect'))
        } else {
            dispatch(playSoundEffect('deactivate'))
        }

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
            <ScreenShareMenu selectingScreens={selectingScreens} />
            <div className='control-bar-container' 
            style={{borderTop: `solid 2px ${accentColor}`}}
            >
                <div className='controls-wrapper'>
                    <SettingsButton 
                    width={20}
                    height={20}
                    padding={7}
                    desc_space={20}
                    action={toggleAppSettings} />
                    <WebCamButton 
                    width={20}
                    height={20}
                    padding={7}
                    action={() => {toggleFunction('webCamState')}} 
                    state={webCamState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={'web-cam-toggle-button'}
                    loading={loadingWebCam}
                    />
                    <MicToggleButton 
                    width={20}
                    height={20}
                    padding={7}
                    desc_space={20}
                    action={() => {toggleFunction('microphoneState')}} 
                    state={microphoneState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={"toggle-microphone-button"}
                    />
                    <AudioToggleButton 
                    width={20}
                    height={20}
                    padding={7}
                    desc_space={20}
                    action={() => {toggleFunction('audioState')}} 
                    state={audioState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={"mute-audio-toggle-button"}
                    description={(current_channel_id === null  || channel.disable_streams) ? null : `${audioState ? 'Deafen' : 'Un-Deafen'}`}
                    />
                    <ShareScreenButton 
                    width={20}
                    height={20}
                    padding={7}
                    desc_space={20}
                    loading={loadingScreenShare}
                    action={() => {toggleFunction('screenShareState')}} 
                    state={screenShareState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={"screen-share-toggle-button"}
                    />
                </div>
            </div>
        </>
    )
}
