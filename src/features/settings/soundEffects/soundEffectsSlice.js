import { createSlice } from "@reduxjs/toolkit";


const soundEffectsSlice = createSlice({
    name: "soundEffectsSlice",
    initialState: {
        soundEffect: "",
        volume: 1
    },
    reducers: {
        playSoundEffect: (state, action) => {
            state.soundEffect = action.payload;
        },
        setSoundEffectsVolume: (state, action) => {
            state.volume = action.payload;
        }
    }
})

// selectors

export const selectSoundEffect = state => state.soundEffectsSlice.soundEffect;

export const selectSoundEffectVolume = state => state.soundEffectsSlice.volume;

// actions

export const { setSoundEffectsVolume, playSoundEffect } = soundEffectsSlice.actions;

export default soundEffectsSlice.reducer;