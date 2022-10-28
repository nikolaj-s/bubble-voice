
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
import { selectAudioInputList, selectAudioInput, updateSelectedDevice, selectAudioOutput, selectAudioOutputList, selectVideoInput, selectVideoInputList, selectPushToTalkState, selectVoiceActivityState, toggleVoiceActivity, toggleSelectedVoiceVideoState, selectMirroredWebCamState, handleSaveVoiceVideoSettings, selectEchoCancellatio, selectNoiseSuppression, selectMicInputVolume, updateMicInputVolume, getMediaDevices } from './voiceVideoSettingsSlice';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { Range } from '../../../../components/inputs/Range/Range';
import { selectMicrophoneState, toggleControlState } from '../../../controlBar/ControlBarSlice';
import { PreviewWebCam } from './PreviewWebCam/PreviewWebCam';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { AltError } from '../../../../components/AltError/AltError';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';

const Settings = () => {

    const dispatch = useDispatch();

    const [localMicInputVolume, setLocalMicInputVolum] = React.useState(0);

    const [previewingWebCam, togglePreviewingWebCam] = React.useState(false);

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

    const echoCancellation = useSelector(selectEchoCancellatio);

    const noiseSuppression = useSelector(selectNoiseSuppression);

    const micInputVolume = useSelector(selectMicInputVolume);

    const microphoneState = useSelector(selectMicrophoneState);

    React.useEffect(() => {

        setLocalMicInputVolum(micInputVolume);

    }, [micInputVolume])

    React.useEffect(() => {

        dispatch(getMediaDevices());

        if (microphoneState === true) {

            dispatch(toggleControlState('microphoneState'))

        }

        return () => {
            return dispatch(toggleControlState('microphoneState'))
        }
    }, [])

    const handleToggleVoiceState = () => {

        dispatch(toggleVoiceActivity());

        dispatch(handleSaveVoiceVideoSettings());
    }

    const selectDevice = (type, device) => {

        dispatch(updateSelectedDevice({type, device}));

        dispatch(handleSaveVoiceVideoSettings());
    }

    const handleToggleSelectedVoiceVideoState = (arg) => {

        dispatch(toggleSelectedVoiceVideoState(arg));

        dispatch(handleSaveVoiceVideoSettings());
    }

    const handleMicInputVolume = (val) => {
        
        setLocalMicInputVolum(val);

    }

    const saveMicInputVolume = () => {

        dispatch(updateMicInputVolume(localMicInputVolume));

        dispatch(handleSaveVoiceVideoSettings());
    
    }

    const handleTogglePreviewWebCam = (bool) => {
        togglePreviewingWebCam(bool);
    }

    const refreshDeviceList = () => {
        dispatch(getMediaDevices());
    }

    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Devices"} />
            <InputTitle title={"Select Audio Input Device"} />
            <DropDownList action={selectDevice} stateType={"audioinput"} selectedItem={selectedAudioInput.label} list={selectedAudioInputList} />
            <InputTitle title={"Select Audio Output Device"} />
            <DropDownList action={selectDevice} stateType={"audiooutput"} selectedItem={selectedAudioOutput.label} list={selectedAudioOutputList} />
            <InputTitle title={"Select Video Input Device"} />
            <DropDownList action={selectDevice} stateType={"videoinput"} selectedItem={selectedVideoInput.label} list={selectedVideoInputList} />
            <InputTitle title={"Refresh Device Lists"} />
            <TextButton name={"Refresh"} action={refreshDeviceList} />
            <SettingsHeader title={"Audio Settings"} />
            <InputTitle title={"Test Mic Input"} />
            <ListenToMicrophoneLevel />
            
            <InputTitle title={"Input Volume"} />
            <Range save={saveMicInputVolume} value={localMicInputVolume} action={handleMicInputVolume} min={1} max={8} step={0.001} /> 
            <AltError error={true} marginTop={"4%"} errorMessage="Having Noise Suppresion on and increasing microphone volume will cause microphone quality issues." />
            <InputTitle title={"Enable Noise Suppression / Bi - Quad Filter"} />
            <ToggleButton action={() => {handleToggleSelectedVoiceVideoState("noiseSuppression")}} state={noiseSuppression} />
            <InputTitle title={"Echo Cancellation"} />
            <ToggleButton action={() => {handleToggleSelectedVoiceVideoState("echoCancellation")}} state={echoCancellation} />
            
            <SettingsHeader title={"Input Mode"} />
            <InputTitle  title={"Enable Push To Talk"} />
            <ToggleButton state={pushToTalk} action={handleToggleVoiceState} />
            <InputTitle title={"Enable Voice Activity Detection"} />
            <ToggleButton state={voiceActivity} action={handleToggleVoiceState} />
            
            <SettingsHeader title={"Video Settings"} />
            <InputTitle title={"Mirror Web Cam"} />
            <ToggleButton state={mirroredWebCam} action={() => {handleToggleSelectedVoiceVideoState("mirroredWebCam")}} />
            <AltError marginTop={'2%'} error={true} errorMessage={"Must reconnect to channel for this setting to take effect server side"} />
            <InputTitle title={"Preview Webcam"} />
            <PreviewWebCam preview={previewingWebCam} deviceId={selectedVideoInput._id} mirrored={mirroredWebCam} />
            <ApplyCancelButton apply={() => {handleTogglePreviewWebCam(true)}} cancel={() => {handleTogglePreviewWebCam(false)}} toggled={previewingWebCam} cancelName='Stop Preview' name='Start Preview' />
            <SettingsSpacer />
        </div>
    )
}

export const VoiceVideoSettings = () => useRoutes([
    { path: "voice-video", element: <Settings /> }
])

