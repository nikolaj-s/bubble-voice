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
import { handleSaveSoundPrefs, selectCurrentDynamicVoice, selectCurrentVoiceOver, selectDynamicVoiceAlerts, selectMuteSoundEffectsWhileMutedState, selectSocialSoundEffect, selectSoundEffectVolume, selectVoiceOverOptions, selectVoicePitch, selectVoiceRate, setSoundEffectsVolume, updateCurrentVoiceOver, updateSoundEffectsState } from '../../soundEffects/soundEffectsSlice';
import { AltError } from '../../../../components/AltError/AltError';
import { DynamicVoices } from './DynamicVoices/DynamicVoices';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';

const Settings = () => {

    const dispatch = useDispatch();

    const soundLevel = useSelector(selectSoundEffectVolume);

    const socialSoundEffect = useSelector(selectSocialSoundEffect);

    const muteSoundEffectsWhileMuted = useSelector(selectMuteSoundEffectsWhileMutedState);

    const currentVoice = useSelector(selectCurrentVoiceOver);

    const voiceOptions = useSelector(selectVoiceOverOptions);

    const dynamicVoiceAlerts = useSelector(selectDynamicVoiceAlerts);

    const [voices, setVoices] = React.useState([]);

    const [testLine, setTestLine] = React.useState("testing testing 1 2 3")

    const currentDynamicVoice = useSelector(selectCurrentDynamicVoice);

    const voiceRate = useSelector(selectVoiceRate);

    const voicePitch = useSelector(selectVoicePitch);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Sound Settings"))

        let v = speechSynthesis.getVoices()

        setTimeout(() => {

            setVoices(v)

        }, 500)
        
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

    const handleDynamicAlerts = () => {
        dispatch(updateSoundEffectsState({type: "dynamicVoiceAlerts", state: !dynamicVoiceAlerts}))
    }
    
    const handleSelectDynamicVoice = (v) => {
        dispatch(updateSoundEffectsState({type: "selectedDynamicVoice", state: v}))
    }

    const handlePitch = (v) => {
        dispatch(updateSoundEffectsState({type: 'pitch', state: v}))
    }

    const handleRate = (v) => {
        dispatch(updateSoundEffectsState({type: 'rate', state: v}))
    }

    const test = () => {
        let alert = new SpeechSynthesisUtterance(testLine);

        let voices = speechSynthesis.getVoices();

        alert.voice = voices[currentDynamicVoice];

        alert.volume = soundLevel;

        alert.rate = voiceRate;

        alert.pitch = voicePitch;

        window.speechSynthesis.speak(alert);
    }

    const getVoices = () => {
        setVoices(speechSynthesis.getVoices())
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
            <SettingsHeader title={'Dynamic Voice Over Alerts'} />
            <AltError error={true} errorMessage={"This Can Have A Perfomance Impact on Low End CPU's As It Runs Text To Speech Processing On The CPU."} />
            <InputTitle title={"Enable Dynamice Voice Over Alerts"} />
            <ToggleButton action={handleDynamicAlerts} state={dynamicVoiceAlerts} />
            <InputTitle title={"Select Dynamic Voice"} />
            <DynamicVoices getVoices={getVoices} action={handleSelectDynamicVoice} voices={voices} current={currentDynamicVoice} />
            <InputTitle title={"Rate"} />
            <Range  action={handleRate} value={voiceRate} min={0.1} max={10} step={0.05} />
            <InputTitle title={"Pitch"} />
            <Range action={handlePitch} min={0} max={2} step={0.05} value={voicePitch} />
            <InputTitle title={"Test Line"} />
            <TextInput marginBottom='5px' inputValue={testLine} action={(v) => {setTestLine(v)}} />
            <TextButton action={test} name={"Test"} />
        </div>
    )
}

export const SoundSettings = () => useRoutes([
    { path: 'sound-settings', element: <Settings />}
])