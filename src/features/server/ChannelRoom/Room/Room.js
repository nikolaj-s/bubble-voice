/// library's
import React from 'react'
import { useRoutes } from 'react-router'
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as mediasoupClient from 'mediasoup-client';

// state
import { updateMusicState, selectCurrentChannel, selectCurrentChannelId, selectMusicPlayingState, selectMusicQueue, selectPushToTalkActive, selectServerId, toggleLoadingChannel, updateMemberStatus, selectServerMembers } from '../../ServerSlice';
import { selectAudioInput, selectVideoInput, selectVoiceActivityState, selectPushToTalkState } from '../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice'
import { selectDisplayName, selectUserBanner, selectUserImage, selectUsername } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { playSoundEffect } from '../../../settings/soundEffects/soundEffectsSlice';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectAudioState, selectCurrentScreen, selectMicrophoneState, selectScreenShareState, selectWebCamState, setCurrentScreen, setScreens, setSelectingScreensState } from '../../../controlBar/ControlBarSlice';

// components
import { User as UserComponent } from './User/User';

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

let client;

const Component = () => {

    const dispatch = useDispatch();

    const [loaded, setLoaded] = React.useState(false);

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
        user_image: userImage
    }

    const event = (arg) => {
        if (arg.action === 'playSoundEffect') return dispatch(playSoundEffect(arg.value))
    }

    const init = async () => {
        client = new RoomClient(socket, current_channel_id, server_id, mediasoupClient, audioDevice, videoDevice, microphoneState, webcamState, user, event, audioState)

        await client.join();

        return true
    }

    const cycleChannelPage = (page) =>  {
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
            console.log(error)

            
        }

    }
    // handle initial channel join, and init of roomClient
    React.useEffect(() => {

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
        })
       
        dispatch(setHeaderTitle(channel.channel_name));

        return () => {
            dispatch(setHeaderTitle('Select Channel'))
            dispatch(toggleLoadingChannel(true))
            dispatch(setScreens([]))
            dispatch(setSelectingScreensState(false));
            dispatch(setCurrentScreen(null))
            setLoaded(false);
            client.exit();
            if (socket) {
                console.log('channel left/ channel change')
            }
        }
    // eslint-disable-next-line
    }, [current_channel_id])

    // handle state change for screen sharing
    React.useEffect(() => {
        if (currentScreen !== null) {
            dispatch(setScreens([]));
            dispatch(setSelectingScreensState(false));
            client.produce('screenType', currentScreen);
            dispatch(updateMemberStatus({username: user.username, action: {screenshare: true}}))
            socket.emit('user status', {username: user.username, action: {screenshare: true}})
        }
    // eslint-disable-next-line
    }, [currentScreen])

    // handle change of user control state
    React.useEffect(() => {
        if (client && loaded === true) {
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
                console.log(document.querySelectorAll('audio'))
                document.querySelectorAll('video, audio').forEach(el => el.muted = true)
                dispatch(updateMemberStatus({username: user.username, action: {muted: true}}))
                client.toggleAudioState(true)
                socket.emit('user status', {username: user.username, action: {muted: true}})
            }

        }
    // eslint-disable-next-line
    }, [microphoneState, webcamState, loaded, screenShareState, audioState])

    // handle voice activity

    React.useEffect(() => {

        let playing = false;


        let audioCtx,
            analyser,
            source,
            scriptProcessor

        try {
            if (client && loaded === true && microphoneState === true) {
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

                        analyser.connect(scriptProcessor)

                        scriptProcessor.connect(audioCtx.destination)
                        
                        scriptProcessor.onaudioprocess = function() {
                            
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
                    analyser?.disconnect();
                    source?.disconnect();
                    scriptProcessor?.disconnect();
                }
                    
            }
        } catch (error) {
            console.log(error)
            
        }
        return () => {
            analyser?.disconnect();
            source?.disconnect();
            scriptProcessor?.disconnect();
        }
    // eslint-disable-next-line   
    }, [pushToTalk, voiceActivityDetection, loaded, current_channel_id, microphoneState, pushToTalkActive])
    
    return (
        <>
            <RoomNavigation action={cycleChannelPage} page={page} />
            <div id='live-chat-wrapper'>
                <RoomUserWrapper users={channel.users} />
                <AnimatePresence>
                    {page === "social" ? <Social /> : null}
                    {page === "widgets" ? <Widgets /> : null}
                </AnimatePresence>
            </div>
            <Music />
        </>
    )
}


export const Room = () => useRoutes([
    { path: "/channel/:id/*", element: <Component />}
])