
// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { DropDownList } from '../../../../components/DropDownList/DropDownList';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { ListenToMicrophoneLevel } from './ListenToMicrophoneLevel/ListenToMicrophoneLevel';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';

// state
import { selectAudioInputList, selectAudioInput, updateSelectedDevice, selectAudioOutput, selectAudioOutputList, selectVideoInput, selectVideoInputList, selectPushToTalkState, selectVoiceActivityState, toggleVoiceActivity, selectMirroredWebCamState, toggleMirroredWebCam } from './voiceVideoSettingsSlice';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';

const Settings = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {

        dispatch(setHeaderTitle("Voice / Video Settings"))
    // eslint-disable-next-line
    }, [])

    const selectedAudioInput = useSelector(selectAudioInput);

    const selectedAudioInputList = useSelector(selectAudioInputList);

    const selectedAudioOutput = useSelector(selectAudioOutput);

    const selectedAudioOutputList = useSelector(selectAudioOutputList);

    const selectedVideoInput = useSelector(selectVideoInput);

    const selectedVideoInputList = useSelector(selectVideoInputList);

    const pushToTalk = useSelector(selectPushToTalkState);

    const voiceActivity = useSelector(selectVoiceActivityState);

    const mirroredWebCam = useSelector(selectMirroredWebCamState);

    const handleToggleVoiceState = () => {
        dispatch(toggleVoiceActivity())
    }

    const selectDevice = (type, device) => {
        dispatch(updateSelectedDevice({type, device}))
    }

    const handleToggleMirroredWebCamState = () => {
        dispatch(toggleMirroredWebCam());
    }

    return (
        <div className='settings-wrapper'>
            <InputTitle title={"Select Audio Input Device"} />
            <DropDownList action={selectDevice} stateType={"audioinput"} selectedItem={selectedAudioInput.label} list={selectedAudioInputList} />
            <InputTitle title={"Select Audio Output Device"} />
            <DropDownList action={selectDevice} stateType={"audiooutput"} selectedItem={selectedAudioOutput.label} list={selectedAudioOutputList} />
            <InputTitle title={"Select Video Input Device"} />
            <DropDownList action={selectDevice} stateType={"videoinput"} selectedItem={selectedVideoInput.label} list={selectedVideoInputList} />
            <InputTitle title={"Test Mic Input"} />
            <ListenToMicrophoneLevel />
            <InputTitle marginTop={"0%"} title={"Enable Push To Talk"} />
            <ToggleButton state={pushToTalk} action={handleToggleVoiceState} />
            <InputTitle title={"Enable Voice Activity Detection"} />
            <ToggleButton state={voiceActivity} action={handleToggleVoiceState} />
            <InputTitle title={"Mirror Web Cam *must reconnect to channel for changes to take effect"} />
            <ToggleButton state={mirroredWebCam} action={handleToggleMirroredWebCamState} />
            <SettingsSpacer />
        </div>
    )
}

export const VoiceVideoSettings = () => useRoutes([
    { path: "voice-video", element: <Settings /> }
])

