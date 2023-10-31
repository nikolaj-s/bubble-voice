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

// state
import { resetControlState, selectAudioState, selectCurrentScreen, selectLoadingScreenShare, selectLoadingWebCam, selectMicrophoneState, selectScreenShareState, selectWebCamState, selectingScreensState, toggleControlState, toggleLoadingWebCam } from './ControlBarSlice';
import { selectCurrentChannel, selectCurrentChannelId } from '../server/ServerSlice';
import { playSoundEffect } from '../settings/soundEffects/soundEffectsSlice';
import { selectAccentColor, selectPrimaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style's
import "./ControlBar.css";
import { ScreenShareMenu } from './ScreenShareMenu/ScreenShareMenu';
import { AnimatePresence } from 'framer-motion';
import { Streampreview } from './StreamPreview/Streampreview';
import { ControlBarOptionsButton } from './ControlBarOptionsButton/ControlBarOptionsButton';
import { ExpandedControlBar } from './ExpandedControlBar/ExpandedControlBar';



export const ControlBar = () => {

    const dispatch = useDispatch();

    const [expandedOpen, toggleExpanded] = React.useState(false);
    // state
    const webCamState = useSelector(selectWebCamState);

    const microphoneState = useSelector(selectMicrophoneState);

    const audioState = useSelector(selectAudioState);

    const screenShareState = useSelector(selectScreenShareState);

    const currentScreen = useSelector(selectCurrentScreen);

    const current_channel_id = useSelector(selectCurrentChannelId);

    const channel = useSelector(selectCurrentChannel);

    const inChannel = useSelector(selectCurrentChannelId);

    const secondaryColor = useSelector(selectPrimaryColor);

    const loadingWebCam = useSelector(selectLoadingWebCam);

    const loadingScreenShare = useSelector(selectLoadingScreenShare);

    const selectingScreen = useSelector(selectingScreensState);

    const accentColor = useSelector(selectAccentColor);

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

    React.useEffect(() => {
        dispatch(resetControlState());
    // eslint-disable-next-line
    }, [current_channel_id])

    return (
        <>
            {expandedOpen ?
            <ExpandedControlBar close={() => {toggleExpanded(false)}} />
            : null}
            <div onContextMenu={() => {toggleExpanded(!expandedOpen)}} className='control-bar-container' 
            style={{backgroundColor: accentColor, boxShadow: selectingScreen ? '5px 5px 20px rgba(0, 0, 0, 1)' : null,}}
            >   
                <AnimatePresence>
                    {selectingScreen ? <ScreenShareMenu key={'screeen-share-menu'} selectingScreens={selectingScreen} /> : null}
                    {currentScreen ? <Streampreview key={'stream-preview-container'} /> : null}
                </AnimatePresence>
                <ControlBarOptionsButton action={() => {toggleExpanded(!expandedOpen)}} state={!expandedOpen} />
                <div style={{backgroundColor: accentColor}} className='controls-wrapper'>  
                    <MicToggleButton 
                    width={25}
                    height={20}
                    padding={8}
                    desc_space={23}
                    
                    action={() => {toggleFunction('microphoneState')}} 
                    state={microphoneState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={"toggle-microphone-button"}
                    />
                    <AudioToggleButton 
                    width={25}
                    height={20}
                    padding={8}
                    desc_space={23}
                    opacity={0.5}
                    altInvert={true}
                    action={() => {toggleFunction('audioState')}} 
                    state={audioState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={"mute-audio-toggle-button"}
                    description={(current_channel_id === null  || channel.disable_streams) ? null : `${audioState ? 'Deafen' : 'Un-Deafen'}`}
                    />
                    <WebCamButton 
                    width={25}
                    height={20}
                    padding={8}
                    action={() => {toggleFunction('webCamState')}} 
                    state={webCamState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={'web-cam-toggle-button'}
                    loading={loadingWebCam}
                    />
                    <ShareScreenButton 
                    width={25}
                    height={20}
                    padding={8}
                    desc_space={23}
                    loading={loadingScreenShare}
                    action={() => {toggleFunction('screenShareState')}} 
                    state={screenShareState} 
                    active={current_channel_id === null || channel.disable_streams}
                    id={"screen-share-toggle-button"}
                    sharing_screen={currentScreen}
                    />
                </div>
                
            </div>
            
        </>
    )
}
