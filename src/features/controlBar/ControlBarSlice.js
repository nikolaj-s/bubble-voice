import { createSlice } from "@reduxjs/toolkit";


const controlBarSlice = createSlice({
    name: 'controlBarSlice',
    initialState: {
        microphoneState: true,
        webCamState: true,
        audioState: true,
        screenShareState: true
    },
    reducers: {
        toggleControlState: (state, action) => {
            if (state[action.payload] === true) {
                state[action.payload] = false;
            } else {
                state[action.payload] = true;
            }
        }
    }
})

// selectors

export const selectMicrophoneState = state => state.controlBarSlice.microphoneState;

export const selectWebCamState = state => state.controlBarSlice.webCamState;

export const selectAudioState = state => state.controlBarSlice.audioState;

export const selectScreenShareState = state => state.controlBarSlice.screenShareState;

// actions

export const { toggleControlState } = controlBarSlice.actions;

export default controlBarSlice.reducer;