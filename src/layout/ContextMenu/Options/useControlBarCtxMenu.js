
import { Bell, BellOff, Keyboard, Settings, UserPen } from 'lucide-react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { useSearchParams } from 'react-router-dom';
import { setSoundEffectVolume } from '../../../features/SoundEffects/soundEffectsSlice';
import { toggleMuteNotifications } from '../../../features/Notifications/notificationsSlice';

export const useControlBarCtxMenu = () => {

    const [,setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const {volume: soundEffectsVolume} = useSelector(state => state.soundEffectsSlice);

    const {muteNotifications} = useSelector(state => state.notificationsSlice);

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
            label: `${muteNotifications ? 'Unmute' : 'Mute'} Notifications`,
            type: 'button',
            icon: muteNotifications ? <BellOff color='var(--text-color)' /> : <Bell color='var(--text-color)' />,
            onClick: () => {
                dispatch(toggleMuteNotifications(!muteNotifications));
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
    }, [dispatch, setSearchParams, soundEffectsVolume, muteNotifications])
  
    return {getControlBarOptions}
}
