import { createSlice } from "@reduxjs/toolkit";

const voiceChannelSlice = createSlice({
    name: "voiceChannelSlice",
    initialState: {
        loading: false,
        error: false,
        hideNonVideoUsers: false,
        currentVoiceChannel: null,
        focused: false
    },
    reducers: {
        setVoiceChannelFocused: (state, action) => {
            state.focused = action.payload;
        },
        setCurrentVoiceChannel: (state, action) => {
            console.log(action.payload);
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

export const {setCurrentVoiceChannel, toggleVoiceChannelLoading, setVoiceChannelError, clearVoiceChannelState, toggleVoiceChannelOptions, setVoiceChannelFocused} = voiceChannelSlice.actions;

export default voiceChannelSlice.reducer;