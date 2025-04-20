import { createSlice } from "@reduxjs/toolkit";

const channelDescriptionSlice = createSlice({
    name: "channelDescriptionSlice",
    initialState: {
        selectedChannel: {},
    },
    reducers: {
        setChannelDescription: (state, action) => {
            state.selectedChannel = action.payload;
        },
        clearChannelDescription: (state, action) => {
            state.selectedChannel = {};
        }
    }
})

export const {setChannelDescription, clearChannelDescription} = channelDescriptionSlice.actions;

export default channelDescriptionSlice.reducer;
