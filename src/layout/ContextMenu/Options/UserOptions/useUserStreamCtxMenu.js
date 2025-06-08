import { useCallback } from 'react'
import { useGlobalVolume } from '../../../../context/GlobalVolumeContext'
import { useSelector } from 'react-redux';

export const useUserStreamCtxMenu = () => {

    const {volumes, changeVolume} = useGlobalVolume();

    const {_id: user_id} = useSelector(state => state.accountSlice.account) || {};

    const getUserStreamOptions = useCallback((options, data) => {
       if (data.userStreamSource.user_id !== user_id) {

            const volume_source_key = `streamAudio-${data.userStreamSource.user_id}`;

            options.push({
                label: "Disable Stream",
                type: 'button',
                onClick: () => {

                }
            })
            options.push({
                label: "Change Stream Volume",
                type: 'range',
                min: 0,
                max: 2.5,
                step: 0.01,
                value: typeof volumes[volume_source_key] === 'number' ? volumes[volume_source_key] : 0.5,
                onChange: (value) => {changeVolume(volume_source_key, value)}
            })
        }
    }, [changeVolume, volumes, user_id])
    
    return {getUserStreamOptions}
}
