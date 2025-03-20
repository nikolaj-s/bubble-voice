import { createSlice } from "@reduxjs/toolkit";


const mediaControlSlice = createSlice({
    name: "mediaControlSlice",
    initialState: {
        isAudioMuted: false,
        isWebcamOn: false,
        isScreenSharing: false,
        isMicrophoneMuted: false,
        microphoneError: false,
        cameraError: false,
        screenShareError: false,
        loading: false
    },
    reducers: {
        toggleScreenShare: (state, action) => {
            if (state.loading) return;

            state.isScreenSharing = !state.isScreenSharing
        },
        toggleWebcam: (state, action) => {
            if (state.loading) return;

            state.isWebcamOn = !state.isWebcamOn;
        },
        toggleMicrophone: (state, action) => {
            if (state.loading) return;

            state.isMicrophoneMuted = action.payload;

            if (state.isAudioMuted === true && action.payload === false) {
                state.isAudioMuted = false;
            }

        },
        toggleAudioMute: (state, action) => {
            if (state.loading) return;

            state.isAudioMuted = action.payload;

            state.isMicrophoneMuted = action.payload;
        },
        toggleMediaControlLoading: (state,action) => {
            state.loading = action.payload;
        }
    }
})

export const {
    toggleAudioMute,
    toggleWebcam,
    toggleMicrophone,
    toggleScreenShare,
    toggleMediaControlLoading
} = mediaControlSlice.actions;

export default mediaControlSlice.reducer;