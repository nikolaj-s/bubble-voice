import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPrimaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { MusicOverlayButton } from '../../../../../components/buttons/MusicOverlayButton/MusicOverlayButton';
import { selectLoadingMusicState, selectMediaColor, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, selectMuteState, setMediaColor, toggleLoadingMusic, toggleMuted, updateMusicVolume } from './MusicSlice';
import { selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { selectCurrentChannel, selectMusicSavedState, selectUsersPermissions, throwServerError } from '../../../ServerSlice';
import { SkipButton } from '../../../../../components/buttons/SkipButton/SkipButton';

import { socket } from '../../../ServerBar/ServerBar';
import { PlayButton } from '../../../../../components/buttons/PlayButton/PlayButton';
import { PauseButton } from '../../../../../components/buttons/PauseButton/PauseButton';
import { LockedIcon } from '../../../../../components/Icons/LockedIcon/LockedIcon';
import { AudioToggleButton } from '../../../../../components/buttons/mediaButtons/audioToggleButton/AudioToggleButton';
import { selectExperimentalAudioCapture } from '../../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { selectCurrentScreen } from '../../../../controlBar/ControlBarSlice';
import { Range } from '../../../../../components/inputs/Range/Range';
import { MusicWidget } from '../../../../../components/widgets/Widgets/MusicWIdget/MusicWIdget';

import { motion } from 'framer-motion'
import { Image } from '../../../../../components/Image/Image';
import { GetImageColorData } from '../../../../../util/GetImageColorData';
import { miscSettingsChannelSpecificStateChange, selectDisableMediaWidget } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const MediaControls = ({hover}) => {

    const dispatch = useDispatch();

    const [volumeControls, toggleVolumeControls] = React.useState(false);

    const [showMediaWidget, toggleShowMediaWidget] = React.useState(false);

    const muted = useSelector(selectMuteState);

    const savedMusicState = useSelector(selectMusicSavedState);

    const mediaColor = useSelector(selectMediaColor);

    const hideVideo = useSelector(selectDisableMediaWidget);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const musicPlaying = useSelector(selectMusicPlayingState)

    const username = useSelector(selectUsername);

    const channel = useSelector(selectCurrentChannel);

    const permissions = useSelector(selectUsersPermissions);

    const musicQueue = useSelector(selectMusicQueue);

    const loading = useSelector(selectLoadingMusicState);

    const experimentalAudioCapture = useSelector(selectExperimentalAudioCapture);

    const sharingScreen = useSelector(selectCurrentScreen);

    const volume = useSelector(selectMusicVolume);

    const handleSkip = async () => {
        if (musicQueue.length === 0) return;

        if (loading) return;

        dispatch(toggleLoadingMusic(true));

        await socket.request('skip song')
        .catch(error => {
            
            dispatch(throwServerError({errorMessage: error}))
        
        })

        dispatch(toggleLoadingMusic(false));
    }

    const handleTogglePlaying = async () => {
        
        if (loading) return;

        if(musicQueue.length === 0) return;

        dispatch(toggleLoadingMusic(true));

        await socket.request('toggle playing music', {playing: !musicPlaying})
        .catch(error => {

            dispatch(throwServerError({errorMessage: error}));;

            return;
            
        }).then(() => {
            
            return;
        })
        
        dispatch(toggleLoadingMusic(false));

    }

    
    const handleToggleVolumeControls = (bool) => {
        if (experimentalAudioCapture && sharingScreen) return;
        toggleVolumeControls(bool)
    }

    const handleMute = () => {
        if (experimentalAudioCapture && sharingScreen) return;
        
        dispatch(toggleMuted());
    }

    const handleVolumeChange = (value) => {
        dispatch(updateMusicVolume(value));
    }

    const toggleHideVideo = () => {
        dispatch(miscSettingsChannelSpecificStateChange('disableMediaWidget'))
    }

    return (
        <>
        {hover && musicQueue.length > 0 ? <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        key={'media-room-controls'}
        transition={{duration: 0.1}}
        style={{
        backgroundColor: primaryColor,
        }}
        className='behind-music-player-overlay-controls'>
            {showMediaWidget ?
            <motion.div
            initial={{
                height: '0px'
            }}
            animate={{
                height: '100%'
            }}

            className='media-widget-room-wrapper'
            >
                <MusicWidget controls={false} />
            </motion.div>
            : null}
            <div className='media-player-inner-controls-wrapper'>
                <div onClick={toggleHideVideo} className='media-player-thumbnail'>
                    <Image cursor='pointer' image={musicQueue[0]?.thumbnail} />
                </div>
                <MusicOverlayButton description={showMediaWidget ? 'Hide Media Widget' : "Show Media Widget"} action={() => {toggleShowMediaWidget(!showMediaWidget)}} playing={(musicPlaying && musicQueue.length > 0)} width={20} height={20} />

                {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel?.channel_owner === username || permissions?.server_group_name === 'Owner' || !channel?.locked_media ? !musicPlaying ? <PlayButton action={handleTogglePlaying} width={20} height={20}  /> : <PauseButton action={handleTogglePlaying} width={20} height={20} /> : <LockedIcon width={30} height={85} padding={5} i_height={25} i_width={25}  />}
                {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel?.channel_owner === username || permissions?.server_group_name === 'Owner' || !channel?.locked_media ? <SkipButton action={handleSkip} width={20} height={20} /> : null}
                <AudioToggleButton opacity={0.2} active={experimentalAudioCapture && sharingScreen} description={muted ? 'UnMute' : "Mute"} width={20} height={20} o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} action={handleMute} state={!muted} />

                {volumeControls ?<div onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
                    <div style={{backgroundColor: primaryColor}} >
                        <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
                    </div> 
                </div> : null}
            </div>
        </motion.div>
        : null}
        </>
    )
}
