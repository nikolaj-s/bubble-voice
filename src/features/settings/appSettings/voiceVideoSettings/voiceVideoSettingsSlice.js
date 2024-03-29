import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSavedLocalData, saveLocalData } from "../../../../util/LocalData";

export const getMediaDevices = createAsyncThunk(
    'voiceVideoSettingsSlice/getMediaDevices',
    async (_, {rejectWithValue}) => {
        
        const deviceList = await navigator.mediaDevices.enumerateDevices()
        .then( async (devices) => {
            const device_list = devices.map((device) => {
                return {
                    _id: device.deviceId,
                    type: device.kind,
                    label: device.label
                }
            })
            
            const saved_data = await fetchSavedLocalData("VOICE/VIDEO", "SETTINGS")

            const voice_activation_level = await fetchSavedLocalData("VOICEACTIV", "SENSITIVE")

            return {device_list: device_list, saved_data: saved_data === null ? {} : saved_data, voice_activation_level: voice_activation_level.error ? null : voice_activation_level}
        })
        .catch((err) => {
            return rejectWithValue("Unable To Retrieve Devices");
        })

        return deviceList;
    }
)


const voiceVideoSettingsSlice = createSlice({
    name: "voiceVideoSettingsSlice",
    initialState: {
        audioinput: {
            _id: "",
            type: "",
            label: "Default"
        },
        audiooutput: {
            _id: "",
            type: "",
            label: "Default"
        },
        videoinput: {
            _id: "",
            type: "",
            label: "Default"
        },
        deviceList: [],
        pushToTalk: false,
        voiceActivity: true,
        mirroredWebCam: false,
        noiseSuppression: false,
        echoCancellation: false,
        micInputVolume: 2,
        autoGainControl: false,
        voiceActivationSensitivity: 60,
        voiceDeactivationDelay: 50,
        advancedVoiceActivationDetection: true,
        experimentalAudioCapture: false
    },
    reducers: {
        updateVoiceActivationSensitivity: (state, action) => {
            state.voiceActivationSensitivity = action.payload;

            saveLocalData("VOICEACTIV", "SENSITIVE", {value: action.payload});
        },
        updateMicInputVolume: (state, action) => {

            state.micInputVolume = action.payload;
        
        },
        updateVoiceDeactivationDelay: (state, action) => {

            state.voiceDeactivationDelay = action.payload;

        },
        updateSelectedDevice: (state, action) => {

            state[action.payload.type] = action.payload.device;

        },
        toggleVoiceActivity: (state, action) => {

            state.pushToTalk = !state.pushToTalk;

            state.voiceActivity = !state.voiceActivity;

        },
        toggleSelectedVoiceVideoState: (state, action) => {

            state[action.payload] = !state[action.payload];
            
        },
        toggleAutoGain: (state, action) => {

            state.autoGainControl = !state.autoGainControl;

        },
        handleSaveVoiceVideoSettings: (state, action) => {

            const obj = {
                audioinput: state.audioinput,
                audiooutput: state.audiooutput,
                videoinput: state.videoinput,
                pushToTalk: state.pushToTalk,
                voiceActivity: state.voiceActivity,
                mirroredWebCam: state.mirroredWebCam,
                noiseSuppression: state.noiseSuppression,
                echoCancellation: state.echoCancellation,
                micInputVolume: state.micInputVolume,
                autoGainControl: state.autoGainControl,
                voiceDeactivationDelay: state.voiceDeactivationDelay,
                advancedVoiceActivationDetection: state.advancedVoiceActivationDetection,
                experimentalAudioCapture: state.experimentalAudioCapture
            }
            
            saveLocalData("VOICE/VIDEO", "SETTINGS", obj);
        }
    },
    extraReducers: {
        [getMediaDevices.fulfilled]: (state, action) => {

            const saved_data = action.payload.saved_data;
            console.log(saved_data)
            state.deviceList = action.payload.device_list;

            state.audioinput = saved_data.audioinput ? saved_data.audioinput : {...action.payload.device_list.find(device => {
                if (device.type === 'audioinput' && device.label.search('Default') !== -1) {
                    return device
                } else {
                    return false
                }
            })}

            state.audiooutput = saved_data.audiooutput ? saved_data.audiooutput : {...action.payload.device_list.find(device => {
                if (device.type === 'audiooutput' && device.label.search('Default') !== -1) {
                    return device
                } else {
                    return false
                }
            })}

            state.videoinput = saved_data.videoinput ? saved_data.videoinput : {...action.payload.device_list.find(device => {
                if (device.type === 'videoinput') {
                    return device
                } else {
                    return false
                }
            })}
            
            if (saved_data.audioinput) {
                state.pushToTalk = saved_data.pushToTalk;
                state.voiceActivity = saved_data.voiceActivity;
            }

            if (saved_data.mirroredWebCam) {
                state.mirroredWebCam = saved_data.mirroredWebCam;
            }

            if (saved_data.noiseSuppression) {
                state.noiseSuppression = saved_data.noiseSuppression;
            }

            if (saved_data.echoCancellation) {
                state.echoCancellation = saved_data.echoCancellation;
            }

            if (saved_data.micInputVolume) {
                state.micInputVolume = saved_data.micInputVolume < 2 ? 2 : saved_data.micInputVolume > 5 ? 5 : saved_data.micInputVolume;
            }

            if (saved_data.autoGainControl) {
                state.autoGainControl = saved_data.autoGainControl;
            }

            if (saved_data.voiceDeactivationDelay) {
                state.voiceDeactivationDelay = saved_data.voiceDeactivationDelay;
            }

            if (saved_data.advancedVoiceActivationDetection === false) state.advancedVoiceActivationDetection = false;

            if (saved_data.experimentalAudioCapture) state.experimentalAudioCapture = true;

            if (action.payload.voice_activation_level) {
                
                state.voiceActivationSensitivity = action.payload.voice_activation_level.value;

            }

        },
        [getMediaDevices.rejected]: (state, action) => {
            state.audioinput = {
                _id: "",
                label: action.payload,
                type: "error"
            }
            state.audiooutput = {
                _id: "",
                label: action.payload,
                type: "error"
            }
            state.videoinput = {
                _id: "",
                label: action.payload,
                type: "error"
            }
        }
    }
})

