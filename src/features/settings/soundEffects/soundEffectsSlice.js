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
        muteSoundEffectsWhileMutedState: false,
        soundEffectsQueue: [],
        currentVoiceOver: {label: "Female", state: 'female'},
        voiceOverOptions: [{label: "Female", state: 'female'}, {label: "Male", state: "male"}],
        dynamicVoiceAlerts: false,
        selectedDynamicVoice: 0,
        voices: [],
        rate: 1,
        pitch: 1

    },
    reducers: {
        
        updateCurrentVoiceOver: (state, action) => {

            state.currentVoiceOver = action.payload;

        },

        playSoundEffect: (state, action) => {
           
            if (state.soundEffectsQueue[0] === action.payload) return;

            if (action.payload?.default && (action.payload?.default ===state.soundEffectsQueue[0]?.default)) return;

            state.soundEffectsQueue.push(action.payload);
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
                muteSoundEffectsWhileMutedState: state.muteSoundEffectsWhileMutedState,
                currentVoiceOver: state.currentVoiceOver,
                dynamicVoiceAlerts: state.dynamicVoiceAlerts,
                selectedDynamicVoice: state.selectedDynamicVoice,
                rate: state.rate,
                pitch: state.pitch
            }

            saveLocalData("APPAUDIOPREF", "AUDIOPREF", obj);

        },
        removeSoundEffectFromQueue: (state, action) => {
            state.soundEffectsQueue.shift();
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

            if (action.payload.currentVoiceOver) {
                state.currentVoiceOver = action.payload.currentVoiceOver;
            }

            if (action.payload.dynamicVoiceAlerts) state.dynamicVoiceAlerts = true;

            if (action.payload.selectedDynamicVoice) state.selectedDynamicVoice = action.payload.selectedDynamicVoice;

            if (action.payload.rate) state.rate = action.payload.rate;

            if (action.payload.pitch) state.pitch = action.payload.pitch;
        
            speechSynthesis.getVoices();
        }
    }
})

// selectors

export const selectSoundEffect = state => state.soundEffectsSlice.soundEffect;

export const selectSoundEffectVolume = state => state.soundEffectsSlice.volume;

export const selectSocialSoundEffect = state => state.soundEffectsSlice.socialSoundEffect;

export const selectMuteSoundEffectsWhileMutedState = state => state.soundEffectsSlice.muteSoundEffectsWhileMutedState;

export const selectSoundEffectQueue = state => state.soundEffectsSlice.soundEffectsQueue;

export const selectCurrentVoiceOver = state => state.soundEffectsSlice.currentVoiceOver;

export const selectVoiceOverOptions = state => state.soundEffectsSlice.voiceOverOptions;

export const selectDynamicVoiceAlerts = state => state.soundEffectsSlice.dynamicVoiceAlerts;

export const selectVoices = state => state.soundEffectsSlice.voices;

export const selectCurrentDynamicVoice = state => state.soundEffectsSlice.selectedDynamicVoice;

export const selectVoiceRate = state => state.soundEffectsSlice.rate;

export const selectVoicePitch = state => state.soundEffectsSlice.pitch;


// actions

export const {updateCurrentVoiceOver, removeSoundEffectFromQueue, setSoundEffectsVolume, playSoundEffect, updateSoundEffectsState, handleSaveSoundPrefs } = soundEffectsSlice.actions;

export default soundEffectsSlice.reducer;