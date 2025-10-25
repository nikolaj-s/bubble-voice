

import { FolderPlus, Plus, Settings, UserPlus } from 'lucide-react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setOverlay } from '../../../../features/Overlay/overlaySlice'
import { BoolIndicator } from '../../../../components/ui/BoolIndicator/BoolIndicator'
import { toggleAppearanceSetting } from '../../../../features/Settings/Appearance/appearanceSlice'
import { setFilter } from '../../../../features/Search/searchSlice'

export const useChannelsCtxMenu = () => {

    const dispatch = useDispatch();

    const [, setSearchParams] = useSearchParams();

    const {hideCustomChannelIcons} = useSelector(state => state.appearanceSlice);

    const {details} = useSelector(state => state.serverDetailsSlice);

    const getChannelsOptions = useCallback((options, permissions) => {

        options.push({
            label: "View Bubble Options",
            onClick: () => {
                dispatch(setOverlay('serverSettings'))
            },
            type: 'button',
            icon: <Settings color='var(--text-color)' />
        })

        if (permissions.user_can_invite_users) {

            options.push({
                label: "Invite User",
                onClick: () => {
                    dispatch(setFilter({path: 'users'}));

                    dispatch(setOverlay('search'));
                },
                type: 'button',
                icon: <UserPlus color='var(--text-color)' />
            })

        }

        if (permissions.user_can_create_channels) {
            options.push({
                label: "Create Channel",
                onClick: () => {
                    setSearchParams({section: 'createChannel'})
                    dispatch(setOverlay('serverSettings'))
                },
                type: "button",
                icon: <Plus color="var(--text-color)" />
            })
            options.push({
                label: "Create Category",
                onClick: () => {
                    setSearchParams({section: "createCategory"});
                    dispatch(setOverlay('serverSettings'));
                },
                type: 'button',
                icon: <FolderPlus color="var(--text-color)" />
            })
        }
        
        options.push({
            label: "Hide Channel Icons",
            icon: <BoolIndicator active={hideCustomChannelIcons}  />,
            type: 'button',
            onClick: () => {
                dispatch(toggleAppearanceSetting('hideCustomChannelIcons'))
            }
        })

    }, [dispatch, setSearchParams, hideCustomChannelIcons, details])

    return {getChannelsOptions};
}
