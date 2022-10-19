// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { useNavigate, useRoutes } from 'react-router';

// state
import { addNewChannel, addSongToQueue, assignNewServerGroup, clearServerState, deleteChannel, fetchPersistedMusicVolume, fetchServerDetails, handleLeavingServer, leaveChannel, newMessage, selectCurrentChannel, selectCurrentChannelId, selectLoadingServerDetailsState, selectServerBanner, selectServerId, selectServerName, selectServerSettingsOpenState, selectTopAnimationPoint, setServerName, skipSong, throwServerError, toggleMusicPlaying, toggleServerPushToTalkState, updateChannel, updateChannelWidgets, updateMemberStatus, updateServerBanner, updateServerGroups, userJoinsChannel, userJoinsServer, userLeavesChannel } from '../ServerSlice';
import { selectUsername } from '../../settings/appSettings/accountSettings/accountSettingsSlice';
import { getToken, url } from '../../../util/Validation';
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';
import { selectActivateCameraKey, selectDisconnectKey, selectMuteAudioKey, selectMuteMicKey, selectPushToTalkKey, selectShareScreenKey } from '../../settings/appSettings/keyBindSettings/keyBindSettingsSlice';
import { selectAudioOutput } from '../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { addNewWidgetOverlayToQueue, clearWidgetOverLay } from '../ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';

// component's
import { ServerBanner } from '../../../components/serverBanner/ServerBanner';
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { setSideBarHeader } from '../../sideBar/sideBarSlice';
import { ChannelList } from './ChannelList/ChannelList';
import { TextButton } from '../../../components/buttons/textButton/TextButton';
import { ServerSettingsButton } from '../../../components/buttons/ServerSettingsButton/ServerSettingsButton';
import { DisconnectButton } from '../../../components/buttons/DisconnectButton/DisconnectButton';
import { ServerSettingsMenu } from '../serverSettings/ServerSettingsMenu';

// style's
import "./ServerBar.css"
import { selectCurrentScreen, setCurrentScreen, toggleControlState } from '../../controlBar/ControlBarSlice';

export let socket = null;

