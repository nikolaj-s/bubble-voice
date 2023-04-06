import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentChannelId, throwServerError } from '../../../ServerSlice';
import {handleAddingMedia, selectLoadingMusicState, selectMusicExpanded, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, throwMusicError, toggleLoadingMusic, toggleMusicExpanded, updateMusicVolume,} from './MusicSlice';
import YouTube from 'react-youtube'
import { selectPrimaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./Music.css";
import { MusicOverlayButton } from '../../../../../components/buttons/MusicOverlayButton/MusicOverlayButton';
import { PlayButton } from '../../../../../components/buttons/PlayButton/PlayButton';
import { PauseButton } from '../../../../../components/buttons/PauseButton/PauseButton';
import { SkipButton } from '../../../../../components/buttons/SkipButton/SkipButton';
import { AudioToggleButton } from '../../../../../components/buttons/mediaButtons/audioToggleButton/AudioToggleButton';

import { socket } from '../../../ServerBar/ServerBar';
import { Range } from '../../../../../components/inputs/Range/Range';
import { AddButton } from '../../../../../components/buttons/AddButton/AddButton';
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { ExpandButton } from '../../../../../components/buttons/ExpandButton/ExpandButton';

export const Music = () => {

    // handling of music

    const [player, setPlayer] = React.useState(null)

    const dispatch = useDispatch();

    const [currentlyPlaying, setCurrentlyPlaying] = React.useState("");

    const [visible, toggleVisible] = React.useState(false);

    const expanded = useSelector(selectMusicExpanded);

    const loading = useSelector(selectLoadingMusicState);

    const [muted, toggleMuted] = React.useState(false);

    const [volumeControls, toggleVolumeControls] = React.useState(false);

    const [searchInput, setSearchInput] = React.useState("");

    const [showSearchInput, toggleShowSearchInput] = React.useState("");

    const musicQueue = useSelector(selectMusicQueue);

    const musicPlaying = useSelector(selectMusicPlayingState);

    const volume = useSelector(selectMusicVolume);

    const channelId = useSelector(selectCurrentChannelId);

    const primaryColor = useSelector(selectPrimaryColor);

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

        if (musicQueue[0]?.url !== currentlyPlaying) {

            setCurrentlyPlaying(musicQueue[0]?.id);

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

    const handleShowSearch = (bool) => {

        toggleShowSearchInput(bool);

        setTimeout(() => {
            if (bool) document.getElementById('music-overlay-input').focus();
        }, 100)
        
    }

    const handleSearchInput = (value) => {

        if (value.length > 216) return;

        setSearchInput(value);
    }

    const handleAddSongToQueue = async () => {
        if (searchInput.length === 0) return;

        if (musicQueue.length >= 10) return;

        if (loading) return;

        dispatch(handleAddingMedia(searchInput));
    }

    const handleEnter = (value) => {
        if (loading) return;

        if (value === 13) return handleAddSongToQueue();
    }

    const handleExpansion = () => {
       dispatch(toggleMusicExpanded(!expanded));
    }


    return (
        <>
        {currentlyPlaying ?
        <>
        {volumeControls ?
        <div style={{right: visible ? 248 : 35}} onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
            <div style={{backgroundColor: primaryColor}} >
                <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
            </div> 
        </div>
        : null}
        {showSearchInput ?
        <div 
        style={{right: visible ? 125 : 45}}
        onMouseLeave={() => {handleShowSearch(false)}} onMouseEnter={() => {handleShowSearch(true)}} className='music-overlay-search-container'>
            <TextInput keyCode={handleEnter} id="music-overlay-input" placeholder={"Search"} inputValue={searchInput} action={handleSearchInput} />
        </div>
        : null}
        <div
        style={{
            width: expanded ? 'calc(100%)' : visible ? 455 : 55,
            height: expanded ? "100%" : 270,
            right: 5,
            left: expanded ? '50%' : null,
            transform: expanded ? 'translate(-50%, 50%)' : 'translate(0%, 50%)',
            boxShadow: expanded ? '5px 5px 60px rgba(0, 0, 0, 0.8)' : null,
            borderRadius: '10px'
        }}
        className='music-player-overlay-wrapper'>
            <div 
            style={{display: expanded ? 'none' : 'flex',
            backgroundColor: primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderTopRightRadius: visible ? 0 : 10, borderBottomRightRadius: visible ? 0 : 10}}
            className='music-player-overlay-controls'>
                <MusicOverlayButton playing={musicPlaying} description={visible ? 'Hide' : 'Show'} action={toggleVisibility} width={20} height={20} />
                <SkipButton action={handleSkip} width={20} height={20} />
                {!musicPlaying ? <PlayButton action={handleTogglePlaying} width={20} height={20}  /> : <PauseButton action={handleTogglePlaying} width={20} height={20} />}
                <AddButton altHeight={15} altWidth={15} action={handleAddSongToQueue} o_mouseEnter={() => {handleShowSearch(true)}} o_mouseLeave={() => {handleShowSearch(false)}} width={20} height={20} description="Add Song" />
                <AudioToggleButton width={20} height={20} o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} description={muted ? 'Un Mute' : 'Mute'} action={handleMute} state={!muted} />
            </div>
            <div style={{
            borderRadius: expanded ? '10px' : null, maxWidth: visible ? '100%' : 0, transition: '0.2s'}} className='youtube-player-wrapper' id="youtube-media-container">
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
                        modestbranding: 1
                    }}} style={{
                        borderBottomRightRadius: 15,
                        width: '100%',
                        height: '100%'
                    }} />
                    <div className='youtube-disable-clicking'>
                        <ExpandButton action={handleExpansion} description={"Expand"} />
                    </div>
                    
            </div>
            <Loading loading={loading} />
        </div>
        </>    
        : null}
        </>
    )
}
