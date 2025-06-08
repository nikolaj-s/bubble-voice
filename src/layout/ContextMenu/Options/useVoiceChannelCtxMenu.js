import { Circle, ImageMinus, ImagePlus, Music2, Pencil } from 'lucide-react';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAppearanceSetting } from '../../../features/Settings/Appearance/appearanceSlice';
import { toggleVoiceChannelOptions } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';
import { toggleHideMediaPlayer } from '../../../features/MediaPlayer/mediaPlayerSlice';
import { setChannelToEdit } from '../../../features/Channel/editChannel/editChannelSlice';
import { useSearchParams } from 'react-router-dom';
import { setOverlay } from '../../../features/Overlay/overlaySlice';

export const useVoiceChannelCtxMenu = () => {

    const dispatch = useDispatch();

    const [,setSearchParams] = useSearchParams();

    const {hideChannelBackgrounds} = useSelector(state => state.appearanceSlice);
    
    const {currentVoiceChannel, hideNonVideoUsers} = useSelector(state => state.voiceChannelSlice);

    const {channels} = useSelector(state => state.channelsSlice);

    const hideMediaPlayer = useSelector(state => state.mediaPlayerSlice.hideMediaPlayer);

    const getVoiceChannelOptions = useCallback((options, permissions) => {
        options.push({
            label: "Hide Channel Background",
            type: 'button',
            icon: <Circle strokeWidth={2.5} color='var(--background-color)' fill={hideChannelBackgrounds ? 'var(--text-color)' : 'var(--primary-color)'} />,
            onClick: () => {
                dispatch(toggleAppearanceSetting('hideChannelBackgrounds'))
            }
        })

        if (currentVoiceChannel) {
            options.push({
                label: 'Hide Non Video Users',
                icon: <Circle strokeWidth={2.5} color='var(--background-color)' fill={hideNonVideoUsers ? 'var(--text-color)' : 'var(--primary-color)'} />,
                type: 'button',
                onClick: () => {dispatch(toggleVoiceChannelOptions('hideNonVideoUsers'))}
            })
            
            options.push({
                label: "Hide Media Player",
                type: 'button',
                onClick: () => {dispatch(toggleHideMediaPlayer())},
                icon: <Circle strokeWidth={2.5} color='var(--background-color)' fill={hideMediaPlayer ? 'var(--text-color)' : 'var(--primary-color)'} />
            })
            
            if (permissions.user_can_edit_channels) {
                options.push({
                    label: "Edit Channel",
                    type: 'button',
                    onClick: () => {

                        dispatch(setChannelToEdit(channels[currentVoiceChannel]));

                        setSearchParams({section: 'editChannel', channel: currentVoiceChannel});

                        dispatch(setOverlay('serverSettings'))
                    },
                    icon: <Pencil color="var(--text-color)" />
                })
            }
        }
    }, [channels, currentVoiceChannel, hideMediaPlayer, hideNonVideoUsers, hideChannelBackgrounds, dispatch, setSearchParams])
  
    return {getVoiceChannelOptions}
}
