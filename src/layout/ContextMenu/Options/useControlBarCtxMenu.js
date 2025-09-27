
import { Keyboard, Settings, UserPen } from 'lucide-react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { useSearchParams } from 'react-router-dom';
import { setSoundEffectVolume } from '../../../features/SoundEffects/soundEffectsSlice';

export const useControlBarCtxMenu = () => {

    const [,setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const {volume: soundEffectsVolume} = useSelector(state => state.soundEffectsSlice);

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
            label: "Change Effects Volume",
            type: 'range',
            min: 0,
            max: 1,
            step: 0.01,
            value: soundEffectsVolume,
            onChange: (value) => {dispatch(setSoundEffectVolume(value))}
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
            icon: <Keyboard color='var(--text-color)' />,
            onClick: () => {
                setSearchParams({section: 'keybinds'});
                dispatch(setOverlay('settings'))
            }
        })
    }, [dispatch, setSearchParams, soundEffectsVolume])
  
    return {getControlBarOptions}
}
