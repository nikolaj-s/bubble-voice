import React, { useCallback } from 'react'
import { useMediaPlayer } from '../../../hooks/useMediaPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { setMediaPlayerVolume, toggleHideMediaPlayer, toggleMediaPlayerMuted, toggleShowInlineControls, toggleShowMediaPlayerRoomStatus } from '../../../features/MediaPlayer/mediaPlayerSlice';
import { Bookmark, BookmarkCheck, ChevronRight, Circle, History, LayoutDashboard, Pause, Play, Search, SkipForward } from 'lucide-react';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { saveMediaToPlayer } from '../../../features/MediaPlayer/Thunks/saveMediaToPlayer';
import { removeSavedMediaFromPlayer } from '../../../features/MediaPlayer/Thunks/removeSavedMediaFromPlayer';
import { isMediaSaved } from '../../../features/MediaPlayer/Helpers/isMediaSaved';
import { setFilter } from '../../../features/Search/searchSlice';
import { setChannelToViewWidgetsOf } from '../../../features/Widgets/widgetsSlice';
import { BoolIndicator } from '../../../components/ui/BoolIndicator/BoolIndicator';

export const useMediaPlayerCtxMenu = () => {

    const dispatch = useDispatch();

    const mediaPlayerState = useSelector(state => state.mediaPlayerSlice);

    const {toggleIsPlaying, next } = useMediaPlayer();

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const savedMediaState = useSelector(state => state.savedMediaSlice);
    
    const getMediaPlayerOptions = useCallback((options) => {

        if (mediaPlayerState.enabled) {
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

                    dispatch(setOverlay('mediaPlayerSaves'));

                }
            })

            let sub_options = [
                {
                    label: "View History",
                    type: 'button',
                    icon: <History color="var(--text-color)" />,
                    onClick: () => {
                        dispatch(setOverlay('mediaPlayerHistory'));
                    }
                },
                {
                    type: 'button',
                    label: 'Show Inline Player Controls',
                    icon: <BoolIndicator active={mediaPlayerState.showInlineControls} />,
                    onClick: () => {
                        dispatch(toggleShowInlineControls())
                    }
                },
                {
                    type: 'button',
                    label: 'Hide Media Player Room Status',
                    icon: <BoolIndicator active={mediaPlayerState.hideMediaPlayerRoomStatus} />,
                    onClick: () => {
                        dispatch(toggleShowMediaPlayerRoomStatus())
                    }
                },
                {
                    label: "Hide Media Player",
                    type: 'button',
                    onClick: () => {dispatch(toggleHideMediaPlayer())},
                    icon: <BoolIndicator active={mediaPlayerState.hideMediaPlayer} />
                }

            ]
            
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

            options.push({
                label: "View Media Player Options",
                icon: <ChevronRight color='var(--text-color)' />,
                submenuOptions: sub_options
            })

             options.push({
                label: "Mute Media Player",
                type: 'button',
                icon: <BoolIndicator color={'var(--error-color)'} active={mediaPlayerState.isMuted} />,
                onClick: () => {dispatch(toggleMediaPlayerMuted())},
                color: 'var(--error-color)'
            })

        } else {
            options.push({
                label: "Widgets",
                type: 'button',
                icon: <LayoutDashboard color='var(--text-color)' />,
                onClick: () => {
                    dispatch(setChannelToViewWidgetsOf(currentVoiceChannel))
                    dispatch(setOverlay('widgets'))
                }
            })
        }

    }, [dispatch, mediaPlayerState, currentVoiceChannel, savedMediaState, next, toggleIsPlaying])

    return {getMediaPlayerOptions}
}
