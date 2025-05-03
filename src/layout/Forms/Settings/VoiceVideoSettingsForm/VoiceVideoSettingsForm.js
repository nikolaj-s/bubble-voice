
import React from 'react'

import Header from '../../../../components/ui/Titles/Header/Header'

import { DeviceSelector } from '../../../../components/ui/Inputs/DeviceSelector/DeviceSelector'
import Label from '../../../../components/ui/Titles/Label/Label'
import RadioToggle from '../../../../components/ui/Inputs/RadioToggle/RadioToggle'
import { useDispatch, useSelector } from 'react-redux'
import { setVoiceThreshold, toggleUsingPushToTalk } from '../../../../features/Channel/MediaControl/mediaControlSlice'
import { setKeybind } from '../../../../features/Settings/Keybinds/keybindsSlice'
import KeybindInput from '../../../../components/ui/Inputs/KeybindInput/KeybindInput'
import { TestMicrophone } from '../../../../components/TestMicrophone/TestMicrophone'
import TypeInput from '../../../../components/ui/Inputs/TypeInput/TypeInput'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'

export const VoiceVideoSettingsForm = () => {

    const dispatch = useDispatch();

    const [voiceThreshold, setThreshold] = React.useState(25);

    const options= [
        {
            title: "Voice Activation Detection",
            type: "vad",
            description: "Automatically activates the microphone when sound is detected."
        },
        {
            title: "Push To Talk",
            type: "ptt",
            description: "Activates the microphone when a specific key is pressed."
        }
    ]

    const voiceThresholdRef = React.useRef(voiceThreshold);

    const usingPushToTalk = useSelector(state => state.mediaControlSlice.usingPushToTalk);

    const voice_threshold = useSelector(state => state.mediaControlSlice.voiceThreshold);

    const keybinds = useSelector((state) => state.keybindsSlice.keybinds);
    
    const handleKeybindChange = (actionType, keybind) => {
        // Dispatch an action to update the keybind
        dispatch(setKeybind({ actionType, keybind }));
    };

    React.useEffect(() => {

        voiceThresholdRef.current = voiceThreshold;

    }, [voiceThreshold])

    React.useEffect(() => {

        setThreshold(voice_threshold);

        return () => {

            if (voiceThresholdRef.current === voice_threshold) return;

            dispatch(setVoiceThreshold(voiceThresholdRef.current));
        }

    }, [dispatch, voice_threshold])
    
    return (
        <>
        <Header text='Voice / Video Settings' />
        <DeviceSelector type={'microphone'} />
        <DeviceSelector type={'speaker'} />
        <DeviceSelector type={'webcam'} />
        <LineSpacer />
        <Label label='Test Your Microphone' />
        <TestMicrophone 
        setVoiceThreshold={(value) => {setThreshold(value)}}
        voiceThreshold={voiceThreshold}
        usingPushToTalk={usingPushToTalk}
        />
        <Label label='Voice Input Mode' />
        <TypeInput 
        types={options}
        selected={usingPushToTalk ? "ptt" : "vad"}
        onSelect={() => dispatch(toggleUsingPushToTalk())}
        />
        {usingPushToTalk ?
        <>
        <LineSpacer />
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
        <Header text='Voice Processing' level={2} />
        <Label label='Echo Cancellation' />
        <ToggleSwitch />
        <Label label='Noise Supression' />
        <ToggleSwitch />
        <Label label='Auto Gain Control' />
        <ToggleSwitch />
        </>
    )
}
