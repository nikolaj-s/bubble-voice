import { Pencil } from 'lucide-react';
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAppearanceSetting } from '../../../features/Settings/Appearance/appearanceSlice';
import { toggleVoiceChannelOptions } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';
import { setChannelToEdit } from '../../../features/Channel/editChannel/editChannelSlice';
import { useSearchParams } from 'react-router-dom';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { BoolIndicator } from '../../../components/ui/BoolIndicator/BoolIndicator';

export const useVoiceChannelCtxMenu = () => {

    const dispatch = useDispatch();

    const [,setSearchParams] = useSearchParams();

    const {hideChannelBackgrounds} = useSelector(state => state.appearanceSlice);
    
    const {currentVoiceChannel, hideNonVideoUsers} = useSelector(state => state.voiceChannelSlice);

    const {channels} = useSelector(state => state.channelsSlice);

    const getVoiceChannelOptions = useCallback((options, permissions) => {
        options.push({
            label: "Hide Channel Background",
            type: 'button',
            icon: <BoolIndicator active={hideChannelBackgrounds} />,
            onClick: () => {
                dispatch(toggleAppearanceSetting('hideChannelBackgrounds'))
            }
        })

        if (currentVoiceChannel) {
            options.push({
                label: 'Hide Non Video Users',
                icon: <BoolIndicator active={hideNonVideoUsers} />,
                type: 'button',
                onClick: () => {dispatch(toggleVoiceChannelOptions('hideNonVideoUsers'))}
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
    }, [channels, currentVoiceChannel, hideNonVideoUsers, hideChannelBackgrounds, dispatch, setSearchParams])
  
    return {getVoiceChannelOptions}
}
