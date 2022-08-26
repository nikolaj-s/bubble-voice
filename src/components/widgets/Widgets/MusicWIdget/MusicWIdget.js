// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

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
import {  selectMusicError, selectMusicErrorMessage, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, throwMusicError, toggleMusicPlaying, updateMusicVolume } from '../../../../features/server/ServerSlice';

// style
import "./MusicWidget.css";

// socket
import { socket } from '../../../../features/server/ServerBar/ServerBar'

export const MusicWidget = ({editing = false}) => {

    const dispatch = useDispatch();

    const [query, setQuery] = React.useState("");

    const [loading, toggleLoading] = React.useState(false);

    const volume = useSelector(selectMusicVolume);

    const error = useSelector(selectMusicError);

    const errorMessage = useSelector(selectMusicErrorMessage);

    const queue = useSelector(selectMusicQueue);

    const playing = useSelector(selectMusicPlayingState);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const handleAddSongToQueue = async () => {
        if (query.length === 0 || editing === true) return;

        toggleLoading(true);

        await socket.request('add song to queue', {query: query})
        .then(response => {

            if (queue.length === 0) {
                dispatch(toggleMusicPlaying(true));
            }

            setQuery("")
        })
        .catch(error => {
            console.log(error);
            dispatch(throwMusicError({error: true, errorMessage: error}))
        })


        toggleLoading(false);
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

    return (
        <div 
        style={{
            backgroundColor: secondaryColor,
            border: `solid 4px ${primaryColor}`
        }}
        className='music-widget-outer-container' >
            <div className='inner-music-widget-container'>
                <div className='music-top-title-container'>
                    <h2 style={{
                        color: textColor
                    }}>Music</h2>
                </div>
                <div className='music-widget-nav-container'>
                    <TextInput inputValue={query} action={handleInput} placeholder={"Add Song To Queue"} marginTop='0' />
                    <AddButton action={handleAddSongToQueue} margin={"0 0 0 2%"} height={"50px"} width={"50px"} />
                </div> 
                <h3 style={{color: textColor}}>Queue</h3>
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
                            <Song name={song.title} image={song.thumbnail} />
                        )
                    })}
                </div>
                <div className='music-widget-controls-container'>
                    <div className='music-widget-inner-controls-container'>
                        <div>
                            {playing ?
                            <PauseButton action={handlePlayPause} />
                            :
                            <PlayButton action={handlePlayPause} />
                            }
                            <SkipButton action={handleSkip} />
                        </div>
                        <Range value={volume} action={handleMusicVolume} step={0.05} />
                    </div>
                    {queue[0]?.title && editing === false ? 
                    <Song name={queue[0].title} image={queue[0].thumbnail} />
                    :
                    <h3
                    style={{
                        color: textColor
                    }}
                    >. . .</h3>
                    }
                </div>
            </div>
            <Loading loading={loading} error={error} />
            {error ? <Error action={closeError} errorMessage={errorMessage} /> : null}
        </div>
    )
}
