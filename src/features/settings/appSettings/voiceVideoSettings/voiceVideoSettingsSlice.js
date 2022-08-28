import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSavedVoiceVideoSettings, saveVoiceVideoSettings } from "../../../../util/LocalData";

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
            
            const saved_data = await fetchSavedVoiceVideoSettings()
            console.log(saved_data)
            return {device_list: device_list, saved_data: saved_data}
        })
        .catch((err) => {
            return rejectWithValue("Unable To Retrieve Devices");
        })
        console.log(deviceList)
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
    },
    reducers: {
        updateSelectedDevice: (state, action) => {
            state[action.payload.type] = action.payload.device;
            const obj = {
                audioinput: state.audioinput,
                audiooutput: state.audiooutput,
                videoinput: state.videoinput,
                pushToTalk: state.pushToTalk,
                voiceActivity: state.voiceActivity
            }
            
            saveVoiceVideoSettings(obj)
        },
        toggleVoiceActivity: (state, action) => {
            state.pushToTalk = !state.pushToTalk;
            state.voiceActivity = !state.voiceActivity;

            const obj = {
                audioinput: state.audioinput,
                audiooutput: state.audiooutput,
                videoinput: state.videoinput,
                pushToTalk: state.pushToTalk,
                voiceActivity: state.voiceActivity
            }
            
            saveVoiceVideoSettings(obj)
        },
    },
    extraReducers: {
        [getMediaDevices.pending]: (state, action) => {

        },
        [getMediaDevices.fulfilled]: (state, action) => {

            const saved_data = action.payload.saved_data;
            
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
    if (state.voiceVideoSettingsSlice.deviceList === []) return []

    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'audioinput') {
            return device;
        } else {
            return null;
        }
    })
}

export const selectAudioOutputList = state => {
    if (state.voiceVideoSettingsSlice.deviceList === []) return []

    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'audiooutput') {
            return device;
        } else {
            return null;
        }
    })
}

export const selectVideoInputList = state => {
    if (state.voiceVideoSettingsSlice.deviceList === []) return []

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

export const {updateSelectedDevice, toggleVoiceActivity} = voiceVideoSettingsSlice.actions;

export default voiceVideoSettingsSlice.reducer;

