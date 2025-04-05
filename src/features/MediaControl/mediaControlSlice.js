import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {

    const usingPushToTalk = JSON.parse(localStorage.getItem('usingPushToTalk'));

    const voiceThreshold = JSON.parse(localStorage.getItem('voiceThreshold'));

    return {
        isAudioMuted: false,
        isWebcamOn: false,
        isScreenSharing: false,
        isMicrophoneMuted: false,
        microphoneError: false,
        cameraError: false,
        screenShareError: false,
        loading: false,
        usingPushToTalk: usingPushToTalk || false,
        isPushToTalkActive: false,
        voiceThreshold: voiceThreshold || 25
    }
}


const mediaControlSlice = createSlice({
    name: "mediaControlSlice",
    initialState,
    reducers: {
        setVoiceThreshold: (state, action) => {
           
            state.voiceThreshold = action.payload;

            localStorage.setItem('voiceThreshold', state.voiceThreshold);
        },
        toggleUsingPushToTalk: (state) => {
            state.usingPushToTalk = !state.usingPushToTalk;

            localStorage.setItem('usingPushToTalk', state.usingPushToTalk);
        },
        togglePushToTalkActive: (state, action) => {
            state.isPushToTalkActive = action.payload;
        },
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

            state.isMicrophoneMuted = !state.isMicrophoneMuted;

            if (state.isAudioMuted === true && !state.isMicrophoneMuted) {
                state.isAudioMuted = false;
            }

        },
        toggleAudioMute: (state, action) => {
            if (state.loading) return;

            state.isAudioMuted = !state.isAudioMuted;

            if (state.isAudioMuted && !state.isMicrophoneMuted) {
                state.isMicrophoneMuted = true;
            } else if (!state.isAudioMuted && state.isMicrophoneMuted) {
                state.isMicrophoneMuted = false;
            }
        },
        toggleMediaControlLoading: (state,action) => {
            state.loading = action.payload;
        },

    }
})

export const {
    toggleAudioMute,
    toggleWebcam,
    toggleMicrophone,
    toggleScreenShare,
    toggleMediaControlLoading,
    togglePushToTalkActive,
    toggleUsingPushToTalk,
    setVoiceThreshold
} = mediaControlSlice.actions;

export default mediaControlSlice.reducer;