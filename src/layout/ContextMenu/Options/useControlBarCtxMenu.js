
import { Settings, UserPen } from 'lucide-react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { useSearchParams } from 'react-router-dom';

export const useControlBarCtxMenu = () => {

    const [,setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const getControlBarOptions = useCallback((options) => {
        
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
    }, [dispatch, setSearchParams])
  
    return {getControlBarOptions}
}
