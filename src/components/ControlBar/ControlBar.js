
import styles from  "./ControlBar.module.css";

import IconButton from '../ui/Buttons/IconButton/IconButton';

import { HeadphoneOff, Headphones, Mic, MicOff, MonitorOff, MonitorUp, MonitorX, Settings2, Unplug, Video, VideoOff } from 'lucide-react';

import UserButton from '../ui/Buttons/UserButton/UserButton';

import { useMediaControls } from '../../context/MediaControlsContext';

import { useDispatch, useSelector } from 'react-redux';

import { KeybindToolTip } from '../ui/Titles/KeybindToolTip/KeybindToolTip';

import { setOverlay } from '../../features/Overlay/overlaySlice';
import { ErrorToolTip } from '../ui/ErrorToolTip/ErrorToolTip';
import { ConnectionIndicator } from '../ConnectionIndicator/ConnectionIndicator';
import { setCurrentVoiceChannel } from '../../features/Channel/VoiceChannel/voiceChannelSlice';
import { triggerContext } from "../../lib/services/helperFunctions";

export const ControlBar = () => {

    const dispatch = useDispatch();

    const {isWebcamOn, isMicrophoneMuted, isAudioMuted, isScreenSharing, handleToggleAudio, handleToggleMicrophone, handleToggleWebcam, webcamError, microphoneError, audioError, isSharing, handleShareScreen, screenShareError } = useMediaControls();

    const {keybinds} = useSelector(state => state.keybindsSlice);

    const {account} = useSelector(state => state.accountSlice);

    const inChannel = useSelector(state => state.voiceChannelSlice.currentVoiceChannel);

    const handleDisconnect = () => {
        dispatch(setCurrentVoiceChannel(null));
    }

    return (
        <>
        <div
        id="main-control-bar"
        data-context={JSON.stringify({type: 'controlBar'})}
        className={styles.wrapper}>
            {inChannel ?
            <div className={styles.channelControlWrapper}>
                <IconButton 
                backgroundColor={webcamError ? 'var(--error-color)' : isWebcamOn ? 'var(--success-color)' : 'var(--primary-color)'}
                width={50}
                height={35}
                padding={8}
                onClick={handleToggleWebcam}
                title={webcamError ? <ErrorToolTip error={webcamError} /> : isWebcamOn ? "Turn off Webcam" : "Turn on Webcam"}
                Icon={isWebcamOn || webcamError ? <VideoOff strokeWidth={2.5} color={'var(--text-color)'} /> : <Video strokeWidth={2.5} color={'var(--text-color)'} />}
                />
                <IconButton 
                backgroundColor={screenShareError ? "var(--error-color)" : isSharing ? 'var(--success-color)' : 'var(--primary-color)'}
                width={50}
                height={35}
                padding={8}
                onClick={handleShareScreen}
                title={screenShareError ? <ErrorToolTip error={screenShareError} /> : isSharing ? "Stop Stream" : "Start Streaming"}
                Icon={screenShareError ? <MonitorX color="var(--text-color)" strokeWidth={2.5} /> : isSharing ? <MonitorOff strokeWidth={2.5} color='var(--text-color)' /> : <MonitorUp strokeWidth={2.5} color='var(--text-color)' />}
                />
                <ConnectionIndicator />
                <IconButton 
                onClick={handleDisconnect}
                width={50}
                height={35}
                padding={8}
                title={keybinds['disconnect'] ? <KeybindToolTip label={'Disconnect'} binds={[keybinds['disconnect']?.key]} /> : "Disconnect"}
                backgroundColor='var(--error-color)'
                Icon={<Unplug strokeWidth={2.5} color='var(--text-color)' />}
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
                        <ErrorToolTip error={microphoneError} /> 
                        :
                        keybinds['muteMicrophone'] ?
                        <KeybindToolTip 
                        label={`${isMicrophoneMuted ? 'Unmute' : 'Mute'}`}
                        binds={[keybinds['muteMicrophone']?.key]}
                        />
                        :
                        `${isMicrophoneMuted ? 'Unmute' : 'Mute'}`
                        }
                    />
                    
                    <IconButton 
                    onClick={handleToggleAudio}
                    position='top' 
                    title={
                        audioError ?
                        <ErrorToolTip error={audioError} /> 
                        :
                        <KeybindToolTip 
                        label={`${isAudioMuted ? 'Undeafen' : 'Deafen'}`}
                        binds={[keybinds['deafen']?.key]}
                        />
                    }
                    Icon={
                    isAudioMuted || audioError ?
                    <HeadphoneOff color={audioError ? 'var(--error-color)' : 'var(--text-color)' }/>
                    :
                    <Headphones color='var(--text-color)' />
                    } />
                    <IconButton 
                    title={"Quick Options"}
                    Icon={<Settings2 color='var(--text-color)' />}
                    onClick={(e) => {triggerContext(e, 'main-control-bar')}}
                    />
                </div>
            </div>
        </div>
        </>
    )
}
