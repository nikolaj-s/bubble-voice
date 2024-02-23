// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

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
import {  fetchRecentSongs, handleAddingMedia, like_song, searchMedia, selectLoadingMusicState, selectLoadingRecentSongs, selectMusicError, selectMusicErrorMessage, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, selectRecentSongs, selectSavesVisible, selectSearchResults, selectSearchResultsVisible, throwMusicError, toggleLoadingMusic, toggleMusicPlaying, toggleResultsVisible, toggleSavesVisible, un_like_song, updateMusicVolume } from '../../../../features/server/ChannelRoom/Room/Music/MusicSlice';

// style
import "./MusicWidget.css";

// socket
import { socket } from '../../../../features/server/ServerBar/ServerBar'
import { removeSongFromWidget, saveSongToWidget, selectCurrentChannel, selectCurrentChannelId, selectMusicSavedState, selectUsersPermissions, throwServerError } from '../../../../features/server/ServerSlice';
import { selectDisableTransparancyEffects } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { SubMenuButton } from '../../../buttons/subMenuButton/SubMenuButton';
import { SettingsButton } from '../../../buttons/settingsButton/settingsButton';
import { MediaSettings } from './MediaSettings/MediaSettings';
import { selectUsername } from '../../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { LockedChannelIcon } from '../../../Icons/LockedChannelIcon/LockedChannelIcon';
import { AltDownIcon } from '../../../Icons/AltDownIcon/AltDownIcon';
import { AudioWaveIcon } from '../../../Icons/AudioWaveIcon/AudioWaveIcon';

