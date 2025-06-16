
import React from 'react';

import styles from '../Room.module.css';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Ellipsis, VideoOff, Mic, MicOff, Unplug, Video, HeadphoneOff, Headphones, Maximize, MonitorOff, MonitorUp, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { PillSpacer } from '../../ui/Spacers/PillSpacer/PillSpacer';
import { useMediaControls } from '../../../context/MediaControlsContext';
import { KeybindToolTip } from '../../ui/Titles/KeybindToolTip/KeybindToolTip';
import { MediaPlayerInlineControls } from './MediaPlayerInlineControls/MediaPlayerInlineControls';
import { triggerContext } from '../../../lib/services/helperFunctions';
import { setFullscreen } from '../../../features/Ui/uiSlice';
import { ErrorToolTip } from '../../ui/ErrorToolTip/ErrorToolTip';
import { setCurrentVoiceChannel } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';
import { MediaPlayerRoomStatus } from './MediaPlayerRoomStatus/MediaPlayerRoomStatus';

export const RoomOverlay = () => {

    const dispatch = useDispatch();

    const {isWebcamOn, isMicrophoneMuted, isAudioMuted, isSharing, handleToggleAudio, handleToggleMicrophone, handleToggleWebcam, webcamError, microphoneError, audioError, handleShareScreen } = useMediaControls();

    const {fullscreen} = useSelector(state => state.uiSlice);

    const {keybinds} = useSelector(state => state.keybindsSlice);

    const [isIdle, setIsIdle] = React.useState(false);

    const idleTimer = React.useRef(null);

    const lastInteractionTime = React.useRef(Date.now());

    React.useEffect(() => {
        const idleDelay = 3000; // 3 seconds
      
        const handleUserActivity = () => {
          lastInteractionTime.current = Date.now();
      
          // Only update if previously idle
          if (isIdle) setIsIdle(false);
      
          // Reset timer
          clearTimeout(idleTimer.current);
          idleTimer.current = setTimeout(() => {
            const now = Date.now();
            if (now - lastInteractionTime.current >= idleDelay) {
              setIsIdle(true);
            }
          }, idleDelay);
        };
      
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('click', handleUserActivity);
      
        return () => {
          clearTimeout(idleTimer.current);
          window.removeEventListener('mousemove', handleUserActivity);
          window.removeEventListener('click', handleUserActivity);
        };
    }, [isIdle]);
      
    const handleDisconnect = () => {
        dispatch(setCurrentVoiceChannel(null));
    }

    return (
        <div className={`${styles.overlay} ${isIdle ? styles.hideOverlay : ''}`}>
            <div className={styles.topButtons}>
                
                <IconButton
                title={"Room Options"}
                Icon={<Ellipsis color="var(--text-color)" />}
                position='bottom' 
                onClick={(e) => {triggerContext(e, 'voice-channel')}}
                />
                <IconButton 
                title={'Maximize'}
                Icon={<Maximize color='var(--text-color)' />}
                position='bottom'
                onClick={() => {dispatch(setFullscreen(!fullscreen))}}
                />
            </div>
            <div id='room-control-bar' data-context={JSON.stringify({type: 'roomControl'})} className={styles.bottomButtons}>
                <MediaPlayerRoomStatus />
                <div className={styles.wrapper}>
                    <MediaPlayerInlineControls />
                    <IconButton 
                    padding={15}
                    borderRadius={"50%"}
                    width={50}
                    height={50}
                    onClick={handleToggleMicrophone}
                    position='top'
                    Icon={
                    isMicrophoneMuted || microphoneError ?
                    <MicOff color={microphoneError ? 'var(--error-color)' : 'var(--text-color)'} />
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
                    padding={15}
                    width={50}
                    height={50}
                    borderRadius={"50%"}
                    onClick={handleToggleAudio}
                    position='top' title={
                        audioError ?
                        <ErrorToolTip error={audioError} />
                        :
                        <KeybindToolTip 
                        label={`${isAudioMuted ? 'Undeafen' : 'Deafen'}`}
                        binds={[keybinds['deafen']?.key]}
                        />
                    } Icon={
                    isAudioMuted || audioError ?
                    <HeadphoneOff color={audioError ? 'var(--error-color)' : 'var(--text-color)'} />
                    :
                    <Headphones color='var(--text-color)' />
                    } />
                    <IconButton 
                    padding={15}
                    width={50}
                    height={50}
                    borderRadius={"50%"}
                    onClick={handleToggleWebcam}
                    position='top' title={
                        webcamError ?
                        <ErrorToolTip error={webcamError} /> :
                        <KeybindToolTip 
                        label={`${isWebcamOn ? 'Turn off camera'.replace(/(\\s{2,})/g, '$1\u200B') : 'Turn on camera'.replace(/(\\s{2,})/g, '$1\u200B')}`}
                        binds={[keybinds['enableWebcam']?.key]}
                        />
                    } Icon={
                    isWebcamOn || webcamError ?
                    <VideoOff color={webcamError ? 'var(--error-color)' : 'var(--text-color)'} />
                    :
                    <Video color='var(--text-color)' />
                    } 
                    backgroundColor={isWebcamOn && !webcamError ? 'var(--success-color)' : 'var(--background-color)'}
                    />
                    <IconButton 
                    title={isSharing ? "Stop Streaming" : "Start Streaming"}
                    Icon={isSharing ? <MonitorOff color='var(--text-color)' /> : <MonitorUp color='var(--text-color)' />}
                    backgroundColor={isSharing ? "var(--success-color)" : null}
                    onClick={handleShareScreen}
                    padding={15}
                    width={50}
                    height={50}
                    borderRadius={"50%"}
                    />
                    <PillSpacer verticle={true} />
                    <IconButton 
                    onClick={handleDisconnect}
                    padding={15}
                    width={50}
                    height={50}
                    borderRadius={"50%"}
                    title={"Disconnect"}
                    backgroundColor='var(--error-color)'
                    Icon={<Unplug color='var(--text-color)' />}
                    />
                </div>
            </div>
        </div>
    )
}
