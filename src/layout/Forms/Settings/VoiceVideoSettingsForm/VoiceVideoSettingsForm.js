
import React from 'react'

import Header from '../../../../components/ui/Titles/Header/Header'

import { DeviceSelector } from '../../../../components/ui/Inputs/DeviceSelector/DeviceSelector'
import Label from '../../../../components/ui/Titles/Label/Label'
import RadioToggle from '../../../../components/ui/Inputs/RadioToggle/RadioToggle'
import { useDispatch, useSelector } from 'react-redux'
import { setVoiceThreshold, toggleUsingPushToTalk } from '../../../../features/MediaControl/mediaControlSlice'
import { setKeybind } from '../../../../features/Settings/Keybinds/keybindsSlice'
import KeybindInput from '../../../../components/ui/Inputs/KeybindInput/KeybindInput'
import { TestMicrophone } from '../../../../components/TestMicrophone/TestMicrophone'

export const VoiceVideoSettingsForm = () => {

    const dispatch = useDispatch();

    const usingPushToTalk = useSelector(state => state.mediaControlSlice.usingPushToTalk);

    const voiceThreshold = useSelector(state => state.mediaControlSlice.voiceThreshold);

    const keybinds = useSelector((state) => state.keybindsSlice.keybinds);
    
    const handleKeybindChange = (actionType, keybind) => {
        // Dispatch an action to update the keybind
        dispatch(setKeybind({ actionType, keybind }));
    };
    
    return (
        <>
        <Header text='Voice / Video Settings' />
        <DeviceSelector type={'microphone'} />
        <DeviceSelector type={'speaker'} />
        <DeviceSelector type={'webcam'} />
        <Label label='Test Your Microphone' />
        <TestMicrophone 
        setVoiceThreshold={(value) => {dispatch(setVoiceThreshold(value))}}
        voiceThreshold={voiceThreshold}
        usingPushToTalk={usingPushToTalk}
        />
        <Label label='Voice Input Mode' />
        <RadioToggle 
        options={[
            {
                label: "Voice Activation Detection",
                value: "vad",
                description: "Automatically activates the microphone when sound is detected."
            },
            {
                label: "Push To Talk",
                value: "ptt",
                description: "Activates the microphone when a specific key is pressed."
            }
        ]}
        selected={usingPushToTalk ? "ptt" : "vad"}
        onChange={() => dispatch(toggleUsingPushToTalk())}
        />
        {usingPushToTalk ?
        <>
        <Label label="Set your push to talk keybind" />
        <KeybindInput
            currentKeybind={keybinds['pushToTalk'] || ''}
            onChange={(keybind) => handleKeybindChange('pushToTalk', keybind)}
        />
        </>
        :
        <>
        
        </>
        }
        </>
    )
}
