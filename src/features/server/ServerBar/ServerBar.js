// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { useNavigate, useRoutes } from 'react-router';

// state
import { addNewChannel, assignNewServerGroup, clearServerState, deleteChannel, deleteMessage, fetchPersistedMusicVolume, fetchServerDetails, handleLeavingServer, leaveChannel, newMessage, removeSongFromWidget, reOrderChannels, saveSongToWidget, selectCurrentChannel, selectCurrentChannelId, selectInactiveChannel, selectLoadingServerDetailsState, selectServerBanner, selectServerId, selectServerName, selectServerSettingsOpenState, selectTopAnimationPoint, setServerName, throwServerError, toggleServerPushToTalkState, updateChannel, updateChannelWidgets, updateInactiveChannel, updateMemberActiveStatus, updateMemberStatus, updateServerBanner, updateServerGroups, userBanned, userJoinsChannel, userJoinsServer, userLeavesChannel, userLeavesServer } from '../ServerSlice';
import { selectUsername } from '../../settings/appSettings/accountSettings/accountSettingsSlice';
import { getToken, url } from '../../../util/Validation';
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';
import { selectActivateCameraKey, selectDisconnectKey, selectMuteAudioKey, selectMuteMicKey, selectPushToMuteKey, selectPushToTalkKey, selectShareScreenKey } from '../../settings/appSettings/keyBindSettings/keyBindSettingsSlice';
import { selectAudioOutput } from '../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { addNewWidgetOverlayToQueue, clearWidgetOverLay } from '../ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';
import { pushPokeNotification, pushSytemNotification } from '../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { addSongToQueue, like_song, removeSongFromQueue, skipSong, toggleMusicPlaying, un_like_song } from '../ChannelRoom/Room/Music/MusicSlice';
import { selectCurrentScreen, setCurrentScreen, toggleControlState } from '../../controlBar/ControlBarSlice';

// component's
import { ServerBanner } from '../../../components/serverBanner/ServerBanner';
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { removeServer, setSideBarHeader } from '../../sideBar/sideBarSlice';
import { ChannelList } from './ChannelList/ChannelList';
import { ServerSettingsButton } from '../../../components/buttons/ServerSettingsButton/ServerSettingsButton';
import { ServerSettingsMenu } from '../serverSettings/ServerSettingsMenu';
import { DisconnectButtonWrapper } from './DisconnectButtonWrapper/DisconnectButtonWrapper';

// UTIL
import { UnpackMessage } from '../../../util/UnpackMessage';

// style's
import "./ServerBar.css"
import { addPinnedMessage, removePinnedMessage } from '../ChannelRoom/ServerDashBoard/ServerDashBoardSlice';

export let socket = null;

