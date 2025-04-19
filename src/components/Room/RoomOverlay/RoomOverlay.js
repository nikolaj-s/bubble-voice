
import React from 'react';

import styles from '../Room.module.css';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Ellipsis, ImageMinus, VideoOff, Mic, MicOff, ScreenShare, ScreenShareOff, Unplug, Video, Volume2, VolumeX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { PillSpacer } from '../../ui/Spacers/PillSpacer/PillSpacer';
import { useMediaControls } from '../../../context/MediaControlsContext';
import { KeybindToolTip } from '../../ui/Titles/KeybindToolTip/KeybindToolTip';

export const RoomOverlay = () => {

    const {serverID} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {isWebcamOn, isMicrophoneMuted, isAudioMuted, isScreenSharing, handleToggleAudio, handleToggleMicrophone, handleToggleWebCam, webcamError, microphoneError } = useMediaControls();

    const {keybinds} = useSelector(state => state.keybindsSlice);
    
    const handleDisconnect = () => {
        navigate(`/dashboard/server/${serverID}`)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.topButtons}>
                <IconButton 
                title={"Hide Non Video Users"}
                Icon={<VideoOff color='var(--text-color)' />}
                position='bottom'
                />
                <IconButton
                title={"Hide Channel Background"}
                Icon={<ImageMinus color='var(--text-color)' />}
                position='bottom'
                />
                <IconButton
                title={"Room Options"}
                Icon={<Ellipsis color="var(--text-color)" />}
                position='bottom' />
            </div>
            <div className={styles.bottomButtons}>
                    <IconButton 
                    padding={15}
                    borderRadius={"50%"}
                    width={50}
                    height={50}
                    onClick={handleToggleMicrophone}
                    position='top'
                    Icon={
                    isMicrophoneMuted ?
                    <MicOff color='var(--text-color)' />
                    :
                    <Mic color='var(--text-color)' />
                    }
                    title={<KeybindToolTip 
                        label={`${isMicrophoneMuted ? 'Un-Mute' : 'Mute'}`}
                        binds={[keybinds['muteMicrophone']?.key]}
                        />}
                    />
                    <IconButton 
                    padding={15}
                    width={50}
                    height={50}
                    borderRadius={"50%"}
                    onClick={handleToggleAudio}
                    position='top' title={
                        <KeybindToolTip 
                        label={`${isAudioMuted ? 'Un-Deafen' : 'Deafen'}`}
                        binds={[keybinds['deafen']?.key]}
                        />
                    } Icon={
                    isAudioMuted ?
                    <VolumeX color='var(--text-color)' />
                    :
                    <Volume2 color='var(--text-color)' />
                    } />
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
    )
}
