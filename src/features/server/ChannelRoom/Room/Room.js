/// library's
import React from 'react'
import { useRoutes } from 'react-router'
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as mediasoupClient from 'mediasoup-client';

// state
import { updateMusicState, selectCurrentChannel, selectCurrentChannelId, selectPushToTalkActive, selectServerId, toggleLoadingChannel, updateMemberStatus, selectServerMembers, throwServerError, updateJoiningChannelState, setChannelSocialId, selectReconnectingState, toggleReconnectingState } from '../../ServerSlice';
import { selectAudioInput, selectVideoInput, selectVoiceActivityState, selectPushToTalkState, selectMirroredWebCamState, selectEchoCancellatio, selectNoiseSuppression, selectMicInputVolume } from '../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice'
import { selectDisplayName, selectUserBanner, selectUserImage, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { playSoundEffect, selectMuteSoundEffectsWhileMutedState } from '../../../settings/soundEffects/soundEffectsSlice';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectAudioState, selectCurrentScreen, selectMicrophoneState, selectScreenShareState, selectWebCamState, setCurrentScreen, setScreens, setSelectingScreensState, toggleControlState, toggleLoadingScreenShare, toggleLoadingWebCam } from '../../../controlBar/ControlBarSlice';

// style
import "./Room.css";

// socket
import { socket } from '../../ServerBar/ServerBar';

// client
import { RoomClient } from './RoomClient';
import { RoomNavigation } from './RoomNavigation/RoomNavigation';
import { Social } from './Social/Social';
import { Widgets } from './Widgets/Widgets';
import { Music } from './Music/Music';
import { RoomUserWrapper } from './RoomUserWrapper/RoomUserWrapper';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { RoomActionOverlay } from './RoomActionOverlay/RoomActionOverlay';
import { ChannelBackground } from './ChannelBackground/ChannelBackground';
import { selectMiscSettingsHideChannelBackground } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { SubMenuButton } from '../../../../components/buttons/subMenuButton/SubMenuButton';

let client;

