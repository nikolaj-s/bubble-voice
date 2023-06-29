import { createSlice } from "@reduxjs/toolkit";


const AudioInitSlice = createSlice({
    name: "AudioInitSlice",
    initialState: {
        amplifyLevel: 1
    },
    reducers: {
        handleAmplifyLevel: (state, action) => {

        }
    }
})

export const selectAmplifyLevel = state => state.AudioInitSlice.amplifyLevel;

export const { handleAmplifyLevel } = AudioInitSlice.actions;

export default AudioInitSlice.reducer;