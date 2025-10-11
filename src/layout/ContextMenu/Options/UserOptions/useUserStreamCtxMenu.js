import { useCallback } from 'react'
import { useGlobalVolume } from '../../../../context/GlobalVolumeContext'
import { useDispatch, useSelector } from 'react-redux';
import { BoolIndicator } from '../../../../components/ui/BoolIndicator/BoolIndicator';
import { setStreamDisabled } from '../../../../features/UserStreamState/userStreamStateSlice';

export const useUserStreamCtxMenu = () => {

    const dispatch = useDispatch();

    const {volumes, changeVolume} = useGlobalVolume();

    const userStreamState = useSelector(state => state.userStreamStateSlice.streams);

    const {_id: user_id} = useSelector(state => state.accountSlice.account) || {};

    const getUserStreamOptions = useCallback((options, data) => {

        if (data.user_id !== user_id && !data.fromSearch) {

                const volume_source_key = `streamAudio-${data.user_id}`;

                const stream_source_key = `${data.user_id}-stream`;

                const stream_audio_source_key = `${data.user_id}-streamAudio`;

                const isStreamDisabled = userStreamState[stream_source_key]?.disabled || false;

                options.push({
                    label: "Change Stream Volume",
                    type: 'range',
                    min: 0,
                    max: 2.5,
                    step: 0.01,
                    value: typeof volumes[volume_source_key] === 'number' ? volumes[volume_source_key] : 0.5,
                    onChange: (value) => {changeVolume(volume_source_key, value)}
                })

                 options.push({
                    label: "Disable Stream",
                    type: 'button',
                    icon: <BoolIndicator active={isStreamDisabled} color="var(--error-color)" />,
                    onClick: () => {
                        dispatch(setStreamDisabled({key: stream_source_key, disabled: !isStreamDisabled}));
                        dispatch(setStreamDisabled({key: stream_audio_source_key, disabled: !isStreamDisabled}));
                    },
                    color: 'var(--error-color)'
                })
            }
    }, [changeVolume, volumes, user_id, userStreamState, dispatch])
    
    return {getUserStreamOptions}
}
