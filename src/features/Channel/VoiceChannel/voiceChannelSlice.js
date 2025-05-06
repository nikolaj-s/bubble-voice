import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../Settings/Appearance/State/appearanceState";

const voiceChannelSlice = createSlice({
    name: "voiceChannelSlice",
    initialState: {
        loading: false,
        error: false,
        hideNonVideoUsers: false,
        currentVoiceChannel: null
    },
    reducers: {
        setCurrentVoiceChannel: (state, action) => {
            state.currentVoiceChannel = action.payload;
        },
        toggleVoiceChannelLoading: (state, action) => {
            state.loading = action.payload;
        },
        setVoiceChannelError: (state, action) => {
            state.error = action.payload;
        },
        clearVoiceChannelState: (state,action) => {
            state.currentVoiceChannel = null;
        },
        toggleVoiceChannelOptions: (state, action) => {
            state[action.payload] = !state[action.payload];
        }
    }
})

export const {setCurrentVoiceChannel, toggleVoiceChannelLoading, setVoiceChannelError, clearVoiceChannelState, toggleVoiceChannelOptions} = voiceChannelSlice.actions;

export default voiceChannelSlice.reducer;