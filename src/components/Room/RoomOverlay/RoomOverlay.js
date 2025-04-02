
import React from 'react';

import styles from '../Room.module.css';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Ellipsis, ImageMinus, VideoOff, Mic, MicOff, ScreenShare, ScreenShareOff, Unplug, Video, Volume2, VolumeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { PillSpacer } from '../../ui/Spacers/PillSpacer/PillSpacer';
import { useMediaControls } from '../../../context/MediaControlsContext';

export const RoomOverlay = () => {

    const {serverID} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {isWebcamOn, isMicrophoneMuted, isAudioMuted, isScreenSharing, handleToggleAudio, handleToggleMicrophone, handleToggleWebCam } = useMediaControls();
    
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
                    <PillSpacer verticle={true} />
                    <IconButton 
                    onClick={handleDisconnect}
                    
                    title={"Disconnect"}
                    backgroundColor='var(--error-color)'
                    Icon={<Unplug color='var(--text-color)' />}
                    />
            </div>
        </div>
    )
}
