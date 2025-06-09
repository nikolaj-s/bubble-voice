import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOverlay } from '../../../../features/Overlay/overlaySlice';
import { BoolIndicator } from '../../../../components/ui/BoolIndicator/BoolIndicator';
import { toggleUsingPushToTalk } from '../../../../features/Channel/MediaControl/mediaControlSlice';
import { Video } from 'lucide-react';

export const useUserControlsCtxMenu = () => {

    const dispatch = useDispatch();

    const {usingPushToTalk} = useSelector(state => state.mediaControlSlice);

    const {_id: user_id} = useSelector(state => state.accountSlice.account); 

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

            options.push({
                type: 'spacer'
            })
        }

    }, [dispatch, usingPushToTalk, user_id])
  
    return {getUserControlsOptions};
}
