import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../Settings/Appearance/State/appearanceState";

const voiceChannelSlice = createSlice({
    name: "voiceChannelSlice",
    initialState: {
        loading: false,
        error: false,
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
        }
    }
})

export const {setCurrentVoiceChannel, toggleVoiceChannelLoading, setVoiceChannelError, clearVoiceChannelState} = voiceChannelSlice.actions;

export default voiceChannelSlice.reducer;