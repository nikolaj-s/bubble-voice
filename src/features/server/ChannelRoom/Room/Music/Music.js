import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentChannel, selectUsersPermissions, throwServerError } from '../../../ServerSlice';
import { selectBehindState, selectLoadingMusicState, selectMusicExpanded, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, selectMuteState, throwMusicError, toggleBehind, toggleLoadingMusic, toggleMusicExpanded, updateMusicVolume,} from './MusicSlice';
import YouTube from 'react-youtube'
import {  selectAccentColor, selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./Music.css";

import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';

import { selectDisableMediaWidget } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectCurrentDynamicVoice, selectDynamicVoiceAlerts, selectSoundEffectVolume, selectVoicePitch, selectVoiceRate } from '../../../../settings/soundEffects/soundEffectsSlice';

import { selectCurrentScreen } from '../../../../controlBar/ControlBarSlice';
import { selectExperimentalAudioCapture } from '../../../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
;

export const Music = () => {

    // handling of music
    let margin = 0;

    const ratio = (9/16);

    const [player, setPlayer] = React.useState(null);

    const [offset, setOffset] = React.useState([0, 0]);

    const [left, setLeft] = React.useState(null);

    const [top, setTop] = React.useState(null);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const [behindHeight, setBehindHeight] = React.useState(0)

    const behind = useSelector(selectBehindState);

    const glassColor = useSelector(selectGlassColor);

    const dispatch = useDispatch();

    const [currentlyPlaying, setCurrentlyPlaying] = React.useState("");

    const [visible, toggleVisible] = React.useState(false);

    const expanded = useSelector(selectMusicExpanded);

    const loading = useSelector(selectLoadingMusicState);

    const muted = useSelector(selectMuteState);


    const [color, setColor] = React.useState("");

    const disableMediaWidget = useSelector(selectDisableMediaWidget);

    const musicQueue = useSelector(selectMusicQueue);

    const musicPlaying = useSelector(selectMusicPlayingState);

    const volume = useSelector(selectMusicVolume);

    const soundEffectsVolume = useSelector(selectSoundEffectVolume)

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const dynamicVoiceAlerts = useSelector(selectDynamicVoiceAlerts);

    const currentVoice = useSelector(selectCurrentDynamicVoice);

    const voiceRate = useSelector(selectVoiceRate);

    const voicePitch = useSelector(selectVoicePitch);

    const sharingScreen = useSelector(selectCurrentScreen);

    const experimentalAudioCapture = useSelector(selectExperimentalAudioCapture);

    const textColor = useSelector(selectTextColor);

    const channel = useSelector(selectCurrentChannel);

    const permissions = useSelector(selectUsersPermissions);

    const username = useSelector(selectUsername);

    React.useEffect(() => {
        try {



            if (player) {
                
                if (!musicPlaying) {
                    player.pauseVideo();
                } else if (musicPlaying) {
                    player.playVideo();
                }
                player.setVolume(volume);

                if (sharingScreen && experimentalAudioCapture) {
                    player.mute();
                    return;
                }

                if (muted || volume < 1) {
                    player.mute();
                } else if (!muted) {
                    player.unMute();
                }
            }
            
        } catch (error) {
            console.log(error)
            return;
        }
        
    // eslint-disable-next-line
    }, [musicPlaying, volume, musicPlaying, musicPlaying, player, sharingScreen, experimentalAudioCapture, currentlyPlaying])


    React.useEffect(() => {

        try {

            if (player) {

                setTimeout(() => {
                    if (Number(volume) < 1) {
                        player.mute();
                    } else {
                        player.unMute();
                    }
                }, 10)
                
            }

        } catch (err) {
            return;
        }

    }, [player, musicQueue, volume, currentlyPlaying])

    React.useEffect(() => {

        try {
            if (player) {

                if (muted) {
                    player.mute();
                } else {
                    player.unMute();
                }
            }
        } catch(err) {
            return;
        }
            

    }, [player, muted])

    React.useEffect(() => {

        if (musicQueue[0]?.id !== currentlyPlaying) {

            setCurrentlyPlaying(musicQueue[0]?.id);

            if (musicQueue[0]?.title && dynamicVoiceAlerts) {
                let alert = new SpeechSynthesisUtterance("Now playing " + musicQueue[0]?.title);

                let voices = speechSynthesis.getVoices();

                alert.voice = voices[currentVoice];

                alert.volume = soundEffectsVolume;
                
                alert.pitch = voicePitch;

                alert.rate = voiceRate;

                window.speechSynthesis.speak(alert);
            }
           

        }    

        if (musicQueue.length === 0) {
            dispatch(toggleMusicExpanded(false));
            dispatch(toggleBehind(false))
        }
    // eslint-disable-next-line    
    }, [musicQueue])

    const toggleVisibility = () => {
        if (visible) {
            dispatch(toggleMusicExpanded(false));
        }

        if (visible === false) {
            if (window.innerWidth - left < 650) {
                setLeft(window.innerWidth - 650)
            }
        }

        toggleVisible(!visible);
    }

    

    

   

    const handleOnReady = (event) => {
        console.log('loaded')
        setPlayer(event.target);
    }

    return (
        <>
        
        <div 
        style={{
            display: disableMediaWidget ? 'none' : (currentlyPlaying) ? 'flex' : 'none',
            border: `solid 4px black`,
            backgroundColor: 'black'

        }}
        id={'room-media-player-component'}
        className='active-user-container'>
            
            <div
            
            
            style={{transition: '0.2s'}} className='youtube-player-wrapper' id="youtube-media-container">
                <YouTube 
                
                onReady={handleOnReady}
                id={'room-music-player'}
                videoId={currentlyPlaying}  opts={{
                    
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        fs: 0,
                        autoplay: 1,
                        enablejsapi: 1,
                        start: musicQueue[0]?.current ? musicQueue[0].current : 0,
                        controls: 0,
                        modestbranding: 1,
                        disablekb: 1
                    }}} style={{
                        width: '100%',
                        height: '100%'
                    }} />
                    <div className='youtube-disable-clicking'>
                        <div className='song-title-container'>
                            <p style={{color: textColor}}>{musicQueue[0]?.title}</p>
                            <p style={{color: textColor, fontSize: '0.7rem', opacity: 0.7}}>Added By: {musicQueue[0]?.added_by}</p>
                        </div>
                    </div>
                    
            </div>
            <Loading zIndex={1} loading={loading} />
           
        </div>
      
        </>
    )
}
