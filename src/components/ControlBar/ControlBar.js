import React from 'react';

import styles from  "./ControlBar.module.css";

import IconButton from '../ui/Buttons/IconButton/IconButton';

import { HeadphoneOff, Headphones, Mic, MicOff, ScreenShare, ScreenShareOff, Settings2, Unplug, Video, VideoOff, Volume2, VolumeX } from 'lucide-react';

import UserButton from '../ui/Buttons/UserButton/UserButton';

import { useNavigate, useParams } from 'react-router';

import { useMediaControls } from '../../context/MediaControlsContext';

import { useDispatch, useSelector } from 'react-redux';

import { KeybindToolTip } from '../ui/Titles/KeybindToolTip/KeybindToolTip';

import { setOverlay } from '../../features/Overlay/overlaySlice';

export const ControlBar = () => {

    const dispatch = useDispatch();

    const {isWebcamOn, isMicrophoneMuted, isAudioMuted, isScreenSharing, handleToggleAudio, handleToggleMicrophone, handleToggleWebcam, webcamError, microphoneError } = useMediaControls();

    const {keybinds} = useSelector(state => state.keybindsSlice);

    const {account} = useSelector(state => state.accountSlice);

    const {serverID} = useParams();

    const inChannel = useSelector(state => state.voiceChannelSlice.currentVoiceChannel);

    const navigate = useNavigate();

    const handleDisconnect = () => {
        navigate(`/dashboard/server/${serverID}`)
    }

    const openQuickSettings = () => {
        dispatch(setOverlay('settingsQuickMenu'));
    }

    return (
        <>
        <div
        data-context={JSON.stringify({type: 'controlBar'})}
        className={styles.wrapper}>
            {inChannel ?
            <div className={styles.channelControlWrapper}>
                <IconButton 
                backgroundColor={webcamError ? 'var(--error-color)' : isWebcamOn ? 'var(--success-color)' : 'var(--primary-color)'}
                width={68}
                height={30}
                onClick={handleToggleWebcam}
                title={webcamError ? webcamError : isWebcamOn ? "Turn off Webcam" : "Turn on Webcam"}
                Icon={isWebcamOn || webcamError ? <VideoOff  color={'var(--text-color)'} /> : <Video height={50} width={50} color={'var(--text-color)'} />}
                />
                <IconButton 
                backgroundColor='var(--primary-color)'
                width={68}
                height={30}
                title={isScreenSharing ? "Stop Sharing Screen" : "Share Screen"}
                Icon={isScreenSharing ? <ScreenShareOff height={20} width={20} color={'var(--text-color)'} /> : <ScreenShare height={'20px'} width={'20px'} color={'var(--text-color)'} />}
                />
                <IconButton 
                onClick={handleDisconnect}
                width={68}
                height={30}
                title={"Disconnect"}
                backgroundColor='var(--error-color)'
                Icon={<Unplug color='var(--text-color)' />}
                />
            </div>
            : null}
            <div className={styles.container} >
                <UserButton 
                controlBar={true}
                onClick={() => {dispatch(setOverlay('userQuickMenu'))}}
               
                {...account} />
                <div className={`${styles.buttonWrapper} hideOnMobile`}>
                    <IconButton 
                    onClick={handleToggleMicrophone}
                    position='top'
                    Icon={
                    isMicrophoneMuted || microphoneError ?
                    <MicOff color={microphoneError ? 'var(--error-color)' :'var(--text-color)'} />
                    :
                    <Mic color='var(--text-color)' />
                    }
                    title={ 
                        microphoneError ?
                        microphoneError
                        :
                        <KeybindToolTip 
                        label={`${isMicrophoneMuted ? 'Unmute' : 'Mute'}`}
                        binds={[keybinds['muteMicrophone']?.key]}
                        />}
                    />
                    
                    <IconButton 
                    onClick={handleToggleAudio}
                    position='top' 
                    title={
                        <KeybindToolTip 
                        label={`${isAudioMuted ? 'Undeafen' : 'Deafen'}`}
                        binds={[keybinds['deafen']?.key]}
                        />
                    }
                    Icon={
                    isAudioMuted ?
                    <HeadphoneOff color='var(--text-color)' />
                    :
                    <Headphones color='var(--text-color)' />
                    } />
                    <IconButton 
                    title={"Quick Options"}
                    Icon={<Settings2 color='var(--text-color)' />}
                    onClick={openQuickSettings}
                    />
                </div>
            </div>
        </div>
        </>
    )
}
