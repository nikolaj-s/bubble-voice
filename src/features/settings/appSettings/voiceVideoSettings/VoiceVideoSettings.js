
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
import { RadioButton } from '../../../../components/buttons/RadioButton/RadioButton'
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
// state
import { selectAudioInputList, selectAudioInput, updateSelectedDevice, selectAudioOutput, selectAudioOutputList, selectVideoInput, selectVideoInputList, selectPushToTalkState, selectVoiceActivityState, toggleVoiceActivity, toggleSelectedVoiceVideoState, selectMirroredWebCamState, handleSaveVoiceVideoSettings, selectEchoCancellatio, selectNoiseSuppression, selectMicInputVolume, updateMicInputVolume, getMediaDevices, selectVoiceActivationSensitivity, updateVoiceActivationSensitivity, selectAutoGainControl, toggleAutoGain, selectVoiceDeactivationDelayState, updateVoiceDeactivationDelay, selectAdvancedVoiceActivation, selectExperimentalAudioCapture } from './voiceVideoSettingsSlice';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { Range } from '../../../../components/inputs/Range/Range';
import { selectMicrophoneState, toggleControlState } from '../../../controlBar/ControlBarSlice';
import { PreviewWebCam } from './PreviewWebCam/PreviewWebCam';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { AltError } from '../../../../components/AltError/AltError';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { VoiceDeactivationDelay } from './VoiceDeactivationDelay/VoiceDeactivationDelay';
import { selectActivateCameraKey, selectDisconnectKey, selectMuteAudioKey, selectMuteMicKey, selectPushToMuteKey, selectPushToTalkKey, selectShareScreenKey, updateKeyCodeState } from '../keyBindSettings/keyBindSettingsSlice';
import { selectCurrentChannelId } from '../../../server/ServerSlice';
import { MicMutedIndicator } from './MicMutedIndicator/MicMutedIndicator';
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

    const voiceActivationSensitivity = useSelector(selectVoiceActivationSensitivity);

    const autoGainControl = useSelector(selectAutoGainControl);

    const voiceDeactivationDelay = useSelector(selectVoiceDeactivationDelayState);

    const pushToTalkkey = useSelector(selectPushToTalkKey);

    const muteMicKey = useSelector(selectMuteMicKey);

    const muteAudioKey = useSelector(selectMuteAudioKey);

    const activateCameraKey = useSelector(selectActivateCameraKey);

    const shareScreenKey = useSelector(selectShareScreenKey);

    const disconnectKey = useSelector(selectDisconnectKey);

    const pushToMuteKey = useSelector(selectPushToMuteKey);

    const advancedVoiceActivationDetection = useSelector(selectAdvancedVoiceActivation);

    const experimentalAudioCapture = useSelector(selectExperimentalAudioCapture);

    const channelId = useSelector(selectCurrentChannelId);

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
    // eslint-disable-next-line
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

    const handleVoiceActivationSensitivity = (value) => {
        dispatch(updateVoiceActivationSensitivity(value))
    }

    const handleToggleAutoGainControl = () => {
        dispatch(toggleAutoGain());

        dispatch(handleSaveVoiceVideoSettings());
    }

    const handleVoiceDeactivaitonDelay = (value) => {
        dispatch(updateVoiceDeactivationDelay(value));
    }

    const saveVoiceVideoSettings = () => {
        dispatch(handleSaveVoiceVideoSettings())
    }

    const handleKeyCodeUpdate = (keyCode, state, event) => {
        
        if (event.key.includes('F')) return;

        if (event.keyCode === pushToTalkkey.keyCode && (event.keyCode !== "")) return;
        
        if (event.keyCode === muteMicKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === muteAudioKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === activateCameraKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === disconnectKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === shareScreenKey.keyCode && (event.keyCode !== "")) return;
        
        if (event.keyCode === pushToMuteKey.keyCode && (event.keyCode !== "")) return;

        const obj = {[state]: {key: event.nativeEvent.key.length === 1 ? event.nativeEvent.key.toUpperCase() : event.nativeEvent.key , keyCode: event.keyCode, code: event.code}}
        
        dispatch(updateKeyCodeState(obj));
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
            <InputTitle title={"Input Mode"} />
            <RadioButton name={"Enable Push To Talk"} state={pushToTalk} action={handleToggleVoiceState} />
            <RadioButton name={"Enable Voice Activation Detection"} state={voiceActivity} action={handleToggleVoiceState} />
            {pushToTalk ?
            <>
            <InputTitle title={"Push To Talk Release Delay"} />
            <VoiceDeactivationDelay value={voiceDeactivationDelay} action={handleVoiceDeactivaitonDelay} save={saveVoiceVideoSettings} />
            <InputTitle title={"Push To Talk Key Bind"} />
            <TextInput keyCode={handleKeyCodeUpdate} stateSelector='push_to_talk' inputValue={pushToTalkkey.key} />
            </>
            : 
            <>
            <InputTitle title={"Enable Advanced Voice Activation Detection"} />
            <ToggleButton action={() => {handleToggleSelectedVoiceVideoState('advancedVoiceActivationDetection')}} state={advancedVoiceActivationDetection}  />
            <div style={{opacity: advancedVoiceActivationDetection ? 0.3 : 1, pointerEvents: advancedVoiceActivationDetection ? 'none' : 'all'}}>
                <InputTitle title={"Voice Activation Sensitivity"} />
                <Range step={1} action={handleVoiceActivationSensitivity} min={1} max={200} value={voiceActivationSensitivity} />
            </div>
            </>
            }
            
            {
            
            }
            
            <AltError error={true} marginTop={"4%"} errorMessage="Disable noise suppression and echo cancellation if experiencing microphone cut outs." />
            <InputTitle title={"Enable Noise Suppression / Bi - Quad Filter"} />
            <ToggleButton action={() => {handleToggleSelectedVoiceVideoState("noiseSuppression")}} state={noiseSuppression} />
            <InputTitle title={"Echo Cancellation"} />
            <ToggleButton action={() => {handleToggleSelectedVoiceVideoState("echoCancellation")}} state={echoCancellation} />
            <InputTitle title={"Auto Gain Control"} />
            <ToggleButton action={handleToggleAutoGainControl} state={autoGainControl} />
            <SettingsHeader title={'Stream Settings'} />
            <InputTitle title={"Enable Experimental Audio Capture"} />
            <ToggleButton state={experimentalAudioCapture} action={() => {handleToggleSelectedVoiceVideoState('experimentalAudioCapture')}} />
            <SettingsHeader title={"Video Settings"} />
            <InputTitle title={"Mirror Web Cam"} />
            <ToggleButton state={mirroredWebCam} action={() => {handleToggleSelectedVoiceVideoState("mirroredWebCam")}} />
            <AltError marginTop={'2%'} error={true} errorMessage={"Must reconnect to channel for this setting to take effect server side"} />
            <InputTitle title={"Preview Webcam"} />
            <PreviewWebCam preview={previewingWebCam} deviceId={selectedVideoInput._id} mirrored={mirroredWebCam} />
            <ApplyCancelButton apply={() => {handleTogglePreviewWebCam(true)}} cancel={() => {handleTogglePreviewWebCam(false)}} toggled={previewingWebCam} cancelName='Stop' name='Start' />
            <SettingsSpacer />
            {channelId ? <MicMutedIndicator /> : null}
        </div>
    )
}

export const VoiceVideoSettings = () => useRoutes([
    { path: "voice-video", element: <Settings /> }
])

