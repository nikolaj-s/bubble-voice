
import { Camera, CameraOff } from 'lucide-react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useGlobalVolume } from '../../../../context/GlobalVolumeContext';
import { setStreamDisabled } from '../../../../features/UserStreamState/userStreamStateSlice';
import { BoolIndicator } from '../../../../components/ui/BoolIndicator/BoolIndicator';

export const useUserCtxMenu = () => {

    const dispatch = useDispatch();

    const userStreamState = useSelector(state => state.userStreamStateSlice.streams);

    const {_id: user_id} = useSelector(state => state.accountSlice.account) || {};

    const {volumes, changeVolume} = useGlobalVolume();

    const getUserOptions = useCallback((options, user, permissions) => {

         if (user.user_id !== user_id) {
        
            const isWebcamDisabled = userStreamState[`${user.user_id}-webcam`]?.disabled || false;

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


    }, [changeVolume, userStreamState, volumes, user_id, dispatch])
  
    return {getUserOptions}
}
