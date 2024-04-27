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
import { resetControlState, selectAudioState, selectCurrentScreen, selectLoadingScreenShare, selectLoadingWebCam, selectMicrophoneState, selectScreenShareState, selectSeenStreamingMessage, selectWebCamState, selectingScreensState, toggleControlState, toggleLoadingWebCam, toggleStreamingMessage } from './ControlBarSlice';
import { selectCurrentChannel, selectCurrentChannelId } from '../server/ServerSlice';
import { playSoundEffect } from '../settings/soundEffects/soundEffectsSlice';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style's
import "./ControlBar.css";
import { ScreenShareMenu } from './ScreenShareMenu/ScreenShareMenu';
import { AnimatePresence } from 'framer-motion';
import { Streampreview } from './StreamPreview/Streampreview';
import { ControlBarOptionsButton } from './ControlBarOptionsButton/ControlBarOptionsButton';
import { ExpandedControlBar } from './ExpandedControlBar/ExpandedControlBar';
import { StreamingMessage } from './StreamingMessage/StreamingMessage';
import { AltOptionsButton } from '../../components/buttons/AltOptionsButton/AltOptionsButton';
import { ControlProfileButton } from './ControlProfileButton/ControlProfileButton';
import { MusicOverlayButton } from '../../components/buttons/MusicOverlayButton/MusicOverlayButton';
import { toggleOverlay } from '../server/ChannelRoom/Room/Music/MusicSlice';
import { selectUserImage } from '../settings/appSettings/accountSettings/accountSettingsSlice';



export const ControlBar = () => {

    const dispatch = useDispatch();

    const [expandedOpen, toggleExpanded] = React.useState(false);

    const [hasMediaWidget, toggleHasMediaWidget] = React.useState(false);

    let [streamingInterval, incrementStreamingInterval] = React.useState(0);

    // state
    const webCamState = useSelector(selectWebCamState);

    const microphoneState = useSelector(selectMicrophoneState);

    const audioState = useSelector(selectAudioState);

    const screenShareState = useSelector(selectScreenShareState);

    const currentScreen = useSelector(selectCurrentScreen);

    const current_channel_id = useSelector(selectCurrentChannelId);

    const primaryColor = useSelector(selectPrimaryColor);

    const channel = useSelector(selectCurrentChannel);

    const inChannel = useSelector(selectCurrentChannelId);

    const secondaryColor = useSelector(selectSecondaryColor);

    const loadingWebCam = useSelector(selectLoadingWebCam);

    const loadingScreenShare = useSelector(selectLoadingScreenShare);

    const selectingScreen = useSelector(selectingScreensState);

    const accentColor = useSelector(selectAccentColor);

    const seenStreamingMessageThisSession = useSelector(selectSeenStreamingMessage);

    const profilePicture = useSelector(selectUserImage);
    
    React.useEffect(() => {

        if (channel?.widgets) {

            const exists = channel.widgets.findIndex(w => w.type === 'music');

            if (exists !== -1) {
                toggleHasMediaWidget(true);
            } else {
                toggleHasMediaWidget(false);
            }
        }

        return () => {
            toggleHasMediaWidget(false);
        }

    }, [channel?.widgets])

    React.useEffect(() => {

        let interval;

        if (seenStreamingMessageThisSession) return;

        if (streamingInterval === 1200) dispatch(toggleStreamingMessage(true))

        if (currentScreen) {
            
            interval = setInterval(() => {

                incrementStreamingInterval(streamingInterval += 1);

            }, 1000)

        }

        return () => {
            clearInterval(interval);
        }

    }, [currentScreen, streamingInterval])

    const toggleFunction = (state) => {

        if (channel.disable_streams) return;
        
        if (window.location.hash.includes("/appsettings/voice-video")) return;

       // if (current_channel_id === null) return;

        if ((current_channel_id === null || channel.disable_streams || channel?.users?.length === 1) && state === 'webCamState') return;
        
        if ((current_channel_id === null || channel.disable_streams || channel?.users?.length === 1) && state === 'screenShareState') return;

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
            <StreamingMessage />
            {expandedOpen ?
            <ExpandedControlBar close={() => {toggleExpanded(false)}} />
            : null}
            {selectingScreen ? <ScreenShareMenu key={'screeen-share-menu'} selectingScreens={selectingScreen} /> : null}
            <div onContextMenu={() => {toggleExpanded(!expandedOpen)}} className='control-bar-container' 
            style={{backgroundColor: accentColor,}}
            >   
                <AnimatePresence> 
                    {currentScreen ? <Streampreview key={'stream-preview-container'} /> : null}
                </AnimatePresence>
                {current_channel_id === null || channel.disable_streams || channel?.users?.length === 1 ? null :
                <div className='room-video-controls-wrapper'>
                    <WebCamButton id={'web-cam-toggle-button'} action={() => {toggleFunction('webCamState')}} width={hasMediaWidget ? 60 : 100} state={webCamState} loading={loadingWebCam} />
                    <ShareScreenButton sharing_screen={currentScreen} id={'screen-share-toggle-button'} action={() => {toggleFunction('screenShareState')}} width={hasMediaWidget ? 60 : 100} state={screenShareState} loading={loadingScreenShare} />
                    {hasMediaWidget ?
                    <MusicOverlayButton action={() => {dispatch(toggleOverlay())}} description={"Open Media Widget"} invert={true} backgroundColor={secondaryColor} width={60} height={25} padding={'5px 3px'} />
                    : null}
                </div>
                }
                <div style={{backgroundColor: accentColor}} className='controls-wrapper'>  
                    <ControlProfileButton key={profilePicture} inChannel={current_channel_id} micState={microphoneState} />
                    <MicToggleButton 
                    width={18}
                    height={18}
                    padding={6}
                    desc_space={20}
                    desc_width={80}
                    action={() => {toggleFunction('microphoneState')}} 
                    state={microphoneState} 
                    active={channel.disable_streams}
                    id={"toggle-microphone-button"}
                    />
                    <AudioToggleButton 
                    width={18}
                    borderRadius={5}
                    height={18}
                    padding={6}
                    desc_space={20}
                    desc_width={80}
                    opacity={0.5}
                    altInvert={true}
                    action={() => {toggleFunction('audioState')}} 
                    state={audioState} 
                    active={channel.disable_streams}
                    id={"mute-audio-toggle-button"}
                    description={(channel.disable_streams) ? null : `${audioState ? 'Deafen' : 'Un-Deafen'}`}
                    />
                                        
                    <AltOptionsButton 
                    action={() => {toggleExpanded(!expandedOpen)}}
                    description={"Options"}
                    width={18}
                    borderRadius={5}
                    height={18}
                    padding={6}
                    desc_space={20}
                    desc_width={80}
                    margin={"0 3px 0 0"}
                    zIndex={3}
                    />
                </div>
                
            </div>
            
        </>
    )
}