const Component = () => {
    
    const dispatch = useDispatch();

    const [loaded, setLoaded] = React.useState(false);

    const [loading, toggleLoading] = React.useState(true);

    const [page, setPage] = React.useState("voice");
    // state 
    const channel = useSelector(selectCurrentChannel);

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
    // audio pref state
    const echoCancellation = useSelector(selectEchoCancellatio);

    const noiseSuppression = useSelector(selectNoiseSuppression);

    const reconnecting = useSelector(selectReconnectingState);

    React.useEffect(() => {
        
        if (client) {

            client.updateAudioPrefs(noiseSuppression, echoCancellation, microphoneInputVolume)
        
        }

    }, [noiseSuppression, echoCancellation, microphoneInputVolume])

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

    }, [webCamMirroredState, webcamState])

    // voice activity state
    const voiceActivityDetection = useSelector(selectVoiceActivityState);

    const pushToTalk = useSelector(selectPushToTalkState);

    const members = useSelector(selectServerMembers);

    const member = members.find(member => member.username === username);
    
    const user = {
        _id: member?._id,
        username: username,
        display_name: displayName,
        user_banner: userBanner,
        user_image: userImage,
        mirror_web_cam: webCamMirroredState
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
    }

    const init = async (delay = 100) => {

        client = new RoomClient(socket, current_channel_id, server_id, mediasoupClient, audioDevice, videoDevice, microphoneState, webcamState, user, event, audioState, webCamMirroredState, echoCancellation, noiseSuppression, microphoneInputVolume)

        await client.join();

        return true
        
            
    }

    const cycleChannelPage = (page) =>  {

        if (page === 'social') {
            dispatch(setChannelSocialId(""));
        }

        setPage(page);
    }

    const handleScreenShare = async () => {

        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.invoke("GET_SOURCES").then((result) => {

                dispatch(setScreens(result))

                dispatch(setSelectingScreensState(true));

                return true
            })
            
            
        } catch (error) {
            
            dispatch(throwServerError({errorMessage: "Fatal error fetching screens to share"}));
            
        }

    }

    // handle initial channel join, and init of roomClient
    React.useEffect(() => {

        toggleLoading(true);

        dispatch(updateJoiningChannelState(true));

        setTimeout(() => {

            init().then( async () => {
                setLoaded(true);

                await socket.request('fetch current music info')
                .then(data => {

                    if (data.music_info) {
                        dispatch(updateMusicState({playing: data.music_info.playing, queue: data.music_info.queue}))
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                })

                toggleLoading(false);

                setTimeout(() => {

                    dispatch(updateJoiningChannelState(false));
                
                }, 500)
                    
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
            client?.exit();
            if (socket) {
                console.log('channel left/ channel change')
            }
        }
    // eslint-disable-next-line
    }, [current_channel_id])

    // handle state change for screen sharing
    React.useEffect(() => {
        try {
            if (currentScreen !== null) {
                dispatch(setScreens([]));
                dispatch(setSelectingScreensState(false));
                client?.produce('screenType', currentScreen);
                dispatch(updateMemberStatus({username: user.username, action: {screenshare: true}}))
                socket?.emit('user status', {username: user.username, action: {screenshare: true}})
            }
        } catch (error) {
            console.log(error);
            dispatch(throwServerError({errorMessage: error.message}))
        }
    // eslint-disable-next-line
    }, [currentScreen, reconnecting])

    // handle change of user control state
    React.useEffect(() => {
        if (client && loaded === true) {

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
    }, [microphoneState, webcamState, loaded, screenShareState, audioState, soundEffectsMuted, reconnecting])

    // handle voice activity

    React.useEffect(() => {

        let playing = false;

        let audioCtx,
            analyser,
            source,
            scriptProcessor

        try {

            if (client && loaded === true) {
                if (voiceActivityDetection === true) {
                    navigator.mediaDevices.getUserMedia({
                        audio: {deviceId: {exact: audioDevice._id}},
                        video: false
                    }).then((audio) => {

                        audioCtx = new AudioContext();
                    
                        analyser = audioCtx.createAnalyser();
                        
                        source = audioCtx.createMediaStreamSource(audio);

                        scriptProcessor = audioCtx.createScriptProcessor(2048, 1, 1)

                        analyser.smoothingTimeConstant = 0.8;
                        
                        analyser.fftSize = 1024;

                        source.connect(analyser);

                        analyser.connect(scriptProcessor);

                        scriptProcessor.connect(audioCtx.destination);
                        
                        scriptProcessor.onaudioprocess = function() {
                            try {
                                const array = new Uint8Array(analyser.frequencyBinCount);

                                analyser.getByteFrequencyData(array);

                                const arrSum = array.reduce((a, value) => a + value, 0);

                                const avg = (arrSum / array.length) * 5;
                                
                                if (avg > 60) {
                                    
                                    if (playing || microphoneState === false) return;

                                    playing = true;

                                    client.resumeProducer('audioType');

                                    dispatch(updateMemberStatus({username: user.username, action: {active: true}}))
                                
                                    socket.emit('user status', {username: user.username, action: {active: true, channel_specific: true}})
                                    
                                } else if (avg < 60) {

                                    if (playing === false) return;

                                    playing = false;

                                    client.pauseProducer('audioType');

                                    dispatch(updateMemberStatus({username: user.username, action: {active: false}}))
                                    
                                    socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}})
                                
                                }
                            } catch (error) {
                                console.log(error)
                                scriptProcessor.onaudioprocess = null;
                            }
                        }
                    })
                } else if (pushToTalk === true && microphoneState === true) {
                    
                    if (pushToTalkActive) {
                        client.resumeProducer('audioType');

                        dispatch(updateMemberStatus({username: user.username, action: {active: true}}))
                            
                        socket.emit('user status', {username: user.username, action: {active: true, channel_specific: true}})
                                
                    } else {
                        client.pauseProducer('audioType')

                        dispatch(updateMemberStatus({username: user.username, action: {active: false}}))
                            
                        socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}})
                    }
                }  else {

                    scriptProcessor?.disconnect();
                    analyser?.disconnect();
                    source?.disconnect();
                    audioCtx = null;
                }
                    
            }
        } catch (error) {
            scriptProcessor?.disconnect(audioCtx?.destination)
            scriptProcessor?.disconnect();
            analyser?.disconnect();
            source?.disconnect();
            

            dispatch(throwServerError({errorMessage: "Error processing microphone input"}))
        }

        if (microphoneState === false || loaded === false) {

            scriptProcessor?.disconnect();
            analyser?.disconnect();
            source?.disconnect();
            client?.closeProducer('audioType');
            
        }
        return () => {
            console.log('cleaning up')
            analyser?.disconnect();
            scriptProcessor?.disconnect();
            source?.disconnect();
            
        }
    // eslint-disable-next-line   
    }, [pushToTalk, voiceActivityDetection, loaded, current_channel_id, microphoneState, pushToTalkActive, reconnecting])
    
    React.useEffect(() => {
        
        if (page === 'social' || page === 'widgets') {
            document.getElementById('user-streams-wrapper').style.opacity = 0;
        } else {
            document.getElementById('user-streams-wrapper').style.opacity = 1;
        }
            
    }, [page])

    return (
        <>
            <RoomNavigation action={cycleChannelPage} page={page} />
            <div
            
            id='live-chat-wrapper'>
                <RoomUserWrapper users={channel.users} />
                <AnimatePresence>
                    {page === "social" ? <Social currentChannel={channel} channelId={current_channel_id} /> : null}
                    {page === "widgets" ? <Widgets /> : null}
                </AnimatePresence>
                <RoomActionOverlay page={page} />
                
            </div>
            <SubMenuButton target={'live-chat-wrapper'} borderRadius={10} zIndex={1} position={"absolute"} top={5} right={10} height={15} left={null} width={15} />
            <ChannelBackground channel_background={hideChannelBackgrounds ? null : channel.channel_background} blur={channel.background_blur} />
            <audio hidden={true} id={'microphone-input-source'} />
            <Music />
            <Loading loading={loading} />
        </>
    )
}


export const Room = () => useRoutes([
    { path: "/channel/:id/*", element: <Component />}
])