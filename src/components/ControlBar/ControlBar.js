import React from 'react';

import styles from  "./ControlBar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../Buttons/IconButton/IconButton';

import { Mic, MicOff, ScreenShare, ScreenShareOff, Unplug, Video, VideoOff, Volume2, VolumeOff } from 'lucide-react';
import UserButton from '../Buttons/UserButton/UserButton';
import { toggleAudioMute, toggleMicrophone } from '../../features/MediaControl/mediaControlSlice';
import { useSocket } from '../../context/SocketContext';
import { useNavigate, useParams } from 'react-router';

export const ControlBar = ({inChannel = false}) => {

    const socket = useSocket();

    const dispatch = useDispatch();

    const {serverID} = useParams();

    const navigate = useNavigate();

    const {account, loading} = useSelector(state => state.accountSlice);

    const {isMicrophoneMuted, isAudioMuted, isWebcamOn, isScreenSharing} = useSelector(state => state.mediaControlSlice);

    React.useEffect(() => {

        if (!socket) return;

        const updateStatus = () => {
            if (socket) {
    
                socket.emit('user updates channel status', {isMicrophoneMuted: isMicrophoneMuted, isAudioMuted: isAudioMuted})
    
            }
        }

        updateStatus();

        socket.on('connect', updateStatus);

        return () => {
            socket.off('connect', updateStatus)
        }

    }, [isAudioMuted, isMicrophoneMuted, socket])

    const handleToggleMicrophone = () => {
        if (loading) return;

        dispatch(toggleMicrophone(!isMicrophoneMuted));

    }

    const handleToggleAudio = () => {
        if (loading) return;

        dispatch(toggleAudioMute(!isAudioMuted));
    }

    const handleDisconnect = () => {
        navigate(`/dashboard/server/${serverID}`)
    }

    return (
        <div className={styles.wrapper}>
            {inChannel ?
            <div className={styles.channelControlWrapper}>
                <IconButton 
                backgroundColor='var(--primary-color)'
                width={60}
                height={30}
                title={isWebcamOn ? "Turn off Webcam" : "Turn on Webcam"}
                Icon={isWebcamOn ? <VideoOff  color={'var(--text-color)'} /> : <Video height={50} width={50} color={'var(--text-color)'} />}
                />
                <IconButton 
                backgroundColor='var(--primary-color)'
                width={60}
                height={30}
                title={isScreenSharing ? "Share Screen" : "Stop Sharing Screen"}
                Icon={isScreenSharing ? <ScreenShareOff height={20} width={20} color={'var(--text-color)'} /> : <ScreenShare height={'20px'} width={'20px'} color={'var(--text-color)'} />}
                />
                <IconButton 
                onClick={handleDisconnect}
                width={60}
                height={30}
                title={"Disconnect"}
                backgroundColor='var(--error-color)'
                Icon={<Unplug color='var(--text-color)' />}
                />
            </div>
            : null}
            <div className={styles.container} >
                <UserButton maxWidth={'calc(100% - 65px)'} {...account} />
                <div className={styles.buttonWrapper}>
                    <IconButton 
                    onClick={handleToggleMicrophone}
                    position='top'
                    Icon={
                    isMicrophoneMuted ?
                    <MicOff color='var(--text-color)' />
                    :
                    <Mic color='var(--text-color)' />
                    }
                    title={`${isMicrophoneMuted ? 'Un-Mute' : 'Mute'}`}
                    />
                    <IconButton 
                    onClick={handleToggleAudio}
                    position='top' title={`${isAudioMuted ? 'Un-Deafen' : 'Deafen'}`} Icon={
                    isAudioMuted ?
                    <VolumeOff color='var(--text-color)' />
                    :
                    <Volume2 color='var(--text-color)' />
                    } />
                </div>
            </div>
        </div>
    )
}
