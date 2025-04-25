import { createSlice } from "@reduxjs/toolkit";

const expandedVideoSlice = createSlice({
    name: "expandedVideoSlice",
    initialState: {
        video: {}
    },
    reducers: {
        expandVideo: (state, action) => {
            state.video = action.payload;
        }
    }
})

export const {expandVideo} = expandedVideoSlice.actions;

export default expandedVideoSlice.reducer;