// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { useNavigate, useRoutes } from 'react-router';

// state
import { addNewChannel, addSongToQueue, assignNewServerGroup, deleteChannel, fetchPersistedMusicVolume, fetchServerDetails, leaveChannel, newMessage, selectCurrentChannel, selectCurrentChannelId, selectLoadingServerDetailsState, selectServerBanner, selectServerId, selectServerName, selectServerSettingsOpenState, setServerName, skipSong, toggleMusicPlaying, toggleServerPushToTalkState, updateChannel, updateMemberStatus, updateServerBanner, updateServerGroups, userJoinsChannel, userJoinsServer, userLeavesChannel } from '../ServerSlice';
import { selectUsername } from '../../settings/appSettings/accountSettings/accountSettingsSlice';
import { getToken, url } from '../../../util/Validation';
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';
import { selectActivateCameraKey, selectDisconnectKey, selectMuteAudioKey, selectMuteMicKey, selectPushToTalkKey } from '../../settings/appSettings/keyBindSettings/keyBindSettingsSlice';
import { selectAudioOutput } from '../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';

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

    // keybinds
    const pushToTalkKey = useSelector(selectPushToTalkKey);

    const muteMicKey = useSelector(selectMuteMicKey);

    const muteAudioKey = useSelector(selectMuteAudioKey);

    const webCamKey = useSelector(selectActivateCameraKey);

    const disconnectKey = useSelector(selectDisconnectKey);

    const serverSettingsOpenState = useSelector(selectServerSettingsOpenState);
    
    const handleConnectionLost = () => {
        if (window.location.hash.includes('disconnected')) return;
        window.location.hash =  `/dashboard/server/${serverName}/disconnected`;
        dispatch(leaveChannel({username: username}));
        dispatch(playSoundEffect('disconnected'));
    }

    const sockets = () => {
        socket.on('new channel', (data) => {
            dispatch(addNewChannel(data));
        })
        socket.on('error', (data) => {
            console.log(data);
        })
        socket.on('user joins server', (data) => {
            console.log(data)
            dispatch(userJoinsServer(data));
        })
        socket.on('connect_failed', (data) => {
            handleConnectionLost();
            console.log('server error')
        })
        socket.on('connect_error', () => {
            handleConnectionLost();
            console.log('server error')
        })
        socket.on('connect', () => {
            if (window.location.hash.split('#')[1].includes('disconnected')) {
                navigate(window.location.hash.split('#')[1].split('/disconnected')[0])
            }
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
        socket.on('user status', (data) => {
            dispatch(updateMemberStatus(data))
        })
        socket.on('new message', (data) => {
            dispatch(newMessage(data));
            dispatch(playSoundEffect(""))
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
            if (data.channel_id === current_channel_id) {
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
    }

    const joiningServer = async () => {
        
        const token = await getToken();

        socket = io(`${url}`, {
            query: {
                "TOKEN": token
            }
        })

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

        dispatch(fetchServerDetails());

        dispatch(fetchPersistedMusicVolume());

        sockets();
    }

    // handle window focused
    React.useEffect(() => {

        let active = false;

        let pressed = false;

        const activate = (e) => {
            if (active === true) return;
            if (e.keyCode === pushToTalkKey.keyCode) {
                dispatch(toggleServerPushToTalkState(true))
                active = true;
            }
        }

        const deactivate = (e) => {
            
            if (e.keyCode === pushToTalkKey.keyCode) {
                if (active === false) return;
                dispatch(toggleServerPushToTalkState(false))
                active = false;
            }

            pressed = false;
        }

        const press = (e) => {
            
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
        }
        document.addEventListener('keydown', activate)

        document.addEventListener('keyup', deactivate)

        document.addEventListener('keypress', press);

        return () => {
            document.removeEventListener('keydown', activate);
            document.removeEventListener('keyup', deactivate);
            document.removeEventListener('keypress', press);
        }

    // eslint-disable-next-line
    }, [])

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

        } catch (error) {
            console.log("you are using the web version of this app")
        }

        return () => {
            ipcRenderer?.removeAllListeners()
        }
    // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        
        
        if (socket !== null) {
            socket = null;
        }

        animation.start({
            left: '0%',
            opacity: 1
        })

        dispatch(setHeaderTitle('Select Channel'));
        dispatch(setSideBarHeader(""))
        
        if (socket === null) {
            joiningServer();
        }

        
        // clean up socket
        return () => {
            dispatch(leaveChannel({username: username}));
            dispatch(playSoundEffect('disconnected'));
            try {
                socket.off();
                socket.emit('left server', {server_id: server_id});
                socket = null;
            } catch (error) {
                socket = null;
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
        navigate(window.location.hash.split('#')[1].split('/channel')[0])
    }

    const leaveServer = () => {
        dispatch(leaveChannel({username: username}))
        dispatch(playSoundEffect("disconnected"));
        navigate('/dashboard')
    }

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

    return (
        <motion.div initial={{left: "100%", opacity: 0}} animate={animation} className='server-bar-container'>
            <ServerSettingsButton action={toggleServerSettings} />
            {loading ? <Loading loading={loading} /> :
            <>
            <ServerBanner serverImage={serverBanner} serverName={serverName} />
            <ChannelList />
            <ServerSettingsMenu />
            </>
            }
            {current_channel_id !== null ? <DisconnectButton action={disconnect} /> : null}
            <div 
            style={{
                width: current_channel_id ? "calc(100% - 135px)" : "90%"
            }}
            className='leave-server-button'>
                <TextButton action={leaveServer} name={"Leave Server"} />
            </div>
        </motion.div>
    )
}


export const ServerBar = () => useRoutes([
    { path: "server/:id/*", element: <Bar /> }
])