export const selectAudioInputList = state => {
    if (state.voiceVideoSettingsSlice.deviceList.length === 0) return []

    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'audioinput') {
            return device;
        } else {
            return null;
        }
    })
}

export const selectAudioOutputList = state => {
    if (state.voiceVideoSettingsSlice.deviceList.length === 0) return []

    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'audiooutput') {
            return device;
        } else {
            return null;
        }
    })
}

export const selectVideoInputList = state => {
    if (state.voiceVideoSettingsSlice.deviceList.length === 0) return []

    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'videoinput') {
            return device;
        } else {
            return null;
        }
    })
}

export const selectVideoInput = state => state.voiceVideoSettingsSlice.videoinput;

export const selectAudioOutput = state => state.voiceVideoSettingsSlice.audiooutput;

export const selectAudioInput = state => state.voiceVideoSettingsSlice.audioinput;

export const selectPushToTalkState = state => state.voiceVideoSettingsSlice.pushToTalk;

export const selectVoiceActivityState = state => state.voiceVideoSettingsSlice.voiceActivity;

export const selectMirroredWebCamState = state => state.voiceVideoSettingsSlice.mirroredWebCam;

export const selectEchoCancellatio = state => state.voiceVideoSettingsSlice.echoCancellation;

export const selectNoiseSuppression = state => state.voiceVideoSettingsSlice.noiseSuppression;

export const selectMicInputVolume = state => state.voiceVideoSettingsSlice.micInputVolume;

export const selectVoiceActivationSensitivity = state => state.voiceVideoSettingsSlice.voiceActivationSensitivity;

export const selectAutoGainControl = state => state.voiceVideoSettingsSlice.autoGainControl;

export const selectVoiceDeactivationDelayState = state => state.voiceVideoSettingsSlice.voiceDeactivationDelay;

export const selectAdvancedVoiceActivation = state => state.voiceVideoSettingsSlice.advancedVoiceActivationDetection;

export const selectExperimentalAudioCapture = state => state.voiceVideoSettingsSlice.experimentalAudioCapture;

export const {updateVoiceDeactivationDelay, toggleAutoGain, updateVoiceActivationSensitivity, toggleSelectedVoiceVideoState, updateSelectedDevice, toggleVoiceActivity, handleSaveVoiceVideoSettings, updateMicInputVolume } = voiceVideoSettingsSlice.actions;

export default voiceVideoSettingsSlice.reducer;