const Bar = () => {

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

    const pushToMuteKey = useSelector(selectPushToMuteKey);

    const serverSettingsOpenState = useSelector(selectServerSettingsOpenState);

    const topPointAnimationLocation = useSelector(selectTopAnimationPoint);

    const inactiveChannel = useSelector(selectInactiveChannel);
    
    const handleConnectionLost = () => {
        console.log('connection time out')
        if (window.location.hash.includes('disconnected')) return;
        
        if (window.location.hash.includes('/channel/')) {

            document.getElementById('disconnect-from-channel-button').click();

        }
        
        const new_redirect = `/dashboard/server/${serverName ? serverName : "placeholder"}/disconnected`;

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
        socket.on('ping timeout', () => {
            console.log('timed out')
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
            
            const message = UnpackMessage(data, false);
            
            dispatch(newMessage(message));

            if (window.location.hash.includes(data.channel_id)) {

                dispatch(playSoundEffect("newMessage"))

                dispatch(addNewWidgetOverlayToQueue({...data.content, action: 'new-message'}));
            
            } else {
            
                dispatch(pushSytemNotification(message));
                
            }
            
        })

        socket.on('server update', (data) => {
            if (data.data.server_banner) {
                dispatch(updateServerBanner(data.data.server_banner))
            }
            if (data.data.server_name) {
                dispatch(setServerName(data.data.server_name));
            }

            if (data.data.inactive_channel) {
                dispatch(updateInactiveChannel(data.data.inactive_channel));
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

            dispatch(addNewWidgetOverlayToQueue({action: 'song-status', message: `${data.user.display_name} added ${data.song.title}`, user: data.user}));
            
        })

        socket.on('liked song', (data) => {
            dispatch(like_song(data));

            dispatch(saveSongToWidget(data));
        })

        socket.on('un liked song', (data) => {
            dispatch(un_like_song(data));

            dispatch(removeSongFromWidget(data));
            
        })

        socket.on('music-widget/skipped-song', (data) => {
            
            dispatch(skipSong());
        
            dispatch(addNewWidgetOverlayToQueue({action: 'song-status', message: `${data.user.display_name} skipped a song`, user: data.user}));
            
        })

        socket.on('music-widget/toggle-playing', (data) => {
            dispatch(toggleMusicPlaying(data.playing))

            dispatch(addNewWidgetOverlayToQueue({action: 'song-status', message: `${data.user.display_name} ${data.playing ? 'resumed' : "paused"} the music widget`, user: data.user}));
            
        })

        socket.on('music-widget/song-removed', (data) => {
            dispatch(removeSongFromQueue(data));

            dispatch(addNewWidgetOverlayToQueue({action: 'song-status', message: `${data.user.display_name} removed ${data.song.title} from the queue`, user: data.user}));

        })

        socket.on('poke', (data) => {
            dispatch(playSoundEffect("youHaveBeenPoked"))

            dispatch(pushPokeNotification(data.message))
        })

        socket.on('kick', (data) => {
            leaveServer(true)
        })

        socket.on('banned', (data) => {
            leaveServer();

            dispatch(removeServer(data.server_id));
        })

        socket.on('user banned', (data) => {
            dispatch(userBanned(data.banData));
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

                dispatch(playSoundEffect('moved'))

                setTimeout(() => {
                    document.getElementById(`channel-button-${data.new_channel}`).click();
                }, 150)
                    

            } catch (error) {
                return;
            }
        })

        socket.on("new channel order", (data) => {
            try {
                dispatch(reOrderChannels(data.new_order))
            } catch (error) {
                console.log(error)
            }
        })

        socket.on('delete message', (data) => {
            try {

                dispatch(deleteMessage(data));

                dispatch(removePinnedMessage({message: {_id: data.message_id}}));
            } catch (error) {
                console.log(error)
            }
        })

        socket.on('left server', (data) => {
            try {
                
                dispatch(userLeavesServer(data.member_id));
            
            } catch (error) {
                console.log(error)
            }
        })

        socket.on('user status update', (data) => {
            dispatch(updateMemberActiveStatus(data));
        })

        socket.on('toggle pinned message', (data) => {
            if (data.message.pinned) {
                dispatch(addPinnedMessage(data));
            } else {
                dispatch(removePinnedMessage(data));
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

            socket.on('reconnect_failed', () => {
                console.log('cannot reconnect')
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

            if (e.key === pushToMuteKey.key || e.keyCode === pushToMuteKey.keyCode || e.which === pushToMuteKey.keyCode) {
                active = true;
                document.getElementById('toggle-microphone-button').click();
            }
            
        }

        const deactivate = (e) => {
            
            if (e.keyCode === pushToTalkKey.keyCode || e.key === pushToTalkKey.key || e.which === pushToTalkKey.keyCode) {
                if (active === false) return;
                dispatch(toggleServerPushToTalkState(false))
                active = false;
            }

            if (e.key === pushToMuteKey.key || e.keyCode === pushToMuteKey.keyCode || e.which === pushToMuteKey.keyCode) {
                active = false;
                document.getElementById('toggle-microphone-button').click();
            }
            
            pressed = false;
        }

        const press = (e) => {
            if (!current_channel_id) return;
          
            if (e.key === muteMicKey.key) {
                if (pressed) return;
                document.getElementById('toggle-microphone-button').click();
                pressed = true;
            }

            if (e.key === muteAudioKey.key) {
                if (pressed) return;
                document.getElementById('mute-audio-toggle-button').click();
                pressed = true;
            }

            if (e.key === webCamKey.key) {
                if (pressed) return;
                document.getElementById('web-cam-toggle-button').click();
            }

            if (e.key === disconnectKey.key) {
                if (pressed) return;
                document.getElementById('disconnect-from-channel-button').click();
            }

            if (e.key === shareScreenKey.key) {
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
    }, [muteMicKey, muteAudioKey, webCamKey, disconnectKey, pushToTalkKey, pushToMuteKey, current_channel_id])

    // handle global keybinds for application
    React.useEffect(() => {

        let ipcRenderer;

        // init keybind listener
        try {

            ipcRenderer = window.require('electron').ipcRenderer;
            
            ipcRenderer.on('push to mute', () => {
                if (document.hasFocus()) return;
                document.getElementById('toggle-microphone-button').click();
            })

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
                try {
                    if (!current_channel_id) return;

                    if (document.hasFocus()) return;

                    if (currentScreen !== null) {
                        dispatch(setCurrentScreen(null))

                        dispatch(playSoundEffect('controlSoundEffect'));

                        dispatch(toggleControlState('screenShareState'));
                        
                    } else {
                        ipcRenderer.invoke("GET_SOURCES").then(res => {

                            let l_windows = res.filter(w => !w.id.includes('screen'));

                            dispatch(setCurrentScreen(l_windows[0].id));
                            
                            dispatch(playSoundEffect('controlSoundEffect'));

                            dispatch(toggleControlState('screenShareState'));

                        })
                    }
                } catch (error) {
                    console.log(error);
                    dispatch(throwServerError({errorMessage: "An Error Has Occured Trying to find focused window"}))
                }
                    
            
            })

            ipcRenderer.on('inactive', () => {
                if (current_channel_id && inactiveChannel.id !== "") {
                    console.log('user has gone inactive')
                    try {
                        document.getElementById(`channel-button-${inactiveChannel.id}`).click();
                    } catch (error) {
                        return;
                    }
                }
            })

        } catch (error) {
            console.log("you are using the web version of this app")
        }

        return () => {
            ipcRenderer?.removeAllListeners()
        }
    // eslint-disable-next-line
    }, [current_channel_id, inactiveChannel, currentScreen])

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
        
    // eslint-disable-next-line
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
            <DisconnectButtonWrapper disconnect={disconnect} leave={leaveServer} channel_id={current_channel_id} /> 
        </motion.div>
    )
}


export const ServerBar = () => useRoutes([
    { path: "server/:id/*", element: <Bar /> }
])