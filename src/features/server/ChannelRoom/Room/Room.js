/// library's
import React from 'react'
import { useRoutes } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';

// state
import { selectCurrentChannel, selectCurrentChannelId, selectPushToTalkActive, selectServerId, toggleLoadingChannel, updateMemberStatus, throwServerError, selectReconnectingState, checkConnection, clearServerPing } from '../../ServerSlice';
import { selectAudioInput, selectVoiceActivityState, selectPushToTalkState, selectMirroredWebCamState, selectEchoCancellatio, selectNoiseSuppression, selectMicInputVolume, selectVoiceActivationSensitivity, selectAutoGainControl, selectAdvancedVoiceActivation } from '../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice'
import { selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { selectAudioState, selectCurrentScreen, selectMicrophoneState, selectScreenShareState, selectWebCamState, setCurrentScreen, setScreens, setSelectingScreensState, toggleControlState } from '../../../controlBar/ControlBarSlice';
import { updateMusicState } from './Music/MusicSlice';

// style
import "./Room.css";

// socket
import { socket } from '../../ServerBar/ServerBar';

// client

import { Social } from './Social/Social';
import { Widgets } from './Widgets/Widgets';
import { RoomUserWrapper } from './RoomUserWrapper/RoomUserWrapper';
import { ChannelBackground } from './ChannelBackground/ChannelBackground';
import { selectMiscSettingsHideChannelBackground } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { audioCtx } from '../../../AudioInit/AudioInit';
import { selectCurrentServerPageState } from '../ServerNavigation/ServerNavigationSlice';
import { AnimatePresence, motion} from 'framer-motion';
import { ScreenShot } from './ScreenShot/ScreenShot';
import { MediaControls } from './Music/MediaControls';

import { CLEAR_CLIENT, client, handleAudioState, handleMicrophoneProducer, handleScreenProducer, handleStreamsDisabled, handleVoiceActive, handleWebCamProducer, joinChannel, leftChannel, selectJoiningChannelState, selectLoadingMicrophoneProducer, selectLoadingScreenProducer, selectLoadingWebCamProducer } from './RoomSlice';
import { analyserFrequencyAverage } from '../../../../util/AudioFunctions';
import { current } from '@reduxjs/toolkit';

const Component = () => {
    
    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const [media, setMedia] = React.useState(false);

    const page = useSelector(selectCurrentServerPageState);
    // state 
    const channel = useSelector(selectCurrentChannel);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const current_channel_id = useSelector(selectCurrentChannelId);

    const server_id = useSelector(selectServerId);

    const webcamState = useSelector(selectWebCamState);

    const microphoneState = useSelector(selectMicrophoneState);

    const audioState = useSelector(selectAudioState);

    const screenShareState = useSelector(selectScreenShareState);

    const audioDevice = useSelector(selectAudioInput);

    const username = useSelector(selectUsername);

    const currentScreen = useSelector(selectCurrentScreen);

    const pushToTalkActive = useSelector(selectPushToTalkActive);

    const webCamMirroredState = useSelector(selectMirroredWebCamState);

    const microphoneInputVolume = useSelector(selectMicInputVolume);

    const hideChannelBackgrounds = useSelector(selectMiscSettingsHideChannelBackground);

    // audio pref state
    const echoCancellation = useSelector(selectEchoCancellatio);

    const autoGainControl = useSelector(selectAutoGainControl);

    const noiseSuppression = useSelector(selectNoiseSuppression);

    const voiceActivationSensitivity = useSelector(selectVoiceActivationSensitivity);

    const reconnecting = useSelector(selectReconnectingState);

    const secondaryColor = useSelector(selectSecondaryColor);

    const advancedVoiceActivationDetection = useSelector(selectAdvancedVoiceActivation);

    const primaryColor = useSelector(selectPrimaryColor)
    
    const loaded = useSelector(selectJoiningChannelState);

    const loadingMicrophoneProducer = useSelector(selectLoadingMicrophoneProducer);

    const loadingWebCamProducer = useSelector(selectLoadingWebCamProducer);

    const loadingScreenProducer = useSelector(selectLoadingScreenProducer);

    // fall back code
    React.useEffect(() => {

        if (channel?.error || !channel) {

            const channel_location_id = window.location.hash.split('channel/')[1];
            
            const el = document.getElementById(`channel-button-${channel_location_id}`);

            if (el) {
                el?.click();
            } else {
                window.location.hash = "/dashboard/server/" + server_id;
            }

        } else if (channel?.users) {
            const exists = channel?.users.findIndex(u => u.username === username);

            if (exists === -1) {

                const disc = document.getElementById('disconnect-from-channel-button');

                if (disc) {
                    disc?.click();
                }

                window.location.hash = "/dashboard/server/" + server_id;

            }

        }

        if (channel) {
            const media = channel?.widgets?.filter(w => w.type === 'music');

            setMedia(media);
        }
        

    }, [channel])

    React.useEffect(() => {
        
        if (client) {

            client.updateAudioPrefs(noiseSuppression, echoCancellation, microphoneInputVolume)
        
        }

    }, [noiseSuppression, echoCancellation, microphoneInputVolume, autoGainControl])

    React.useEffect(() => {
        let el = document.getElementById(`${username}-web-cam`)
        
        if (!webcamState && el) {
            
            if (webCamMirroredState && el) {
               el.style.transform = 'scaleX(-1)'
            } else if (el) {
                el.style.transform = 'scaleX(1)'
            }
        
        }
        
    // eslint-disable-next-line
    }, [webCamMirroredState, webcamState])

    // voice activity state
    const voiceActivityDetection = useSelector(selectVoiceActivityState);

    const pushToTalk = useSelector(selectPushToTalkState);

    const handleScreenShare = async () => {
        try {

            if (currentScreen !== null) return;

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.invoke("GET_SOURCES").then((result) => {

                dispatch(setScreens(result));

                dispatch(setSelectingScreensState(true));

                return true
            })
            
            
        } catch (error) {
            
            client?.produce('screenType', currentScreen);
            dispatch(updateMemberStatus({username: username, action: {screenshare: true}}))
            socket?.emit('user status', {username: username, action: {screenshare: true}})
        }

    }

    const updatePing = () => {
        console.log('checking ping');

        dispatch(checkConnection());
    }

    // handle initial channel join, and init of roomClient
    React.useEffect(() => {

        dispatch(joinChannel());

        let interval;

        interval = setInterval(() => {
            updatePing();
        }, 300000)

        return () => {
            clearInterval(interval);
            dispatch(toggleLoadingChannel(true));
            dispatch(setScreens([]));
            dispatch(setSelectingScreensState(false));
            dispatch(setCurrentScreen(null));
            dispatch(clearServerPing());
            dispatch(updateMusicState({playing: false, queue: []}));
            dispatch(leftChannel());
            CLEAR_CLIENT();
            if (socket) {
                console.log('channel left/ channel change')
            }
        }
    // eslint-disable-next-line
    }, [current_channel_id])
    
    // handle state change for screen sharing
    React.useEffect(() => {
        
        try {

            if (!currentScreen) return;

            if (channel?.users?.length === 1) return;

            if (loadingScreenProducer) return;
            
            dispatch(handleScreenProducer({currentScreen: currentScreen}));
            
        } catch (error) {
            
            dispatch(throwServerError({errorMessage: error.message}))
        }
    // eslint-disable-next-line
    }, [currentScreen])

    // handle change of user control state
    React.useEffect(() => {
        if (loaded === true && client) {

            if (channel?.users?.length === 1) {
                dispatch(handleScreenProducer({currentScreen: null}));

                console.log(screenShareState);

                return;
            };

            if (channel.disable_streams) return;

            if (screenShareState === false && currentScreen === null) {
                handleScreenShare();
            } else if (screenShareState === true) {
                dispatch(handleScreenProducer({currentScreen: null}));
            }

        }
    // eslint-disable-next-line
    }, [loaded, screenShareState, channel.disable_streams, currentScreen])

    React.useEffect(() => {

        if (loaded && channel.disable_streams) {
            dispatch(handleStreamsDisabled());
        }

    }, [loaded, channel.disable_streams])

    // handle webcam state
    React.useEffect(() => {

        if (channel.disable_streams) return;

        if (loadingWebCamProducer) return;

        if (loaded) {
            dispatch(handleWebCamProducer({data: webcamState}));
        }

    }, [loaded, webcamState])


    // handle audio mute and unmute
    React.useEffect(() => {

        if (channel.disable_streams) return;

        if (loadingMicrophoneProducer) return;

        if (loaded) {
            dispatch(handleAudioState({state: audioState}));
        }

    }, [audioState, loaded])

    // handle mic mute and unmute
    React.useEffect(() => {

        if (channel.disable_streams) return;

        if (loadingMicrophoneProducer) return;

        if (loaded) {
            dispatch(handleMicrophoneProducer({state: microphoneState}));
        }

    }, [microphoneState, loaded]);

    // handle voice activity

    const handleRestartInactivityTimer = () => {
        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("RESET_INAC_TIMEOUT");

        } catch (error) {
            return;
        }
    }

    React.useEffect(() => {

        let analyser,
            source,
            scriptProcessor

        // defaults
        let defaults = {
            fftSize: 1024,
            bufferLen: 1024,
            smoothingTimeConstant: 0.2,
            minCaptureFreq: 85,
            maxCaptureFreq: 255,
            noiseCaptureDuration: 1000,
            minNoiseLevel: 0.3,
            maxNoiseLevel: 0.7,
            avgNoiseMultiplier: 1.2
        }

        // audio values
        let baseLevel = 0;
        // eslint-disable-next-line
        let voiceScale = 1;
        let activityCounter = 0;
        let activityCounterMin = 0;
        let activityCounterMax = 60;
        let activityCounterThresh = 5;

        let envFreqRange = [];
        let isNoiseCapturing = true;
        let prevVadState = undefined;
        let vadState = false;
        let captureTimeout = null;

        try {
            if (channel.disable_streams) return; 
            
            if (client && loaded === true) {
                if (voiceActivityDetection === true && microphoneState === true) {
                    navigator.mediaDevices.getUserMedia({
                        audio: {
                            deviceId: audioDevice._id,
                            echoCancellation: echoCancellation,
                            noiseSuppression: noiseSuppression,
                            autoGainControl: autoGainControl
                        },
                        video: false
                    }).then((audio) => {

                        if (advancedVoiceActivationDetection) { 
                            analyser = audioCtx.createAnalyser();

                            source = audioCtx.createMediaStreamSource(audio);

                            scriptProcessor = audioCtx.createScriptProcessor(defaults.bufferLen, 1, 1)

                            analyser.smoothingTimeConstant = defaults.smoothingTimeConstant;

                            analyser.fftSize = defaults.fftSize;

                            source.connect(analyser);

                            analyser.connect(scriptProcessor);

                            scriptProcessor.connect(audioCtx.destination);

                            const onVoiceStart = () => {
                             
                                dispatch(handleVoiceActive({active: true}));

                                handleRestartInactivityTimer();
                            }

                            const onVoiceStop = () => {

                               dispatch(handleVoiceActive({active: false}));
                            }

                            const init = () => {

                                isNoiseCapturing = false;

                                envFreqRange = envFreqRange.filter(val => {return val}).sort();

                                let averageEnvFreq = envFreqRange.length ? envFreqRange.reduce((p, c) => {return Math.min(p, c)}, 1) : (defaults.minNoiseLevel || 0.1);

                                baseLevel = averageEnvFreq * defaults.avgNoiseMultiplier;

                                if (defaults.minNoiseLevel && baseLevel < defaults.minNoiseLevel) baseLevel = defaults.minNoiseLevel;

                                if (defaults.maxNoiseLevel && baseLevel > defaults.maxNoiseLevel) baseLevel = defaults.maxNoiseLevel;

                                voiceScale = 1 - baseLevel;

                            }

                            const monitor = () => {
                                let frequencies = new Uint8Array(analyser.frequencyBinCount);

                                analyser.getByteFrequencyData(frequencies);

                                let average = analyserFrequencyAverage(255, analyser, frequencies, defaults.minCaptureFreq, defaults.maxCaptureFreq);
                                
                                if (isNoiseCapturing) {
                                    envFreqRange.push(average);
                                    return;
                                }

                                if (average >= baseLevel && activityCounter < activityCounterMax) {
                                    activityCounter++;
                                } else if (average < baseLevel && activityCounter > activityCounterMin) {
                                    activityCounter--;
                                }

                                vadState = activityCounter > activityCounterThresh;

                                if (prevVadState !== vadState) {
                                    vadState ? onVoiceStart() : onVoiceStop();
                                    prevVadState = vadState;
                                }
                            }

                            scriptProcessor.onaudioprocess = monitor;

                            if (isNoiseCapturing) {
                                captureTimeout = setTimeout(init, defaults.noiseCaptureDuration);
                            }

                        } else {
                            let playing = false;

                            analyser = audioCtx.createAnalyser();

                            source = audioCtx.createMediaStreamSource(audio);

                            scriptProcessor = audioCtx.createScriptProcessor(1024, 1, 1)

                            analyser.smoothingTimeConstant = 0.2;

                            analyser.fftSize = 1024;

                            source.connect(analyser);

                            analyser.connect(scriptProcessor);

                            scriptProcessor.connect(audioCtx.destination);

                            let timeout;

                            scriptProcessor.onaudioprocess = function() {
                                try {
                                    const array = new Uint8Array(analyser.frequencyBinCount);

                                    analyser.getByteFrequencyData(array);

                                    const arrSum = array.reduce((a, value) => a + value, 0);

                                    const avg = (arrSum / array.length) * 5;

                                    if (avg >= voiceActivationSensitivity) {
                                        
                                        if (playing || microphoneState === false) return;

                                        clearTimeout(timeout);

                                        playing = true;

                                        dispatch(handleVoiceActive({active: true}))

                                        handleRestartInactivityTimer();
                                        
                                    } else if (avg < voiceActivationSensitivity) {

                                        if (playing === false) return;

                                        playing = false;

                                        clearTimeout(timeout);

                                        timeout = null;

                                        timeout = setTimeout(() => {

                                            dispatch(handleVoiceActive({active: false}));
                                            
                                        }, 500)
                                       
                                    }

                                } catch (error) {
                                    console.log(error)
                                    scriptProcessor.onaudioprocess = null;
                                }
                            }
                        
                        }
                        
                        
                    })
                } else if (pushToTalk === true && microphoneState === true) {
                    
                    dispatch(handleVoiceActive({active: pushToTalkActive}));

                }  else {
                    if (scriptProcessor) {
                        scriptProcessor.onaudioprocess = null;
                    }
                    scriptProcessor?.disconnect();
                    analyser?.disconnect();
                    source?.disconnect();
                }
                    
            }
        } catch (error) {
            scriptProcessor?.disconnect(audioCtx?.destination)
            scriptProcessor?.disconnect();
            analyser?.disconnect();
            source?.disconnect();
            console.log(error)

            dispatch(throwServerError({errorMessage: "Error processing microphone input"}))
        }

        if (microphoneState === false || loaded === false) {
            captureTimeout && clearTimeout(captureTimeout)
            if (scriptProcessor) {
                scriptProcessor.onaudioprocess = null;
            }
            scriptProcessor?.disconnect();
            analyser?.disconnect();
            source?.disconnect();
            client?.closeProducer('audioType');
            
        }
        
        return () => {
            captureTimeout && clearTimeout(captureTimeout);

            if (scriptProcessor) {
                scriptProcessor.onaudioprocess = null;
            }

            analyser?.disconnect();
            scriptProcessor?.disconnect();
            source?.disconnect();
            
        }
       
    // eslint-disable-next-line   
    }, [pushToTalk, voiceActivityDetection, loaded, current_channel_id, microphoneState, pushToTalkActive, reconnecting, advancedVoiceActivationDetection])

    React.useEffect(() => {

        if (channel?.users?.length === 1) {

            if (webcamState === false) {
                dispatch(toggleControlState('webCamState'))
            }

            if (screenShareState === false) {
                dispatch(toggleControlState('screenShareState'));
            }
            
        }
        
    }, [channel.users, screenShareState, webcamState])

    return (
        <>
        <motion.div  className='room-wrapper-outer'
        initial={{opacity: 0}} animate={{opacity: 1}} 
        exit={{opacity: 0}}
        >
            <div
            style={
                ((hideChannelBackgrounds || channel.channel_background === undefined) || page === 'social' || page === 'media' || page === 'pins') ? {backgroundColor: 'black'} : null
                
            }
            onMouseEnter={() => {toggleHover(true)}}
            
            onMouseLeave={() => {toggleHover(false)}}
            id='live-chat-wrapper'>
                <RoomUserWrapper page={page} users={channel.users} loaded={loaded} />
                <AnimatePresence>       
                    {page === "social" ? 
                    <motion.div 
                    transition={{duration: 0.05}}
                    style={{height: '100%', width: '100%', top: '0px', left: '0px', position: 'absolute', zIndex: 2}} key={'social-page-wrapper'} initial={{translateX: '100%'}} animate={{translateX: '0%'}} exit={{translateX: '-100%'}} >
                        <Social currentChannel={channel} channelId={current_channel_id} /> 
                    </motion.div>
                    : null}
                    {page === "widgets" ? 
                    <motion.div 
                    transition={{duration: 0.05}}
                    key={'room-widgets-preview'} style={{height: '100%', width: '100%', top: '0px', left: '0px', position: 'absolute', zIndex: 4, backgroundColor: primaryColor}} initial={{opacity: 0}} animate={{opacity: 1}} 
                    exit={{opacity: 0}}>
                        <Widgets key={'widgets'} /> 
                    </motion.div>
                    : null}
                    {page === ''}
                    {page === 'voice' && media?.length > 0 ? <MediaControls key={'media-controls'} hover={hover} /> : null}
                </AnimatePresence>
            </div>
            <ChannelBackground 
            glass={glass}
            glassColor={glassColor}
            secondaryColor={secondaryColor}
            contain={channel.contain_background}
            channel_background={hideChannelBackgrounds ? null : channel.channel_background} blur={channel.background_blur} />
            <audio hidden={true} id={'microphone-input-source'} />
            
        </motion.div>

        <ScreenShot channelId={current_channel_id} username={username} />
        </>
    )
}


export const Room = () => useRoutes([
    { path: "/channel/:id/*", element: <Component />}
])