const Bar = () => {

    const socketListeners = ['new channel', 'error', 'user joins server', 'connect_failed', 'connect_error']

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const animation = useAnimation();

    const server_id = useSelector(selectServerId);

    const serverName = useSelector(selectServerName);

    const serverBanner = useSelector(selectServerBanner);

    const loading = useSelector(selectLoadingServerDetailsState);

    const username = useSelector(selectUsername);

    const current_channel_id = useSelector(selectCurrentChannelId);

    const current_channel = useSelector(selectCurrentChannel);

    const audioOutput = useSelector(selectAudioOutput);

    const currentScreen = useSelector(selectCurrentScreen);

    // keybinds
    const pushToTalkKey = useSelector(selectPushToTalkKey);

    const muteMicKey = useSelector(selectMuteMicKey);

    const muteAudioKey = useSelector(selectMuteAudioKey);

    const webCamKey = useSelector(selectActivateCameraKey);

    const disconnectKey = useSelector(selectDisconnectKey);

    const shareScreenKey = useSelector(selectShareScreenKey);

    const serverSettingsOpenState = useSelector(selectServerSettingsOpenState);

    const topPointAnimationLocation = useSelector(selectTopAnimationPoint);
    
    const handleConnectionLost = () => {

        if (window.location.hash.includes('disconnected')) return;
        
        if (window.location.hash.includes('/channel/')) {

            disconnect();

        }
        
        const new_redirect = `/dashboard/server/${serverName}/disconnected`;

        console.log(new_redirect)

        window.location.hash =  new_redirect;
        
        dispatch(leaveChannel({username: username}));
        
        dispatch(playSoundEffect('disconnected'));

        dispatch(clearServerState());

        socket.disconnect();

        // reset socket to avoid mismatch socket id errors
        socket = null;
        
        joiningServer();

    }

    const sockets = () => {

        socket.on('new channel', (data) => {
            dispatch(addNewChannel(data));
        })
        socket.on('error', (data) => {
            console.log(data)
        })
        socket.on('user joins server', (data) => {
            dispatch(userJoinsServer(data));
        })
        socket.on('connect_failed', (data) => {
            socket.off('connect_failed');

            handleConnectionLost();
            console.log('internet connection error')
            socket.disconnect()
        })
        socket.on('connect_error', () => {
            socket.off('connect_error');
            handleConnectionLost();
            console.log('server connection error')
            
        })
        socket.on('user joins channel', (data) => {
            dispatch(userJoinsChannel(data))
            if (window.location.hash.includes(data.channel._id)) {
                dispatch(playSoundEffect("userJoined"));
            }
        })
        socket.on('user leaves channel', (data) => {
            dispatch(userLeavesChannel(data));
            if (window.location.hash.includes(data.id)) {
                dispatch(playSoundEffect("userDisconnected"))
            }
        })

        socket.on('user dropped connection', (data) => {
            dispatch(userLeavesChannel(data));

            if (window.location.hash.includes(data.id)) {
                dispatch(playSoundEffect('lostConnection'));
            }
        })

        socket.on('user status', (data) => {
            dispatch(updateMemberStatus(data))
        })
        socket.on('new message', (data) => {
            
            dispatch(newMessage(data));

            if (window.location.hash.includes(data.channel_id)) {

                dispatch(playSoundEffect("newMessage"))

                dispatch(addNewWidgetOverlayToQueue({...data.content, action: 'new-message'}));
            
            }
            
        })

        socket.on('server update', (data) => {
            if (data.data.server_banner) {
                dispatch(updateServerBanner(data.data.server_banner))
            }
            if (data.data.server_name) {
                dispatch(setServerName(data.data.server_name));
            }
        })

        socket.on("updated server groups", (data) => {
            dispatch(updateServerGroups(data.data));
        })

        socket.on('channel update', (data) => {
            dispatch(updateChannel(data.channel));
        })

        socket.on('delete channel', (data) => {
            if (window.location.hash.includes(data.channel_id)) {
                
                navigate(window.location.hash.split('#')[1].split('/channel')[0])
                
                dispatch(playSoundEffect('channelDeleted'))
            }

            dispatch(deleteChannel(data.channel_id));
        })

        socket.on('assigned new permission', (data) => {
            console.log(data)
            dispatch(assignNewServerGroup({server_group: data.server_group, username: data.username}))
        })

        socket.on('music-widget/new-song', (data) => {
            dispatch(addSongToQueue(data.song));
        })

        socket.on('music-widget/skipped-song', (data) => {
            dispatch(skipSong());
        })

        socket.on('music-widget/toggle-playing', (data) => {
            dispatch(toggleMusicPlaying(data.playing))
        })

        socket.on('poke', (data) => {
            dispatch(playSoundEffect("youHaveBeenPoked"))
        })

        socket.on('kick', (data) => {
            leaveServer(true)
        })

        socket.on('new channel widget', (data) => {
            dispatch(updateChannelWidgets(data));
        })

        socket.on('widget overlay', (data) => {

            if (window.location.hash.includes(data.channel_id)) {
                
                dispatch(addNewWidgetOverlayToQueue(data));
            
            }
                
        })

        socket.on('move user', (data) => {
            try {

                if (window.location.hash.includes(data.new_channel)) return;

                setTimeout(() => {
                    document.getElementById(`channel-button-${data.new_channel}`).click();
                }, 150)
                    

            } catch (error) {
                return;
            }
        })
    }

    const joiningServer = async (tries = 0) => { 

        try {
            console.log("retrying joining server function")

            socket?.disconnect();
            
            socket = null;

            const token = await getToken();

            socket = io(`${url}`, {
                query: {
                    "TOKEN": token
                },
                reconnectionAttempts: 15,
                reconnectionDelay: 5000
            })
            
            socket.on('connect', (data) => {

                socket.request = function request(type, data = {}) {
                    return new Promise((resolve, reject) => {
                        socket.emit(type, data, (data) => {
                            if (data.error) {
                            reject(data.errorMessage);
                            } else {
                            resolve(data);
                            }
                        })
                    })
                }

                if (window.location.hash.includes('disconnected')) {

                    window.location.hash = window.location.hash.split('/disconnected')[0];

                }

                dispatch(fetchServerDetails());

                dispatch(fetchPersistedMusicVolume());

                sockets();
            
            })
        
        } catch (error) {

            console.log(error);

            dispatch(throwServerError("Fatal Connection Error"));
                
        }
    }

    const toggleServerSettings = () => {

        if (window.location.hash.includes('server-settings')) {
           
            window.location.hash = window.location.hash.split('/server-settings')[0]
            
        } else {
            if (window.location.hash.includes('appsettings')) {
                window.location.hash = window.location.hash.split('/appsettings')[0] + "/server-settings/overview"
            } else {
                window.location.hash = window.location.hash + '/server-settings/overview'
            }
            
        }
    }

    const disconnect = () => {
        
        dispatch(leaveChannel({username: username}));
        
        dispatch(playSoundEffect('disconnected'));
        
        dispatch(clearWidgetOverLay());

        navigate(window.location.hash.split('#')[1].split('/channel')[0])
    
    }

    const leaveServer = (kicked) => {

        dispatch(playSoundEffect(kicked ? "userKicked" : "disconnected"));
        
        dispatch(clearWidgetOverLay());

        dispatch(handleLeavingServer())

        navigate('/dashboard')

        socket.disconnect();

        socket = null;
    
    }

    // handle window focused
    React.useEffect(() => {

        let active = false;

        let pressed = false;

        const activate = (e) => {
            if (active === true) return;
            if (e.keyCode === pushToTalkKey.keyCode || e.key === pushToTalkKey.key || e.which === pushToTalkKey.keyCode) {
                dispatch(toggleServerPushToTalkState(true))
                active = true;
            }
        }

        const deactivate = (e) => {
            
            if (e.keyCode === pushToTalkKey.keyCode || e.key === pushToTalkKey.key || e.which === pushToTalkKey.keyCode) {
                if (active === false) return;
                dispatch(toggleServerPushToTalkState(false))
                active = false;
            }

            pressed = false;
        }

        const press = (e) => {
            if (!current_channel_id) return;

            if (e.keyCode === muteMicKey.keyCode || e.key === muteMicKey.key || e.which === muteMicKey.keyCode) {
                if (pressed) return;
                document.getElementById('toggle-microphone-button').click();
                pressed = true;
            }

            if (e.keyCode === muteAudioKey.keyCode || e.key === muteAudioKey.key || e.which === muteAudioKey.keyCode) {
                if (pressed) return;
                document.getElementById('mute-audio-toggle-button').click();
                pressed = true;
            }

            if (e.keyCode === webCamKey.keyCode || e.key === webCamKey.key || e.which === webCamKey.keyCode) {
                if (pressed) return;
                document.getElementById('web-cam-toggle-button').click();
            }

            if (e.keyCode === disconnectKey.keyCode || e.key === disconnectKey.key || e.which === disconnectKey.keyCode) {
                if (pressed) return;
                document.getElementById('disconnect-from-channel-button').click();
            }

            if (e.keyCode === shareScreenKey.keyCode || e.key === shareScreenKey.key || e.which === shareScreenKey.keyCode) {
                if (pressed) return;

                if (!current_channel_id) return;

                dispatch(playSoundEffect('controlSoundEffect'))

                dispatch(toggleControlState('screenShareState'));

                if (currentScreen === null) {
                    dispatch(setCurrentScreen("screen:0:0"))
                } else {
                    dispatch(setCurrentScreen(null));
                }
                
            }
        
        }

        window.addEventListener('mousedown', activate)

        window.addEventListener('mouseup', deactivate)

        window.addEventListener('mouseup', press)

        document.addEventListener('keydown', activate)

        document.addEventListener('keyup', deactivate)

        document.addEventListener('keypress', press);

        return () => {
            document.removeEventListener('keydown', activate);
            
            document.removeEventListener('keyup', deactivate);
            
            document.removeEventListener('keypress', press);
            
            window.removeEventListener('mousedown', activate)

            window.removeEventListener('mouseup', deactivate)

            window.removeEventListener('mouseup', press)
        }

    // eslint-disable-next-line
    }, [muteMicKey, muteAudioKey, webCamKey, disconnectKey, pushToTalkKey, current_channel_id])

    // handle global keybinds for application
    React.useEffect(() => {

        let ipcRenderer;

        // init keybind listener
        try {

            ipcRenderer = window.require('electron').ipcRenderer;
            
            ipcRenderer.on('push to talk', (event, data) => {
               dispatch(toggleServerPushToTalkState(data.active))
            })

            ipcRenderer.on('mute mic', (event, data) => {
                if (document.hasFocus()) return;
                document.getElementById('toggle-microphone-button').click();
            })

            ipcRenderer.on('mute audio', (event, data) => {
                if (document.hasFocus()) return;
                document.getElementById('mute-audio-toggle-button').click();
            })

            ipcRenderer.on('toggle camera', (event, data) => {
                if (document.hasFocus()) return;
                document.getElementById('web-cam-toggle-button').click();
            })

            ipcRenderer.on('disconnect key', (event, data) => {
                if (document.hasFocus()) return;
                document.getElementById('disconnect-from-channel-button').click();
            })

            ipcRenderer.on('screen share', (event, data) => {
                if (!current_channel_id) return;

                if (document.hasFocus()) return;

                dispatch(playSoundEffect('controlSoundEffect'));

                dispatch(toggleControlState('screenShareState'));

                if (currentScreen === null) {
                    dispatch(setCurrentScreen("screen:0:0"))
                } else {
                    dispatch(setCurrentScreen(null));
                }
            
            })

        } catch (error) {
            console.log("you are using the web version of this app")
        }

        return () => {
            ipcRenderer?.removeAllListeners()
        }
    // eslint-disable-next-line
    }, [current_channel_id])

    React.useEffect(() => {

        console.log('rejoining')
        
        if (socket !== null) {

            socket = null;
        
        }

        dispatch(setHeaderTitle('Select Channel'));

        dispatch(setSideBarHeader(""))
        
        if (socket === null) {

            joiningServer();
        
        }

        
        // clean up socket
        return () => {
            dispatch(leaveChannel({username: username}));
            
            try {
                socket.off();
                socket.emit('left server', {server_id: server_id});
                socket = null;
                dispatch(clearServerState())
            } catch (error) {
                socket = null;
                dispatch(clearServerState())
                return;
            }
        }
    // eslint-disable-next-line   
    }, [])

    // handle header title when user closes server settings
    React.useEffect(() => {
        if (serverSettingsOpenState === false) {
            dispatch(setHeaderTitle(current_channel.channel_name ? current_channel.channel_name : "Select Channel"));
        }
    // eslint-disable-next-line
    }, [serverSettingsOpenState])

    // handle device output
    React.useEffect(() => {
        try {

            const mediaElements = document.querySelectorAll('audio');

            for (const el of mediaElements) {
                el.setSinkId(audioOutput._id);
            }

        } catch (error) {
            console.log(error)
        }
    }, [current_channel, audioOutput])
    
    // handle on mount animation
    React.useEffect(() => {

        animation.start({
            top: 0,
            maxWidth: '100%',
            overflowY: 'auto',
            height: '100%'
        })

    }, [])
    
    return (
        <motion.div initial={{
            position: 'absolute',
            top: topPointAnimationLocation,
            height: '130px',
            maxWidth: '90%',
            overflowY: 'hidden'
            }} animate={animation}
            transition={{duration: 0.3}} 
            className='server-bar-container'>
            <ServerSettingsButton action={toggleServerSettings} />
            <ServerBanner serverImage={serverBanner} serverName={serverName} />
            {loading ? <Loading loading={loading} /> :
            <>
            <ChannelList />
            <ServerSettingsMenu />
            </>
            }
            {current_channel_id !== null ? <DisconnectButton action={disconnect} /> : null}
            <motion.div 
            initial={{display: 'none'}}
            animate={{display: 'flex'}}
            style={{
                width: current_channel_id ? "calc(100% - 125px)" : "90%"
            }}
            className='leave-server-button'>
                <TextButton id='disconnect-from-server-button' action={() => {leaveServer(false)}} name={"Leave Server"} />
            </motion.div>
        </motion.div>
    )
}


export const ServerBar = () => useRoutes([
    { path: "server/:id/*", element: <Bar /> }
])