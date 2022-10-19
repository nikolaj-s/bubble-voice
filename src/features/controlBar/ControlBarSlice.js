import { createSlice } from "@reduxjs/toolkit";


const controlBarSlice = createSlice({
    name: 'controlBarSlice',
    initialState: {
        microphoneState: true,
        webCamState: true,
        audioState: true,
        screenShareState: true,
        screens: [],
        selectingScreens: false,
        currentScreen: null,
        loadingWebCam: false,
        loadingScreenShare: false
    },
    reducers: {
        toggleLoadingScreenShare: (state, action) => {
            state.loadingScreenShare = action.payload;
        },
        toggleLoadingWebCam: (state, action) => {

            state.loadingWebCam = action.payload;

        },
        toggleControlState: (state, action) => {
            if (state[action.payload] === true) {
                state[action.payload] = false;
            } else {
                state[action.payload] = true;
            }
        },
        setScreens: (state, action) => {
            state.screens = action.payload;
        },
        setSelectedScreen: (state, action) => {
            state.setSelectedScreen = action.payload;
        },
        resetControlState: (state, action) => {
            state.microphoneState = true;
            state.webCamState = true;
            state.audioState = true;
            state.screenShareState = true;
        },
        setSelectingScreensState: (state, action) => {
            state.selectingScreens = action.payload;
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload;
        }
    }
})

// selectors

export const selectMicrophoneState = state => state.controlBarSlice.microphoneState;

export const selectWebCamState = state => state.controlBarSlice.webCamState;

export const selectAudioState = state => state.controlBarSlice.audioState;

export const selectScreenShareState = state => state.controlBarSlice.screenShareState;

export const selectScreens = state => state.controlBarSlice.screens;

export const selectCurrentScreen = state => state.controlBarSlice.currentScreen;

export const selectingScreensState = state => state.controlBarSlice.selectingScreens;

export const selectLoadingWebCam = state => state.controlBarSlice.loadingWebCam;

export const selectLoadingScreenShare = state => state.controlBarSlice.loadingScreenShare;

// actions

export const { toggleLoadingScreenShare, toggleLoadingWebCam, setCurrentScreen, setSelectingScreensState, resetControlState, toggleControlState, setScreens, setSelectedScreen } = controlBarSlice.actions;

export default controlBarSlice.reducer;