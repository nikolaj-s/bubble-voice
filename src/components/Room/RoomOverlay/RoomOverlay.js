
import React from 'react';

import styles from '../Room.module.css';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Ellipsis, ImageMinus, VideoOff, Mic, MicOff, Unplug, Video, Volume2, VolumeX, ImagePlus, HeadphoneOff, Headphones } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { PillSpacer } from '../../ui/Spacers/PillSpacer/PillSpacer';
import { useMediaControls } from '../../../context/MediaControlsContext';
import { KeybindToolTip } from '../../ui/Titles/KeybindToolTip/KeybindToolTip';
import { MediaPlayerControls } from './MediaPlayerControls/MediaPlayerControls';
import { toggleAppearanceSetting } from '../../../features/Settings/Appearance/appearanceSlice';
import { toggleVoiceChannelOptions } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';
import { MediaPlayerInlineControls } from './MediaPlayerInlineControls/MediaPlayerInlineControls';

export const RoomOverlay = () => {

    const {serverID} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {isWebcamOn, isMicrophoneMuted, isAudioMuted, isScreenSharing, handleToggleAudio, handleToggleMicrophone, handleToggleWebcam, webcamError, microphoneError } = useMediaControls();

    const {keybinds} = useSelector(state => state.keybindsSlice);

    const {hideChannelBackgrounds} = useSelector(state => state.appearanceSlice);

    const {hideNonVideoUsers} = useSelector(state => state.voiceChannelSlice);
    
    const handleDisconnect = () => {
        navigate(`/dashboard/server/${serverID}`)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.topButtons}>
                <IconButton 
                title={`${hideNonVideoUsers ? 'Show' : 'Hide'} non video users`}
                Icon={<VideoOff color='var(--text-color)' />}
                position='bottom'
                backgroundColor={hideNonVideoUsers ? 'var(--success-color)': null}
                onClick={() => {dispatch(toggleVoiceChannelOptions('hideNonVideoUsers'))}}
                />
                <IconButton
                title={hideChannelBackgrounds ? "Show Channel Background" : "Hide Channel Background"}
                Icon={hideChannelBackgrounds ? <ImagePlus color='var(--text-color)' /> : <ImageMinus color='var(--text-color)' />}
                position='bottom'
                onClick={() => {dispatch(toggleAppearanceSetting('hideChannelBackgrounds'))}}
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
                        label={`${isMicrophoneMuted ? 'Unmute' : 'Mute'}`}
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
                        label={`${isAudioMuted ? 'Undeafen' : 'Deafen'}`}
                        binds={[keybinds['deafen']?.key]}
                        />
                    } Icon={
                    isAudioMuted ?
                    <HeadphoneOff color='var(--text-color)' />
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
                        <KeybindToolTip 
                        label={`${isWebcamOn ? 'Turn off camera'.replace(/(\\s{2,})/g, '$1\u200B') : 'Turn on camera'.replace(/(\\s{2,})/g, '$1\u200B')}`}
                        binds={[keybinds['enableWebcam']?.key]}
                        />
                    } Icon={
                    isWebcamOn || webcamError ?
                    <VideoOff color={'var(--text-color)'} />
                    :
                    <Video color='var(--text-color)' />
                    } 
                    backgroundColor={isWebcamOn ? 'var(--success-color)' : 'var(--background-color)'}
                    />
                    <MediaPlayerControls />
                    <MediaPlayerInlineControls />
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
