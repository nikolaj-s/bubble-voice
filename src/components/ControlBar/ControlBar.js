import React from 'react';

import styles from  "./ControlBar.module.css";

import IconButton from '../ui/Buttons/IconButton/IconButton';

import { Mic, MicOff, ScreenShare, ScreenShareOff, Unplug, Video, VideoOff, Volume2, VolumeOff } from 'lucide-react';

import UserButton from '../ui/Buttons/UserButton/UserButton';

import { useNavigate, useParams } from 'react-router';
import { useMediaControls } from '../../context/MediaControlsContext';
import { useSelector } from 'react-redux';

export const ControlBar = ({inChannel = false}) => {

    const {isWebcamOn, isMicrophoneMuted, isAudioMuted, isScreenSharing, handleToggleAudio, handleToggleMicrophone, handleToggleWebcam } = useMediaControls();

    const {account} = useSelector(state => state.accountSlice);

    const {serverID} = useParams();

    const navigate = useNavigate();

    const handleDisconnect = () => {
        navigate(`/dashboard/server/${serverID}`)
    }

    return (
        <div className={styles.wrapper}>
            {inChannel ?
            <div className={styles.channelControlWrapper}>
                <IconButton 
                backgroundColor={isWebcamOn ? 'var(--success-color)' : 'var(--primary-color)'}
                width={60}
                height={30}
                onClick={handleToggleWebcam}
                title={isWebcamOn ? "Turn off Webcam" : "Turn on Webcam"}
                Icon={isWebcamOn ? <VideoOff  color={'var(--text-color)'} /> : <Video height={50} width={50} color={'var(--text-color)'} />}
                />
                <IconButton 
                backgroundColor='var(--primary-color)'
                width={60}
                height={30}
                title={isScreenSharing ? "Stop Sharing Screen" : "Share Screen"}
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
