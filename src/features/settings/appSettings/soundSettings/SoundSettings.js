// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router';

// components
import { Range } from '../../../../components/inputs/Range/Range';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
import { DropDownList } from '../../../../components/DropDownList/DropDownList'

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { handleSaveSoundPrefs, selectCurrentVoiceOver, selectMuteSoundEffectsWhileMutedState, selectSocialSoundEffect, selectSoundEffectVolume, selectVoiceOverOptions, setSoundEffectsVolume, updateCurrentVoiceOver, updateSoundEffectsState } from '../../soundEffects/soundEffectsSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const soundLevel = useSelector(selectSoundEffectVolume);

    const socialSoundEffect = useSelector(selectSocialSoundEffect);

    const muteSoundEffectsWhileMuted = useSelector(selectMuteSoundEffectsWhileMutedState);

    const currentVoice = useSelector(selectCurrentVoiceOver);

    const voiceOptions = useSelector(selectVoiceOverOptions);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Sound Settings"))

        return () => {

            dispatch(handleSaveSoundPrefs())
        
        }
    // eslint-disable-next-line
    }, [])
    
    const handleSoundLevelChange = (value) => {

        dispatch(setSoundEffectsVolume(value));

    }

    const handleToggleSocialSoundEffect = () => {

        dispatch(updateSoundEffectsState({type: "socialSoundEffect", state: !socialSoundEffect}));

    }

    const handleToggleMuteSoundEffects = () => {

        dispatch(updateSoundEffectsState({type: "muteSoundEffectsWhileMutedState", state: !muteSoundEffectsWhileMuted}))

    }

    const updateVoiceOverPref = (_, value) => {
        
        dispatch(updateCurrentVoiceOver(value));

    }

    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"General"} />
            <InputTitle title={"Sound Effects Volume"} />
            <Range action={handleSoundLevelChange} value={soundLevel}  />
            <SettingsHeader title={"Notification Sounds"} />
            <InputTitle title={"Change Notification Announcer Voice"} />
            <DropDownList action={updateVoiceOverPref} selectedItem={currentVoice.label} list={voiceOptions} />
            <InputTitle title={"Toggle Sound Effect For New Messages In Social"} />
            <ToggleButton action={handleToggleSocialSoundEffect} state={socialSoundEffect} />
            <InputTitle title={"Mute Sound Effects While Muted"} />
            <ToggleButton action={handleToggleMuteSoundEffects} state={muteSoundEffectsWhileMuted} />
        </div>
    )
}

export const SoundSettings = () => useRoutes([
    { path: 'sound-settings', element: <Settings />}
])