/// library's
import React from 'react'
import { useRoutes } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import * as mediasoupClient from 'mediasoup-client';

// state
import { selectCurrentChannel, selectCurrentChannelId, selectPushToTalkActive, selectServerId, toggleLoadingChannel, updateMemberStatus, selectServerMembers, throwServerError, updateJoiningChannelState, selectReconnectingState, toggleReconnectingState, checkConnection, clearServerPing } from '../../ServerSlice';
import { selectAudioInput, selectVideoInput, selectVoiceActivityState, selectPushToTalkState, selectMirroredWebCamState, selectEchoCancellatio, selectNoiseSuppression, selectMicInputVolume, selectVoiceActivationSensitivity, selectAutoGainControl, selectAdvancedVoiceActivation, selectExperimentalAudioCapture } from '../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice'
import { selectDisplayName, selectProfileColor, selectProfilePictureShape, selectUserBanner, selectUserBannerGifFrame, selectUserImage, selectUserImageGifFrame, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { playSoundEffect, selectMuteSoundEffectsWhileMutedState } from '../../../settings/soundEffects/soundEffectsSlice';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectAudioState, selectCurrentScreen, selectCurrentScreenName, selectMicrophoneState, selectScreenShareState, selectWebCamState, setCurrentScreen, setScreens, setSelectingScreensState, toggleConnectionError, toggleConnectionLoading, toggleControlState, toggleLoadingScreenShare, toggleLoadingWebCam, toggleVoiceActive } from '../../../controlBar/ControlBarSlice';
import { updateMusicState } from './Music/MusicSlice';

// style
import "./Room.css";

// socket
import { socket } from '../../ServerBar/ServerBar';

// client
import { RoomClient } from './RoomClient';
import { Social } from './Social/Social';
import { Widgets } from './Widgets/Widgets';
import { RoomUserWrapper } from './RoomUserWrapper/RoomUserWrapper';
import { ChannelBackground } from './ChannelBackground/ChannelBackground';
import { selectMiscSettingsHideChannelBackground } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectDisableTransitionAnimations, selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { audioCtx } from '../../../AudioInit/AudioInit';
import { selectCurrentServerPageState } from '../ServerNavigation/ServerNavigationSlice';
import { AnimatePresence, motion} from 'framer-motion';
import { ScreenShot } from './ScreenShot/ScreenShot';
import { MediaControls } from './Music/MediaControls';

export let client;

