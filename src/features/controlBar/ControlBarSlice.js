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
        currentScreenName: "",
        loadingWebCam: false,
        loadingScreenShare: false,
        connectionLoading: false,
        connectionError: false,
        webcamPreview: false,
        showStreamingMessage: false,
        seenStreamingMessageThisSession: false
    },
    reducers: {
        toggleStreamingMessage: (state, action) => {

            if (action.payload === false) {
                state.seenStreamingMessageThisSession = true;
            }

            state.showStreamingMessage = action.payload;
        },
        toggleWebCamPreview: (state, action) => {
            state.webcamPreview = !state.webcamPreview;
        },
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
            state.loadingWebCam = false;
            state.loadingScreenShare = false;
        },
        setSelectingScreensState: (state, action) => {
            state.selectingScreens = action.payload;
        },
        setCurrentScreen: (state, action) => {
            state.selectingScreens = false;

            if (!action.payload?.id) {
                state.currentScreen = null;
            } else {
                state.currentScreen = action.payload.id;
                state.currentScreenName = action.payload.name;
            }

            
        },
        manuallySetMicrophoneState: (state, action) => {

            if (!state.audioState) return;

            state.microphoneState = action.payload;
        },
        toggleConnectionLoading: (state, action) => {
            state.connectionLoading = action.payload;
        },
        toggleConnectionError: (state, action) => {
            state.connectionError = action.payload;
        },
        closeScreenShareMenu: (state, action) => {
            state.selectingScreens = false;
            state.screenShareState = true;
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

export const selectConnectionLoading = state => state.controlBarSlice.connectionLoading;

export const selectConnectionError = state => state.controlBarSlice.connectionError;

export const selectCurrentScreenName = state => state.controlBarSlice.currentScreenName;

export const selectWebCamPreview = state => state.controlBarSlice.webcamPreview;

export const selectStreamingMessage = state => state.controlBarSlice.showStreamingMessage;

export const selectSeenStreamingMessage = state => state.controlBarSlice.seenStreamingMessageThisSession;
// actions

export const {manuallySetMicrophoneState, toggleStreamingMessage,closeScreenShareMenu, toggleWebCamPreview, toggleConnectionLoading, toggleConnectionError, toggleLoadingScreenShare, toggleLoadingWebCam, setCurrentScreen, setSelectingScreensState, resetControlState, toggleControlState, setScreens, setSelectedScreen } = controlBarSlice.actions;

export default controlBarSlice.reducer;