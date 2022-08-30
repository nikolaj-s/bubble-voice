import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAppAudio, setAppAudio } from "../../../util/LocalData";

export const fetchSavedAppAudioSettings = createAsyncThunk(
    'soundEffectsSlice/fetchSavedAppAudioSettings',
    async (_) => {
        try {

            const volume = await fetchAppAudio();

            return volume;

        } catch (error) {
            return {volume: 1}
        }
    }
)

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
            setAppAudio(action.payload);
        }
    },
    extraReducers: {
        [fetchSavedAppAudioSettings.fulfilled]: (state, action) => {
            state.volume = action.payload.volume;
        }
    }
})

// selectors

export const selectSoundEffect = state => state.soundEffectsSlice.soundEffect;

export const selectSoundEffectVolume = state => state.soundEffectsSlice.volume;

// actions

export const { setSoundEffectsVolume, playSoundEffect } = soundEffectsSlice.actions;

export default soundEffectsSlice.reducer;