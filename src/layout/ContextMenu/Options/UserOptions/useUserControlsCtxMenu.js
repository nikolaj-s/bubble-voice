import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOverlay } from '../../../../features/Overlay/overlaySlice';
import { BoolIndicator } from '../../../../components/ui/BoolIndicator/BoolIndicator';
import { toggleUsingPushToTalk } from '../../../../features/Channel/MediaControl/mediaControlSlice';
import { ChevronRight, Video } from 'lucide-react';
import { setMicrophone } from '../../../../features/Settings/Devices/deviceSlice';

export const useUserControlsCtxMenu = () => {

    const dispatch = useDispatch();

    const {usingPushToTalk} = useSelector(state => state.mediaControlSlice);

    const {_id: user_id} = useSelector(state => state.accountSlice.account); 

    const {selectedMicrophone} = useSelector(state => state.deviceSlice);

    const microphones = useSelector(state => state.deviceSlice.microphones);

    const getUserControlsOptions = useCallback((options, data, byPass) => {

        if (data.user_id === user_id || byPass) {

            options.push({
                label: "Preview Webcam",
                icon: <Video color="var(--text-color)"/>,
                type: "button",
                onClick: () => {
                    dispatch(setOverlay('webcamOverlay'))
                }
            })

            options.push({
                label: "Use Push To Talk",
                type: 'button',
                icon: <BoolIndicator active={usingPushToTalk} />,
                onClick: () => {
                    dispatch(toggleUsingPushToTalk())
                }
            })

            options.push({
                label: "Use Voice Activation",
                icon: <BoolIndicator active={!usingPushToTalk} />,
                type: 'button',
                onClick: () => {
                    dispatch(toggleUsingPushToTalk());
                }
            })

            const subOptions = microphones.map(microphone => ({
                label: microphone.label,
                type: 'button',
                icon: <BoolIndicator active={selectedMicrophone?.deviceId === microphone.deviceId} />,
                onClick: () => {
                    dispatch(setMicrophone(microphone))
                }
            }))

            options.push({
                label: "Choose Input Device",
                icon: <ChevronRight color='var(--text-color)' />,
                submenuOptions: subOptions
            })

            options.push({
                type: 'spacer'
            })
        }
      
    }, [dispatch, usingPushToTalk, user_id, microphones, selectedMicrophone])
  
    return {getUserControlsOptions};
}
