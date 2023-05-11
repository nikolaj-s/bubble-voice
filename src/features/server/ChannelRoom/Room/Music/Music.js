import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { throwServerError } from '../../../ServerSlice';
import { selectLoadingMusicState, selectMusicExpanded, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, throwMusicError, toggleLoadingMusic, toggleMusicExpanded, updateMusicVolume,} from './MusicSlice';
import YouTube from 'react-youtube'
import {  selectPrimaryColor, selectSecondaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./Music.css";
import { MusicOverlayButton } from '../../../../../components/buttons/MusicOverlayButton/MusicOverlayButton';
import { PlayButton } from '../../../../../components/buttons/PlayButton/PlayButton';
import { PauseButton } from '../../../../../components/buttons/PauseButton/PauseButton';
import { SkipButton } from '../../../../../components/buttons/SkipButton/SkipButton';
import { AudioToggleButton } from '../../../../../components/buttons/mediaButtons/audioToggleButton/AudioToggleButton';

import { socket } from '../../../ServerBar/ServerBar';
import { Range } from '../../../../../components/inputs/Range/Range';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { ExpandButton } from '../../../../../components/buttons/ExpandButton/ExpandButton';
import { selectDisableMediaWidget } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectCurrentDynamicVoice, selectDynamicVoiceAlerts, selectSoundEffectVolume, selectVoicePitch, selectVoiceRate } from '../../../../settings/soundEffects/soundEffectsSlice';
import { PlaceBehindButton } from '../../../../../components/buttons/PlaceBehindButton/PlaceBehindButton';

