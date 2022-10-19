import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSavedLocalData, saveLocalData } from "../../../util/LocalData";

export const fetchSavedAppAudioSettings = createAsyncThunk(
    'soundEffectsSlice/fetchSavedAppAudioSettings',
    async (_) => {
        try {

            const volume = await fetchSavedLocalData("APPAUDIO", "LEVEL");

            const audioPrefs = await fetchSavedLocalData("APPAUDIOPREF", "AUDIOPREF");
            
            return {...volume, ...audioPrefs};

        } catch (error) {
            return {volume: 1}
        }
    }
)

const soundEffectsSlice = createSlice({
    name: "soundEffectsSlice",
    initialState: {
        soundEffect: "",
        volume: 1,
        socialSoundEffect: true,
        muteSoundEffectsWhileMutedState: false
    },
    reducers: {
        playSoundEffect: (state, action) => {
            state.soundEffect = action.payload;
        },
        setSoundEffectsVolume: (state, action) => {
            state.volume = action.payload;

            saveLocalData("APPAUDIO", "LEVEL", {volume: action.payload});
        },
        updateSoundEffectsState: (state, action) => {

            state[action.payload.type] = action.payload.state;

        },
        handleSaveSoundPrefs: (state, action) => {

            const obj = {
                socialSoundEffect: state.socialSoundEffect,
                muteSoundEffectsWhileMutedState: state.muteSoundEffectsWhileMutedState
            }

            saveLocalData("APPAUDIOPREF", "AUDIOPREF", obj);

        }

    },
    extraReducers: {
        [fetchSavedAppAudioSettings.fulfilled]: (state, action) => {

            state.volume = action.payload?.volume ? action.payload.volume : 1;

            if (action.payload.socialSoundEffect !== undefined) {

                state.socialSoundEffect = action.payload.socialSoundEffect;
            
            }

            if (action.payload.muteSoundEffectsWhileMutedState !== undefined) {
                
                state.muteSoundEffectsWhileMutedState = action.payload.muteSoundEffectsWhileMutedState;

            }
        }
    }
})

// selectors

export const selectSoundEffect = state => state.soundEffectsSlice.soundEffect;

export const selectSoundEffectVolume = state => state.soundEffectsSlice.volume;

export const selectSocialSoundEffect = state => state.soundEffectsSlice.socialSoundEffect;

export const selectMuteSoundEffectsWhileMutedState = state => state.soundEffectsSlice.muteSoundEffectsWhileMutedState;

// actions

export const { setSoundEffectsVolume, playSoundEffect, updateSoundEffectsState, handleSaveSoundPrefs } = soundEffectsSlice.actions;

export default soundEffectsSlice.reducer;