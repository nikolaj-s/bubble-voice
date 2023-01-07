import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentChannelId, throwServerError } from '../../../ServerSlice';
import {selectMusicPlayingState, selectMusicQueue, selectMusicVolume, throwMusicError, updateMusicVolume,} from './MusicSlice';
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

export const Music = () => {

    // handling of music

    const [player, setPlayer] = React.useState(null)

    const dispatch = useDispatch();

    const [currentlyPlaying, setCurrentlyPlaying] = React.useState("");

    const [visible, toggleVisible] = React.useState(false);

    const [loading, toggleLoading] = React.useState(false);

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
    // eslint-disable-next-line    
    }, [musicQueue])

    const toggleVisibility = () => {
        toggleVisible(!visible);
    }

    const handleTogglePlaying = async () => {
        
        if (loading) return;
        console.log('toggle playuig')
        if (!currentlyPlaying && musicPlaying) return;

        toggleLoading(true);

        await socket.request('toggle playing music', {playing: !musicPlaying})
        .catch(error => {

            dispatch(throwServerError({errorMessage: error}));;

            return toggleLoading(false)
            
        }).then(() => {
            
            return toggleLoading(false)
        })
        
        toggleLoading(false);

    }

    const handleSkip = async () => {
        if (musicQueue.length === 0) return;

        if (loading) return;

        toggleLoading(true);

        await socket.request('skip song')
        .catch(error => {
            
            dispatch(throwServerError({errorMessage: error}))
        
        })

        toggleLoading(false);
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

        toggleLoading(true);

        await socket.request('add song to queue', {query: searchInput})
        .then(response => {

            setSearchInput("")
        
        })
        .catch(error => {
            console.log(error);
            dispatch(throwServerError({error: true, errorMessage: error}))
        })


        toggleLoading(false);
    }

    const handleEnter = (value) => {
        if (loading) return;

        if (value === 13) return handleAddSongToQueue();
    }

    return (
        <>
        {currentlyPlaying ?
        <>
        {volumeControls ?
        <div style={{right: visible ? 238 : 35}} onMouseLeave={() => {handleToggleVolumeControls(false)}} onMouseEnter={() => {handleToggleVolumeControls(true)}} className='music-overlay-volume-container' >
            <div style={{backgroundColor: primaryColor}} >
                <Range action={handleVolumeChange} min={0} max={100} value={volume} step={0.01} />
            </div> 
        </div>
        : null}
        {showSearchInput ?
        <div 
        style={{right: visible ? 120 : 45}}
        onMouseLeave={() => {handleShowSearch(false)}} onMouseEnter={() => {handleShowSearch(true)}} className='music-overlay-search-container'>
            <TextInput keyCode={handleEnter} id="music-overlay-input" placeholder={"Search"} inputValue={searchInput} action={handleSearchInput} />
        </div>
        : null}
        <div
        style={{
            right: visible ? 0 : '-395px',
            backgroundColor: primaryColor
        }}
        className='music-player-overlay-wrapper'>
            <div 
            style={{}}
            className='music-player-overlay-controls'>
                <MusicOverlayButton playing={musicPlaying} description={visible ? 'Hide' : 'Show'} action={toggleVisibility} width={25} height={25} />
                <SkipButton action={handleSkip} width={25} height={25} />
                {!musicPlaying ? <PlayButton action={handleTogglePlaying} width={25} height={25}  /> : <PauseButton action={handleTogglePlaying} width={25} height={25} />}
                <AddButton altHeight={20} altWidth={20} action={handleAddSongToQueue} o_mouseEnter={() => {handleShowSearch(true)}} o_mouseLeave={() => {handleShowSearch(false)}} width={25} height={25} description="Add Song" />
                <AudioToggleButton o_mouseEnter={() => {handleToggleVolumeControls(true)}} o_mouseLeave={() => {handleToggleVolumeControls(false)}} description={muted ? 'Un Mute' : 'Mute'} action={handleMute} state={!muted} />
            </div>
            <div className='youtube-player-wrapper'>
                <YouTube 
                onReady={handleOnReady}
                id={'room-music-player'}
                videoId={currentlyPlaying}  opts={{
                    
                    height: '100%',
                    width: '400',
                    playerVars: {
                        fs: 0,
                        autoplay: 1,
                        enablejsapi: 1,
                        start: musicQueue[0]?.current ? musicQueue[0].current : 0,
                        controls: 0,
                        modestbranding: 1
                    }}} style={{
                        borderBottomRightRadius: 15
                    }} />
                    <div className='youtube-disable-clicking'></div>
            </div>
            <Loading loading={loading} />
        </div>
        </>    
        : null}
        </>
    )
}