const Component = () => {
    
    const dispatch = useDispatch();

    const [loaded, setLoaded] = React.useState(false);

    const [hover, toggleHover] = React.useState(false);

    const page = useSelector(selectCurrentServerPageState);
    // state 
    const channel = useSelector(selectCurrentChannel);

    const currentScreenName = useSelector(selectCurrentScreenName);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const current_channel_id = useSelector(selectCurrentChannelId);

    const server_id = useSelector(selectServerId);

    const webcamState = useSelector(selectWebCamState);

    const microphoneState = useSelector(selectMicrophoneState);

    const audioState = useSelector(selectAudioState);

    const screenShareState = useSelector(selectScreenShareState);

    const videoDevice = useSelector(selectVideoInput);

    const audioDevice = useSelector(selectAudioInput);

    const username = useSelector(selectUsername);

    const displayName = useSelector(selectDisplayName);

    const userBanner = useSelector(selectUserBanner);

    const userImage = useSelector(selectUserImage);

    const currentScreen = useSelector(selectCurrentScreen);

    const pushToTalkActive = useSelector(selectPushToTalkActive);

    const webCamMirroredState = useSelector(selectMirroredWebCamState);

    const soundEffectsMuted = useSelector(selectMuteSoundEffectsWhileMutedState);

    const microphoneInputVolume = useSelector(selectMicInputVolume);

    const hideChannelBackgrounds = useSelector(selectMiscSettingsHideChannelBackground);

    const disableTransition = useSelector(selectDisableTransitionAnimations);

    // audio pref state
    const echoCancellation = useSelector(selectEchoCancellatio);

    const autoGainControl = useSelector(selectAutoGainControl);

    const noiseSuppression = useSelector(selectNoiseSuppression);

    const voiceActivationSensitivity = useSelector(selectVoiceActivationSensitivity);

    const reconnecting = useSelector(selectReconnectingState);

    const secondaryColor = useSelector(selectSecondaryColor);

    const experimentalAudioCapture = useSelector(selectExperimentalAudioCapture);

    const advancedVoiceActivationDetection = useSelector(selectAdvancedVoiceActivation);

    const profileImageShape = useSelector(selectProfilePictureShape);

    const profileColor = useSelector(selectProfileColor);

    const primaryColor = useSelector(selectPrimaryColor)
    
    const media = channel?.widgets?.filter(w => w.type === 'music');

    const userImageGifFrame = useSelector(selectUserImageGifFrame);

    const userBannerGifFrame = useSelector(selectUserBannerGifFrame);

    // fall back code
    React.useEffect(() => {
        if (channel?.error || !channel) {
           const channel_location_id = window.location.hash.split('channel/')[1];
            console.log(channel_location_id)
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
    }, [channel])

    React.useEffect(() => {
        
        if (client) {

            client.updateAudioPrefs(noiseSuppression, echoCancellation, microphoneInputVolume)
        
        }

    }, [noiseSuppression, echoCancellation, microphoneInputVolume, autoGainControl])

    React.useEffect(() => {
        let el = document.getElementById(user._id)
        
        if (!webcamState && el) {

            let vid = el.querySelector('video')
            
            if (webCamMirroredState && vid) {
               vid.style.transform = 'scaleX(-1)'
            } else if (vid) {
                vid.style.transform = 'scaleX(1)'
            }
        
        }
        
    // eslint-disable-next-line
    }, [webCamMirroredState, webcamState])

    // voice activity state
    const voiceActivityDetection = useSelector(selectVoiceActivityState);

    const pushToTalk = useSelector(selectPushToTalkState);

    const members = useSelector(selectServerMembers);

    const member = members.find(member => member.username === username);
    
    const user = {
        ...member
    }

    const event = (arg) => {
        
        if (arg.action === 'playSoundEffect') return dispatch(playSoundEffect(arg.value));

        if (arg.action === 'error') return dispatch(throwServerError({errorMessage: arg.value}));
        
        if (arg.action === 'webcam-loading-state') return dispatch(toggleLoadingWebCam(false));
        
        if (arg.action === 'screen-share-loading-state') return dispatch(toggleLoadingScreenShare(arg.value));
       
        if (arg.action === 'close-stream') return dispatch(toggleControlState('screenShareState'));

        if (arg.action === 'reconnecting') {
            setLoaded(arg.value);

            if (arg.value === true) {
                dispatch(toggleReconnectingState());
            }
            
        };

        if (arg.action === 'connection') return dispatch(toggleConnectionLoading(arg.value));

        if (arg.action === 'connectionError') return dispatch(toggleConnectionError(arg.value));
    }

    const init = async () => {

        client = new RoomClient(socket, current_channel_id, server_id, mediasoupClient, audioDevice, videoDevice, microphoneState, webcamState, user, event, audioState, webCamMirroredState, echoCancellation, noiseSuppression, microphoneInputVolume)

        await client.join();

        return true
        
            
    }

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
            dispatch(updateMemberStatus({username: user.username, action: {screenshare: true}}))
            socket?.emit('user status', {username: user.username, action: {screenshare: true}})
        }

    }

    const updatePing = () => {
        console.log('checking ping')

        dispatch(checkConnection());
    }

    // handle initial channel join, and init of roomClient
    React.useEffect(() => {

        dispatch(updateJoiningChannelState(true));

        let interval;

        setTimeout(() => {

            init().then( async () => {
                setLoaded(true);

                await socket.request('fetch current music info')
                .then(data => {
                    console.log(data)
                    if (data.music_info) {
                        dispatch(updateMusicState({playing: data.music_info.playing, queue: data.music_info.queue}))
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                })

                setTimeout(() => {

                    dispatch(updateJoiningChannelState(false));

                    dispatch(checkConnection());
                
                }, 500)
                    
                interval = setInterval(updatePing, 120000);
            })
        
            dispatch(setHeaderTitle(channel.channel_name));
        
        }, 100) 

        return () => {
            dispatch(setHeaderTitle('Select Channel'))
            dispatch(toggleLoadingChannel(true))
            dispatch(setScreens([]))
            dispatch(setSelectingScreensState(false));
            dispatch(setCurrentScreen(null));
            setLoaded(false);
            dispatch(clearServerPing());
            dispatch(updateMusicState({playing: false, queue: []}))
            client?.exit();
            if (socket) {
                console.log('channel left/ channel change')
            }
            clearInterval(interval);
        }
    // eslint-disable-next-line
    }, [current_channel_id])
    
    // handle state change for screen sharing
    React.useEffect(() => {
        console.log(experimentalAudioCapture)
        try {
            if (channel?.users?.length === 1) return;
            console.log('this should not be called')
            if (currentScreen !== null) {
                
                dispatch(setScreens([]));
                dispatch(setSelectingScreensState(false));

                setTimeout(() => {
                    const ipcRenderer = window.require('electron').ipcRenderer;

                    ipcRenderer.send("set-window-id", {id: currentScreen});

                    client?.produce('screenType', currentScreen, currentScreenName, experimentalAudioCapture, profileColor);
                    dispatch(updateMemberStatus({username: user.username, action: {screenshare: true}}))
                    socket?.emit('user status', {username: user.username, action: {screenshare: true}})
                
                    dispatch(playSoundEffect('controlSoundEffect'))
                }, 200)
                    
            
            }
        } catch (error) {
            console.log(error);
            dispatch(throwServerError({errorMessage: error.message}))
        }
    // eslint-disable-next-line
    }, [currentScreen, reconnecting, currentScreenName, experimentalAudioCapture])

    // handle change of user control state
    React.useEffect(() => {
        if (client && loaded === true) {

            if (channel.disable_streams) {

                client.closeProducer('audioType');
                dispatch(updateMemberStatus({username: user.username, action: {microphone: false}}))
                socket.emit('user status', {username: user.username, action: {microphone: false}})
                dispatch(updateMemberStatus({username: user.username, action: {active: false}}))    
                socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}})
                const audio_sources_to_mute = document.querySelectorAll('video, audio');

                for (const el of audio_sources_to_mute) {

                    if (soundEffectsMuted === false) {

                        if (el.id !== 'sound-effects-source') {
                            el.muted = true;
                        } 

                        continue;
                    } else {
                        el.muted = true;
                    }

                }

                dispatch(updateMemberStatus({username: user.username, action: {muted: true}}))
                
                client.toggleAudioState(true)
                
                socket.emit('user status', {username: user.username, action: {muted: true}})

                return;
            
            }

            // handle microphone state changes
            if (microphoneState) {
                client.produce('audioType', audioDevice._id);
                dispatch(updateMemberStatus({username: user.username, action: {microphone: true}}))
                socket.emit('user status', {username: user.username, action: {microphone: true}})
            } else if (microphoneState === false) {
                client.closeProducer('audioType');
                dispatch(updateMemberStatus({username: user.username, action: {microphone: false}}))
                socket.emit('user status', {username: user.username, action: {microphone: false}})
                dispatch(updateMemberStatus({username: user.username, action: {active: false}}))    
                socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}})
            }

            if (webcamState === false) {
                client.produce('videoType', videoDevice._id);
                dispatch(updateMemberStatus({username: user.username, action: {webcam: true}}))
                socket.emit('user status', {username: user.username, action: {webcam: true}})
            } else if (webcamState === true) {
                client.closeProducer('videoType');
                dispatch(updateMemberStatus({username: user.username, action: {webcam: false}}))
                socket.emit('user status', {username: user.username, action: {webcam: false}})
            }

            if (screenShareState === false && currentScreen === null) {
                handleScreenShare();
            } else if (screenShareState === true) {
                client.closeProducer('screenType')
                dispatch(setScreens([]))
                dispatch(setSelectingScreensState(false));
                dispatch(setCurrentScreen(null));
                dispatch(updateMemberStatus({username: user.username, action: {screenshare: false}}))
                socket.emit('user status', {username: user.username, action: {screenshare: false}})
            }

            if (audioState) {
                document.querySelectorAll('video, audio').forEach(el => el.muted = false)
                dispatch(updateMemberStatus({username: user.username, action: {muted: false}}))
                client.toggleAudioState(false)
                socket.emit('user status', {username: user.username, action: {muted: false}})
            } else if (audioState === false) {
                const audio_sources_to_mute = document.querySelectorAll('video, audio');

                for (const el of audio_sources_to_mute) {

                    if (soundEffectsMuted === false) {

                        if (el.id !== 'sound-effects-source') {
                            el.muted = true;
                        } 

                        continue;
                    } else {
                        el.muted = true;
                    }

                }

                dispatch(updateMemberStatus({username: user.username, action: {muted: true}}))
                
                client.toggleAudioState(true)
                
                socket.emit('user status', {username: user.username, action: {muted: true}})
            }

        }
    // eslint-disable-next-line
    }, [microphoneState, webcamState, loaded, screenShareState, audioState, soundEffectsMuted, reconnecting, channel.disable_streams, currentScreen])

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

                                client.resumeProducer('audioType');

                                dispatch(updateMemberStatus({username: user.username, action: {active: true}}))
                                
                                socket.emit('user status', {username: user.username, action: {active: true, channel_specific: true}})
                                
                                dispatch(toggleVoiceActive(true));

                                handleRestartInactivityTimer();
                            }

                            const onVoiceStop = () => {

                                client.pauseProducer('audioType')

                                dispatch(toggleVoiceActive(false));

                                dispatch(updateMemberStatus({username: user.username, action: {active: false}}))
                                
                                socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}})  
                                
                            }

                            const frequencyToIndex = (frequency, sampleRate, frequencyBinCount) => {

                                let nyquist = sampleRate / 2;
                                
                                let index = Math.round(frequency / nyquist * frequencyBinCount);

                                return Math.min(Math.max(index, 0), frequencyBinCount);
                            
                            }

                            const analyserFrequencyAverage = (div, analyser, frequencies, minHz, maxHz) => {
                                
                                let sampleRate = analyser.context.sampleRate;

                                let binCount = analyser.frequencyBinCount;

                                let start = frequencyToIndex(minHz, sampleRate, binCount);

                                let end = frequencyToIndex(maxHz, sampleRate, binCount);

                                let count = end - start;

                                let sum = 0;

                                for (; start < end; start ++) {
                                    sum += frequencies[start] / div;
                                }
                                
                                return count === 0 ? 0 : (sum / count);
                            
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

                                        client.resumeProducer('audioType');

                                        dispatch(updateMemberStatus({username: user.username, action: {active: true}}))
                                    
                                        socket.emit('user status', {username: user.username, action: {active: true, channel_specific: true}})
                                        
                                        dispatch(toggleVoiceActive(true));

                                        handleRestartInactivityTimer();
                                        
                                    } else if (avg < voiceActivationSensitivity) {

                                        if (playing === false) return;

                                        playing = false;

                                        clearTimeout(timeout);

                                        timeout = null;

                                        dispatch(toggleVoiceActive(false));

                                        timeout = setTimeout(() => {

                                            client.pauseProducer('audioType');

                                            dispatch(updateMemberStatus({username: user.username, action: {active: false}}))
                                                
                                            socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}})
                                        
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
                    
                    if (pushToTalkActive) {

                        dispatch(toggleVoiceActive(true));

                        client.resumeProducer('audioType');

                        dispatch(updateMemberStatus({username: user.username, action: {active: true}}))
                            
                        socket.emit('user status', {username: user.username, action: {active: true, channel_specific: true}})
                                
                    } else { 

                        dispatch(toggleVoiceActive(false));

                        client.pauseProducer('audioType')

                        dispatch(updateMemberStatus({username: user.username, action: {active: false}}))
                            
                        socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}}) 
                            
                    }

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
            captureTimeout && clearTimeout(captureTimeout)
            if (scriptProcessor) {
                scriptProcessor.onaudioprocess = null;
            }
            analyser?.disconnect();
            scriptProcessor?.disconnect();
            source?.disconnect();
            try {

                const {webFrame} = window.require('electron');
                
                webFrame.clearCache();

            } catch (err) {
                console.log(err)
                return;
            }
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

    }, [channel.users, webcamState, screenShareState])


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
                    transition={disableTransition ? {duration: 0} : {duration: 0.2}}
                    style={{height: '100%', width: '100%', top: '0px', left: '0px', position: 'absolute', zIndex: 2}} key={'social-page-wrapper'} initial={{translateX: '100%'}} animate={{translateX: '0%'}} exit={{translateX: '-100%'}} >
                        <Social currentChannel={channel} channelId={current_channel_id} /> 
                    </motion.div>
                    : null}
                    {page === "widgets" ? 
                    <motion.div 
                    transition={disableTransition ? {duration: 0} : {duration: 0.2}}
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