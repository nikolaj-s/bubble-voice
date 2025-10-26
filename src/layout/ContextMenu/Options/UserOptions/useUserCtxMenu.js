

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useGlobalVolume } from '../../../../context/GlobalVolumeContext';
import { setStreamDisabled } from '../../../../features/UserStreamState/userStreamStateSlice';
import { BoolIndicator } from '../../../../components/ui/BoolIndicator/BoolIndicator';
import { sendServerInvite } from '../../../../features/Invites/ServerInvites/Thunks/sendServerInvite';
import { MessageSquare, Pointer } from 'lucide-react';
import { pokeUser } from '../../../../features/Social/Thunks/pokeUser';
import { createConversation } from '../../../../features/Conversations/Thunks/createConversation';

export const useUserCtxMenu = () => {

    const dispatch = useDispatch();

    const userStreamState = useSelector(state => state.userStreamStateSlice.streams);

    const {name} = useSelector(state => state.serverDetailsSlice);

    const {users} = useSelector(state => state.serverUsersSlice);

    const {_id: user_id} = useSelector(state => state.accountSlice.account) || {};

    const {volumes, changeVolume} = useGlobalVolume();

    const getUserOptions = useCallback((options, user, permissions) => {

        if (!users[user._id] && permissions?.user_can_manage_invites) {
            options.push({
                label: `Invite user to ${name}`,
                type: 'button',
                onClick: () => {
                 
                    dispatch(sendServerInvite(user._id))
                }
            })
        } 

        if (user._id !== user_id) {

            options.push({
                label: "Message",
                icon: <MessageSquare color='var(--text-color)' />,
                type: 'button',
                onClick: () => {
                    dispatch(createConversation(user._id))
                }
                
            })

        }

        if (user._id !== user_id && users[user._id] && !user.fromSearch) {
        
            const isWebcamDisabled = userStreamState[`${user.user_id}-webcam`]?.disabled || false;

            options.push({
                label: `Poke ${user?.display_name}`,
                icon: <Pointer color='var(--text-color)' />,
                type: 'button',
                onClick: () => {
                    dispatch(pokeUser(user._id));
                }
            })

            options.push({
                label: "Change User Volume",
                min: 0,
                max: 2.5,
                step: 0.01,
                value: typeof volumes[`microphone-${user.user_id}`] === 'number' ? volumes[`microphone-${user.user_id}`] : 0.5,
                onChange: (value) => {changeVolume(`microphone-${user.user_id}`, value)},
                type: 'range'
            })

            if (permissions.user_can_assign_server_groups) {
                options.push({
                    label: "Manage User",
                    onClick: () => {

                    },
                    type: "button"
                })
            }

            options.push({
                label: "Disable Webcam",
                type: 'button',
                icon: <BoolIndicator color={'var(--error-color)'} active={isWebcamDisabled}/>,
                color: 'var(--error-color)',
                onClick: async () => {
                    
                    dispatch(setStreamDisabled({key: `${user.user_id}-webcam`, disabled: !isWebcamDisabled}));
                
                }
            })
        }


    }, [changeVolume, userStreamState, volumes, user_id, dispatch, users, name])
  
    return {getUserOptions}
}
