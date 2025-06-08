

import { FolderPlus, Plus } from 'lucide-react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setOverlay } from '../../../../features/Overlay/overlaySlice'

export const useChannelsCtxMenu = () => {

    const dispatch = useDispatch();

    const [, setSearchParams] = useSearchParams();

    const getChannelsOptions = useCallback((options, permissions) => {

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

    }, [dispatch, setSearchParams])

    return {getChannelsOptions};
}
