import React, { useCallback } from 'react'
import { useMediaPlayer } from '../../../hooks/useMediaPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { setMediaPlayerVolume } from '../../../features/MediaPlayer/mediaPlayerSlice';
import { Bookmark, BookmarkCheck, History, Pause, Play, Search, SkipForward } from 'lucide-react';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { saveMediaToPlayer } from '../../../features/MediaPlayer/Thunks/saveMediaToPlayer';
import { removeSavedMediaFromPlayer } from '../../../features/MediaPlayer/Thunks/removeSavedMediaFromPlayer';
import { isMediaSaved } from '../../../features/MediaPlayer/Helpers/isMediaSaved';
import { setFilter } from '../../../features/Search/searchSlice';
import { setChannelToViewWidgetsOf } from '../../../features/Widgets/widgetsSlice';

export const useMediaPlayerCtxMenu = () => {

    const dispatch = useDispatch();

    const mediaPlayerState = useSelector(state => state.mediaPlayerSlice);

    const {toggleIsPlaying, next } = useMediaPlayer();

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const savedMediaState = useSelector(state => state.savedMediaSlice);
    
    const getMediaPlayerOptions = useCallback((options) => {

        if (mediaPlayerState.currentlyPlaying) {
            const saved = isMediaSaved(savedMediaState, currentVoiceChannel, mediaPlayerState.currentlyPlaying.src);

            options.push({
                label: saved ? `Unsave ${mediaPlayerState.currentlyPlaying.title}` : `Save ${mediaPlayerState.currentlyPlaying.title}`,
                onClick: () => {
                    if (saved) {
                        dispatch(removeSavedMediaFromPlayer(mediaPlayerState.currentlyPlaying._id));
                    } else {
                        dispatch(saveMediaToPlayer(mediaPlayerState.currentlyPlaying));
                    }
                    
                },
                type: 'button',
                icon: <Bookmark fill={saved ? 'var(--text-color)' : 'transparent'} color="var(--text-color)" /> 
            })
        }

        options.push({
            label: 'Search',
            type: 'button',
            icon: <Search color="var(--text-color)" />,
            onClick: () => {
                dispatch(setFilter({path: 'videos'}));

                dispatch(setOverlay('search'));
            }
        })

        options.push({
            label: "View Saves",
            type: 'button',
            icon: <BookmarkCheck color="var(--text-color" />,
            onClick: () => {

                dispatch(setChannelToViewWidgetsOf(currentVoiceChannel));

                dispatch(setOverlay('widgets'));

                setTimeout(() => {

                    document.getElementById('media-player-widget-saves')?.scrollIntoView({behavior: 'instant'});
                
                }, 100)
            }
        })

        options.push({
            label: "View History",
            type: 'button',
            icon: <History color="var(--text-color)" />,
            onClick: () => {
                dispatch(setOverlay('mediaPlayerHistory'));
            }
        })
        
        options.push({
            label: mediaPlayerState.isPlaying ? 'Pause' : 'Play',
            type: 'button',
            icon: mediaPlayerState.isPlaying ? <Pause color="var(--text-color)"  /> : <Play color="var(--text-color)" />,
            onClick: () => {toggleIsPlaying()}
        })
        options.push({
            label: 'Skip',
            type: 'button',
            icon: <SkipForward  color="var(--text-color)" />,
            onClick: () => {next()}
        })
              
        options.push({
            type: 'range',
            label: "Change Media Player Volume",
            onChange: (value) => {
                dispatch(setMediaPlayerVolume(value));
            },
            value: mediaPlayerState.volume,
            min: 0,
            max: 1,
            step: 0.01
        })
        

    }, [dispatch, mediaPlayerState, currentVoiceChannel, savedMediaState, next, toggleIsPlaying])

    return {getMediaPlayerOptions}
}