export const Music = () => {

    // handling of music

    const [player, setPlayer] = React.useState(null);

    const [offset, setOffset] = React.useState([0, 0]);

    const [left, setLeft] = React.useState(null);

    const [top, setTop] = React.useState(null);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const [behind, toggleBehind] = React.useState(false);

    const dispatch = useDispatch();

    const [currentlyPlaying, setCurrentlyPlaying] = React.useState("");

    const [visible, toggleVisible] = React.useState(false);

    const expanded = useSelector(selectMusicExpanded);

    const loading = useSelector(selectLoadingMusicState);

    const [muted, toggleMuted] = React.useState(false);

    const [volumeControls, toggleVolumeControls] = React.useState(false);

    const disableMediaWidget = useSelector(selectDisableMediaWidget);

    const musicQueue = useSelector(selectMusicQueue);

    const musicPlaying = useSelector(selectMusicPlayingState);

    const volume = useSelector(selectMusicVolume);

    const soundEffectsVolume = useSelector(selectSoundEffectVolume)

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const dynamicVoiceAlerts = useSelector(selectDynamicVoiceAlerts);

    const currentVoice = useSelector(selectCurrentDynamicVoice);

    const voiceRate = useSelector(selectVoiceRate);

    const voicePitch = useSelector(selectVoicePitch);

    React.useEffect(() => {
        try {
            if (player) {
                
                if (!musicPlaying) {
                    player.pauseVideo();
                } else if (musicPlaying) {
                    player.playVideo();
                }
                player.setVolume(volume);

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
    }, [musicPlaying, volume, musicPlaying, musicPlaying, player])

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

    const handleTogglePlaying = async () => {
        
        if (loading) return;

        if (!currentlyPlaying && musicPlaying) return;

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

    const handleMute = () => {
        if (!muted) {
            toggleMuted(true);
            player.mute();
        } else {
            toggleMuted(false);
            player.unMute();
        }
    }

    const handleOnReady = (event) => {
        setPlayer(event.target);
    }

    const handleToggleVolumeControls = (bool) => {
        toggleVolumeControls(bool)
    }

    const handleVolumeChange = (value) => {
        dispatch(updateMusicVolume(value));
    }


    const handleExpansion = () => {
       dispatch(toggleMusicExpanded(!expanded));
    }

    const onMouseDown = (e) => {

        toggleMouseDown(true);

        const el = document.getElementById("music-player-component");

        setOffset([el.offsetLeft - e.clientX, el.offsetTop - e.clientY])
    }

    const adjustPosition = (e) => {
        const el = document.getElementById("music-player-component");

        if (!el) return;

        if (window.innerWidth - 70 < el.offsetLeft) {
            setLeft(window.innerWidth - 70)
        }

        if (top + 540 > window.innerHeight) {
            setTop(window.innerHeight - 540)
        }

    }
    const onMouseUp = () => {
        toggleMouseDown(false);
    }

    const onMouseMove = (e) => {

        if (mouseDown === true) {
            
            if (e.clientX + offset[0] > 0 && (e.clientX + offset[0]) < window.innerWidth - 60) {
                setLeft((e.clientX + offset[0]))
            } 
            if ((e.clientY + offset[1]) > -120 && (e.clientY + offset[1]) + 460 < window.innerHeight) {
                setTop((e.clientY + offset[1]))
            }
            
        }
    }

    React.useEffect(() => {
        window.addEventListener('resize', adjustPosition);

        return () => {
            window.removeEventListener('resize', adjustPosition);
        }
    }, [])

    const handleToggleBehind = () => {
        toggleBehind(!behind)
    }

    return (
        <>
        {(currentlyPlaying && disableMediaWidget === false) ?
        <>
        
        <div 
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        style={{
            width: (expanded||behind) ? 'calc(100%)' : visible ? 600 : 55,
            height: behind ? 'calc(100% - 30px)' : expanded ? "100%" : 300,
            right: 5,
            left: behind ? 50 : expanded ? '50%' : left,
            top: behind ? 30 : expanded ? 0 : top,
            transform: behind ? null : expanded ? 'translate(-50%, 0%)' : 'translate(0%, 50%)',
            boxShadow: expanded ? '5px 5px 60px rgba(0, 0, 0, 0.8)' : null,
            borderRadius: '10px',
            position: behind ? 'fixed' : expanded ? 'absolute' : 'fixed',
            zIndex: behind ? 0 : 10
        }}
        id={'music-player-component'}
        className='music-player-overlay-wrapper'>
            <div 
            style={{display: (expanded||behind) ? 'none' : 'flex',
            backgroundColor: primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderTopRightRadius: visible ? 0 : 10, borderBottomRightRadius: visible ? 0 : 10,
           
            }}
            className='music-player-overlay-controls'>
                <MusicOverlayButton playing={musicPlaying} description={visible ? 'Hide' : 'Show'} action={toggleVisibility} width={20} height={20} />
                <SkipButton action={handleSkip} width={20} height={20} />
                {!musicPlaying ? <PlayButton action={handleTogglePlaying} width={20} height={20}  /> : <PauseButton action={handleTogglePlaying} width={20} height={20} />}
                
                <AudioToggleButton width={20} height={20} o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} description={muted ? 'Un Mute' : 'Mute'} action={handleMute} state={!muted} />
                <PlaceBehindButton action={handleToggleBehind} description={"Place Behind"} width={20} height={20} />
                {volumeControls ?
                <div style={{right: visible ? 248 : 35}} onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
                    <div style={{backgroundColor: primaryColor}} >
                        <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
                    </div> 
                </div>
                : null}
            </div>
            <div
            
            
            style={{
            borderRadius: expanded ? '10px' : null, maxWidth: visible ? '100%' : 0, transition: '0.2s', cursor: expanded ? 'default' : 'grab'}} className='youtube-player-wrapper' id="youtube-media-container">
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
                        borderBottomRightRadius: 15,
                        width: '100%',
                        height: '100%'
                    }} />
                    <div className='youtube-disable-clicking'>
                        <ExpandButton width={20} height={20} action={handleExpansion} description={"Expand"} />
                    </div>
                    
            </div>
            <Loading loading={loading} />
        </div>
        {behind ? 
        <div 
        style={{
        backgroundColor: primaryColor,
        }}
        className='behind-music-player-overlay-controls'>
            <MusicOverlayButton playing={musicPlaying} description={visible ? 'Hide' : 'Show'} action={toggleVisibility} width={20} height={20} />
            <SkipButton action={handleSkip} width={20} height={20} />
            {!musicPlaying ? <PlayButton action={handleTogglePlaying} width={20} height={20}  /> : <PauseButton action={handleTogglePlaying} width={20} height={20} />}
            
            <AudioToggleButton width={20} height={20} o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} description={muted ? 'Un Mute' : 'Mute'} action={handleMute} state={!muted} />
            <PlaceBehindButton action={handleToggleBehind} active={true} description={"Pop Out"} width={20} height={20} />
            {volumeControls ?
            <div style={{right: visible ? 248 : 35}} onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
                <div style={{backgroundColor: primaryColor}} >
                    <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
                </div> 
            </div>
            : null}
        </div>
        : null}
        </>
        : null}
       
        </>
    )
}
