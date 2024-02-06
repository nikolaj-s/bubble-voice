import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { MusicOverlayButton } from '../../../../../components/buttons/MusicOverlayButton/MusicOverlayButton';
import { selectLoadingMusicState, selectMediaColor, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, selectMuteState, selectTime, setMediaColor, toggleLoadingMusic, toggleMuted, updateMusicVolume } from './MusicSlice';
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
import { ImageButton } from '../../../../../components/buttons/ImageButton/ImageButton';

export const MediaControls = ({hover}) => {

    const dispatch = useDispatch();

    const [volumeControls, toggleVolumeControls] = React.useState(false);

    const [showMediaWidget, toggleShowMediaWidget] = React.useState(false);

    const muted = useSelector(selectMuteState);

    const textColor = useSelector(selectTextColor);

    const time = useSelector(selectTime);

    const hideVideo = useSelector(selectDisableMediaWidget);

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);
    
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
        {hover ? <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        key={'media-room-controls'}
        transition={{duration: 0.1}}
       
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
                <MusicWidget roomOverlay={true} controls={false} />
            </motion.div>
            : null}
            <div
            style={{backgroundColor: primaryColor}}
            className='media-player-inner-controls-wrapper'>
                {musicQueue.length === 0 ? null : <ImageButton borderRadius={10} description={hideVideo ? "Show Video" : "Hide Video"} desc_space={14} width={32} height={32} image={musicQueue[0]?.thumbnail} action={toggleHideVideo} padding={4} />}
                <MusicOverlayButton borderRadius={10} description={showMediaWidget ? 'Hide Media Widget' : "Show Media Widget"} action={() => {toggleShowMediaWidget(!showMediaWidget)}} playing={(musicPlaying && musicQueue.length > 0)} width={20} height={20} />

                {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel?.channel_owner === username || permissions?.server_group_name === 'Owner' || !channel?.locked_media ? !musicPlaying ? <PlayButton borderRadius={10} action={handleTogglePlaying} width={20} height={20}  /> : <PauseButton borderRadius={10} action={handleTogglePlaying} width={20} height={20} /> : <LockedIcon width={30} height={85} padding={5} i_height={25} i_width={25}  />}
                {(channel?.locked_media && channel?.media_auth?.includes(username)) || channel?.channel_owner === username || permissions?.server_group_name === 'Owner' || !channel?.locked_media ? <SkipButton borderRadius={10} action={handleSkip} width={20} height={20} /> : null}
                <AudioToggleButton borderRadius={10} opacity={0.2} active={experimentalAudioCapture && sharingScreen} description={muted ? 'UnMute' : "Mute"} width={20} height={20} o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} action={handleMute} state={!muted} />
                <div onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
                    <div >
                        <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
                    </div>
                </div>
                <div 
                style={{backgroundColor: secondaryColor}}
                className='media-player-progress-bar'>
                    <div style={{borderRadius: 5, height: 5, width: `${(time / (musicQueue[0]?.duration + 11)) * 100}%`,
                    backgroundColor: textColor
                    }} />
                </div>
            </div>
        </motion.div>
        : null}
        </>
    )
}
