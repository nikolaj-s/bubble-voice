import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMediaDevices = createAsyncThunk(
    'voiceVideoSettingsSlice/getMediaDevices',
    async (_, {rejectWithValue}) => {
        const deviceList = navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            return devices.map((device) => {
                return {
                    _id: device.deviceId,
                    type: device.kind,
                    label: device.label
                }
            })
        })
        .catch((err) => {
            rejectWithValue("Unable To Retrieve Devices");
        })
        
        return deviceList;
    }
)

const voiceVideoSettingsSlice = createSlice({
    name: "voiceVideoSettingsSlice",
    initialState: {
        audioInput: {
            _id: "",
            type: "",
            label: "Audio Technica"
        },
        audioOutput: {
            _id: "",
            type: "",
            label: "Spidf"
        },
        videoInput: {
            _id: "",
            type: "",
            label: "Web Cam"
        },
        deviceList: [],
    },
    reducers: {
        updateSelectedDevice: (state, action) => {
            state[action.payload.type] = action.payload.device;
        }
    },
    extraReducers: {
        [getMediaDevices.pending]: (state, action) => {

        },
        [getMediaDevices.fulfilled]: (state, action) => {
            state.deviceList = action.payload;
        },
        [getMediaDevices.rejected]: (state, action) => {

        }
    }
})

export const selectAudioInputList = state => {
    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'audioinput') {
            return device
        }
    })
}

export const selectAudioOutputList = state => {
    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'audiooutput') {
            return device
        }
    })
}

export const selectVideoInputList = state => {
    return state.voiceVideoSettingsSlice.deviceList.filter(device => {
        if (device.type === 'videoinput') {
            return device
        }
    })
}

export const selectVideoInput = state => state.voiceVideoSettingsSlice.videoInput;

export const selectAudioOutput = state => state.voiceVideoSettingsSlice.audioOutput;

export const selectAudioInput = state => state.voiceVideoSettingsSlice.audioInput;

export const {updateSelectedDevice} = voiceVideoSettingsSlice.actions;

export default voiceVideoSettingsSlice.reducer;