export const MusicWidget = ({roomOverlay, editing = false, widget, controls = true}) => {

    const dispatch = useDispatch();

    const [query, setQuery] = React.useState("");

    const [mediaSettings, toggleMediaSettings] = React.useState(false);

    const savesVisible = useSelector(selectSavesVisible);

    const resultsVisible =  useSelector(selectSearchResultsVisible);

    const results = useSelector(selectSearchResults);

    const loading = useSelector(selectLoadingMusicState);

    const volume = useSelector(selectMusicVolume);

    const error = useSelector(selectMusicError);

    const errorMessage = useSelector(selectMusicErrorMessage);

    const accentColor = useSelector(selectAccentColor);

    const queue = useSelector(selectMusicQueue);

    const playing = useSelector(selectMusicPlayingState);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const username = useSelector(selectUsername);

    const permission = useSelector(selectUsersPermissions);

    const channel = useSelector(selectCurrentChannel);

    const savedMusic = useSelector(selectMusicSavedState);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const recentSongs = useSelector(selectRecentSongs);

    const loadingRecentSongs = useSelector(selectLoadingRecentSongs);

    React.useEffect(() => {

        if (recentSongs.length > 0) return;

        if (loadingRecentSongs) return;

        dispatch(fetchRecentSongs());

    }, [loadingRecentSongs, recentSongs])

    React.useEffect(() => {

        const i = document.getElementById('music-widget-input');

        if (i) {
            i.focus();
        }

    }, [])

    const handleAddSongToQueue = async () => {

        let data = "";

        if (query.length === 0 || editing === true) return;

        if (queue.length >= 11) return dispatch(throwMusicError({error: true, errorMessage: "Song Queue Limit Has Been Reached"}));

        if (loading) return;

        if (query.includes('&')) {
            data = query.split('&')[0]
        } else {
            data = query;
        }

        if (data.includes('https:')) {
            data = data.replace(/\s/g, '');

            dispatch(handleAddingMedia({query: data}));
        } else {
            dispatch(searchMedia(data));
        }

        setQuery("");
    }

    const handleAddSavedSongToQueue = async (song) => {

        if (queue.length >= 11) if (queue.length >= 11) return dispatch(throwMusicError({error: true, errorMessage: "Song Queue Limit Has Been Reached"}));
        
        if (loading || editing === true) return;

        const exists = queue.findIndex(s => s._id === song._id);

        if (exists !== -1) return dispatch(throwMusicError({error: true, errorMessage: "Song is already in the queue"}));

        let liked = false;

        for (const s of savedMusic) {
            if (s._id === song._id) {
                liked = true;
            }
        }

        dispatch(toggleLoadingMusic(true));

        await socket.request('add song to queue', {song: {...song, liked: liked}})
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
    
    const toggleSettings = () => {
        toggleMediaSettings(!mediaSettings)
    }

    return (
        <div 
        style={{backgroundColor: secondaryColor}}
        className='music-widget-outer-container' >
            <div className='inner-music-widget-container'>
                
                {(channel?.locked_media === true && channel?.media_auth?.includes(username)) || channel.channel_owner === username || permission.server_group_name === 'Owner' || !channel.locked_media? 
                <>
                <div className='music-widget-nav-container'>
                    <div className='music-widget-icon-wrapper'>
                        <AudioWaveIcon />
                    </div>
                    
                    <TextInput id={'music-widget-input'} keyCode={handleEnter} inputValue={query} action={handleInput} placeholder={"Search"} marginTop='0' />
                </div>
                <div className='music-queue-title-container saved-media-title'>
                    <h3 onClick={() => {dispatch(toggleResultsVisible())}} style={{color: textColor, marginRight: 5, opacity: resultsVisible ? 1 : 0.5}}>{results.length === 0 ? "Recents" : "Results"}</h3>
                    <h2 style={{color: textColor, marginRight: 5}}>/</h2>
                    <h3 onClick={() => {dispatch(toggleSavesVisible())}} style={{color: textColor, marginRight: 5, opacity: savesVisible ? 1 : 0.5}}>Saves</h3>
                    <div style={{height: 2, width: '100%', backgroundColor: textColor, marginRight: 5}} />
                </div> 
                {resultsVisible ?
                <div className='saved-music-container'>
                    {results.length === 0 && recentSongs.length === 0 ?
                    <p 
                    style={{
                        color: textColor
                    }}
                    >. . .</p>    
                    :
                    results.length !== 0 ?
                    results.map(song => {
                        return <Song search_result={true} author={song.author} addToQueue={() => {handleAddSavedSongToQueue(song)}} saved={true} liked={song.liked} action={() => {handleSavingSong(song)}} id={song._id} key={song._id} name={song.title} duration={song.duration} image={song.thumbnail} url={song.id} />
                    })
                    :
                    recentSongs.map(song => {
                        return <Song search_result={true} author={song.author} addToQueue={() => {handleAddSavedSongToQueue(song)}} saved={true} liked={song.liked} action={() => {handleSavingSong(song)}} id={song._id} key={song._id} name={song.title} duration={song.duration} image={song.thumbnail} url={song.id} />
                    })
                    }
                </div>
                : null}
                {savesVisible ?
                <div className='saved-music-container'>
                    {savedMusic.length === 0 ?
                    <p 
                    style={{
                        color: textColor
                    }}
                    >. . .</p>    
                    : savedMusic.map(song => {
                        return <Song url={song.id} in_channel={true} author={song.author} addToQueue={() => {handleAddSavedSongToQueue(song)}} saved={true} liked={song.liked} action={() => {handleSavingSong(song)}} id={song._id} key={song._id} name={song.title} duration={song.duration} image={song.thumbnail} />
                    })}
                </div> 
                : null}
                <div className='music-queue-title-container'>
                    <h3 style={{color: textColor}}>Queue</h3>
                    <h3 style={{color: textColor}}>{queue.length === 0 ? 0 : queue.length - 1} / 10</h3>
                </div>   
                <div className='music-queue-container'>
                    {queue.length <= 1 || editing ?
                    <p 
                    style={{
                        color: textColor,
                        marginLeft: 10
                    }}
                    >. . .</p>
                    : queue.map((song, i) => {
                        return (
                            i === 0 ? null :
                            <Song url={song.id} author={song.author} added_by={song.added_by} removeFromQueue={() => {handleRemoveFromQueue(song)}} inQueue={true} liked={song.liked} action={() => {handleSavingSong(song)}} id={song._id} key={song._id} name={song.title} duration={song.duration} image={song.thumbnail} />
                        )
                    })}
                </div>
                <div style={{backgroundColor: primaryColor}} className='music-widget-controls-container'>
                    {controls ? <div className='music-widget-inner-controls-container'>
                        
                        <div className='music-widget-inner-controls-container-wrapper'>
                            {playing ? 
                            <PauseButton margin="0px 5px 0px 0px" background={accentColor}  width={28} height={28} borderRadius={'50%'} action={handlePlayPause} />
                            :
                            <PlayButton margin="0px 5px 0px 0px" background={accentColor} width={28} height={28} borderRadius={'50%'} action={handlePlayPause} />
                            }
                            <SkipButton transparent={true} width={18} height={18} action={handleSkip} />
                        </div>
                        <Range min={0} value={volume} action={handleMusicVolume} max={100} step={0.05} />
                    </div> : null}
                    {queue[0]?.title && editing === false ? 
                    <Song url={queue[0]?.id} playing={true} width={roomOverlay ? '100%' : 'calc(100% - 120px)'} added_by={queue[0]?.added_by} liked={queue[0]?.liked} action={() => {handleSavingSong(queue[0])}} id={queue[0]._id} key={queue[0]._id} name={queue[0].title} duration={queue[0].duration} image={queue[0].thumbnail} />
                    :
                    <p
                    style={{
                        color: textColor,
                        marginRight: 40,
                        marginLeft: 5
                    }}
                    >. . .</p>
                    }
                </div> 
                </>
                :
                
                <div style={{width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <LockedChannelIcon width={'40%'} height={'40%'} />
                    <p style={{color: textColor, textAlign: 'center', maxWidth: '90%'}}>Whoops Looks Like Your Not Allowed To Interact With The Media Player In This Channel</p>
                </div>
                }
                {error ? <Error action={closeError} position='absolute' errorMessage={errorMessage} /> : null}
                {mediaSettings ? <MediaSettings close={toggleSettings} secondaryColor={secondaryColor} /> : null}
            </div>
            <Loading loading={loading} error={error} />
           
        </div>
    )
}
