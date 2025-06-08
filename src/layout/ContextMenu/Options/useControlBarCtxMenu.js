
import { Mic, Settings, UserPen, Video } from 'lucide-react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { toggleUsingPushToTalk } from '../../../features/Channel/MediaControl/mediaControlSlice';
import { useSearchParams } from 'react-router-dom';

export const useControlBarCtxMenu = () => {

    const [,setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const {usingPushToTalk} = useSelector(state => state.mediaControlSlice);
    
    const getControlBarOptions = useCallback((options) => {
        options.push({
            label: "Preview Webcam",
            icon: <Video color="var(--text-color)"/>,
            type: "button",
            onClick: () => {
                dispatch(setOverlay('webcamOverlay'))
            }
        })

        options.push({
            label: usingPushToTalk ? "Use Voice Detection" : "Use Push To Talk",
            icon: <Mic color="var(--text-color)" />,
            type: 'button',
            onClick: () => {
                dispatch(toggleUsingPushToTalk());
            }
        })

        options.push({
            label: "Edit Account",
            icon: <UserPen color="var(--text-color)" />,
            type: "button",
            onClick: () => {
                setSearchParams({section: 'account'});
                dispatch(setOverlay("settings"));
            }
        })

        options.push({
            label: "Voice / Video Settings",
            icon: <Settings color="var(--text-color)" />,
            type: "button",
            onClick: () => {
                setSearchParams({section: "voiceVideo"});

                dispatch(setOverlay('settings'));
            }
        })

        options.push({
            label: "Manage Keybinds",
            type: 'button',
            onClick: () => {
                setSearchParams({section: 'keybinds'});
                dispatch(setOverlay('settings'))
            }
        })
    }, [usingPushToTalk, dispatch, setSearchParams])
  
    return {getControlBarOptions}
}
