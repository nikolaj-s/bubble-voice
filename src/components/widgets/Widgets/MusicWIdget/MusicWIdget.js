// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { TextInput } from '../../../inputs/TextInput/TextInput';
import { SkipButton } from '../../../buttons/SkipButton/SkipButton';
import { Song } from './Song/Song';
import { AddButton } from '../../../buttons/AddButton/AddButton';
import { PlayButton } from '../../../buttons/PlayButton/PlayButton';
import { PauseButton } from '../../../buttons/PauseButton/PauseButton';
import { Range } from '../../../inputs/Range/Range';
import { Error } from '../../../Error/Error';

// state
import { Loading } from '../../../LoadingComponents/Loading/Loading';
import {  handleAddingMedia, like_song, selectLoadingMusicState, selectMusicError, selectMusicErrorMessage, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, throwMusicError, toggleLoadingMusic, toggleMusicPlaying, un_like_song, updateMusicVolume } from '../../../../features/server/ChannelRoom/Room/Music/MusicSlice';

// style
import "./MusicWidget.css";

// socket
import { socket } from '../../../../features/server/ServerBar/ServerBar'
import { removeSongFromWidget, saveSongToWidget, selectCurrentChannelId, selectMusicSavedState, throwServerError } from '../../../../features/server/ServerSlice';
import { selectDisableTransparancyEffects } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const MusicWidget = ({editing = false, widget}) => {

    const dispatch = useDispatch();

    const [query, setQuery] = React.useState("");

    const loading = useSelector(selectLoadingMusicState);

    const volume = useSelector(selectMusicVolume);

    const error = useSelector(selectMusicError);

    const errorMessage = useSelector(selectMusicErrorMessage);

    const queue = useSelector(selectMusicQueue);

    const playing = useSelector(selectMusicPlayingState);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const savedMusic = useSelector(selectMusicSavedState);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const handleAddSongToQueue = async () => {
        if (query.length === 0 || editing === true) return;

        if (queue.length >= 11) return dispatch(throwMusicError({error: true, errorMessage: "Song Queue Limit Has Been Reached"}));

        if (loading) return;

        dispatch(handleAddingMedia(query));
    }

    const handleAddSavedSongToQueue = async (song) => {

        if (queue.length >= 11) if (queue.length >= 11) return dispatch(throwMusicError({error: true, errorMessage: "Song Queue Limit Has Been Reached"}));
        
        if (loading || editing === true) return;

        const exists = queue.findIndex(s => s._id === song._id);

        if (exists !== -1) return dispatch(throwMusicError({error: true, errorMessage: "Song is already in the queue"}));

        dispatch(toggleLoadingMusic(true));

        await socket.request('add song to queue', {song: song})
        .then(res => {
            if (queue.length === 0) {
                dispatch(toggleMusicPlaying(true));
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(throwMusicError({error: true, errorMessage: error}))
        })

        dispatch(toggleLoadingMusic(false));
    }   

    const handlePlayPause = async () => {
        if (queue.length === 0 || editing === true) return;

        await socket.request('toggle playing music', {playing: !playing})
        .catch(error => {

            dispatch(throwMusicError({error: true, errorMessage: error}));

        })

    }

    const handleSkip = async () => {

        if (queue.length === 0 || editing === true) return;

        await socket.request('skip song')
        .catch(error => {
            console.log(error)
            dispatch(throwMusicError({error: true, errorMessage: error}))
        })
    }

    const handleInput = (value) => {
        setQuery(value)
    }

    const closeError = () => {
        dispatch(throwMusicError({error: false, errorMessage: ""}))
    }

    const handleMusicVolume = (value) => {
        
        dispatch(updateMusicVolume(value))
    
    }
    
    const handleEnter = (key) => {
        if (loading || query.length === 0) return;

        if (key === 13) return handleAddSongToQueue();
    }

    const handleSavingSong = async (song) => {
        
        dispatch(toggleLoadingMusic(true));

        if (song.liked) {
            await socket.request('un like song', {channel_id: currentChannelId, song: song})
            .then(res => {

                dispatch(un_like_song(res));

                dispatch(removeSongFromWidget(res));
            
            })
            .catch(err => {
                dispatch(throwServerError({errorMessage: err}));
            })
        } else {
            await socket.request('like song', {channel_id: currentChannelId, song: song})
            .then(res => {

                dispatch(like_song(res));

                dispatch(saveSongToWidget(res));
            })
            .catch(err => {
                dispatch(throwServerError({errorMessage: err}));
            })
        }

        dispatch(toggleLoadingMusic(false));
    }

    const handleRemoveFromQueue = async (song) => {

        if (loading) return;

        dispatch(toggleLoadingMusic(true));

        await socket.request('remove song from queue', {song: song})
        .catch(err => {
            dispatch(throwServerError({errorMessage: err}));
        })

        dispatch(toggleLoadingMusic(false));
    }
    
    return (
        <div 
        style={{backgroundColor: disableTransparancyEffects ? secondaryColor : `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`}}
        className='music-widget-outer-container' >
            <div className='inner-music-widget-container'>
                <div className='music-top-title-container'>
                    <h2 style={{
                        color: textColor
                    }}>Media</h2>
                </div>
                <div className='music-widget-nav-container'>
                    <TextInput keyCode={handleEnter} inputValue={query} action={handleInput} placeholder={"Add Song To Queue"} marginTop='0' />
                    <AddButton opacity={query.length === 0 ? 0.5 : 1} invert={true} active={query.length === 0} action={handleAddSongToQueue} margin={"0 0 0 2%"} height={"25px"} width={"25px"} />
                </div> 
                <div className='music-queue-title-container'>
                    <h3 style={{color: textColor}}>Saved Media</h3>
                </div> 
                <div className='saved-music-container'>
                    {savedMusic.length === 0 ?
                    <p 
                    style={{
                        color: textColor
                    }}
                    >. . .</p>    
                    : savedMusic.map(song => {
                        return <Song addToQueue={() => {handleAddSavedSongToQueue(song)}} saved={true} liked={song.liked} action={() => {handleSavingSong(song)}} id={song._id} key={song._id} name={song.title} duration={song.duration} image={song.thumbnail} />
                    })}
                </div>
                <div className='music-queue-title-container'>
                    <h3 style={{color: textColor}}>Queue</h3>
                    <h3 style={{color: textColor}}>{queue.length === 0 ? 0 : queue.length - 1} / 10</h3>
                </div>   
                <div className='music-queue-container'>
                    {queue.length === 0 || editing ?
                    <p 
                    style={{
                        color: textColor
                    }}
                    >. . .</p>
                    : queue.map((song, i) => {
                        return (
                            i === 0 ? null :
                            <Song removeFromQueue={() => {handleRemoveFromQueue(song)}} inQueue={true} liked={song.liked} action={() => {handleSavingSong(song)}} id={song._id} key={song._id} name={song.title} duration={song.duration} image={song.thumbnail} />
                        )
                    })}
                </div>
                <div className='music-widget-controls-container'>
                    <div className='music-widget-inner-controls-container'>
                        <div>
                            {playing ?
                            <PauseButton width={25} height={25} action={handlePlayPause} />
                            :
                            <PlayButton width={25} height={25} action={handlePlayPause} />
                            }
                            <SkipButton width={25} height={25} action={handleSkip} />
                        </div>
                        <Range min={0} value={volume} action={handleMusicVolume} max={100} step={0.05} />
                    </div>
                    {queue[0]?.title && editing === false ? 
                    <Song liked={queue[0]?.liked} action={() => {handleSavingSong(queue[0])}} id={queue[0]._id} key={queue[0]._id} name={queue[0].title} duration={queue[0].duration} image={queue[0].thumbnail} />
                    :
                    <p
                    style={{
                        color: textColor
                    }}
                    >. . .</p>
                    }
                </div>
            </div>
            <Loading loading={loading} error={error} />
            {error ? <Error action={closeError} errorMessage={errorMessage} /> : null}
        </div>
    )
}
