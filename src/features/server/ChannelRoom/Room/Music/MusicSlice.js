import { createSlice } from "@reduxjs/toolkit";
import { setMusicWidgetVolume } from "../../../../../util/LocalData";


const MusicSlice = createSlice({
    name: 'MuscSlice',
    initialState: {
        playing: false,
        queue: [],
        error: false,
        errorMessage: "",
        volume: 25
    },
    reducers: {
        toggleMusicPlaying: (state, action) => {
            state.playing = action.payload;
        },
        addSongToQueue: (state, action) => {

            if (state.queue.length === 0) state.playing = true;

            state.queue.push(action.payload);
        },
        skipSong: (state, action) => {
            state.queue.shift();
        },
        updateMusicState: (state, action) => {
            state.queue = action.payload.queue;
            
            state.playing = action.payload.playing;
        },
        throwMusicError: (state, action) => {
            state.error = action.payload.error;

            state.errorMessage = action.payload.errorMessage;
        },
        updateMusicVolume: (state, action) => {
            
            state.volume = action.payload;

            setMusicWidgetVolume(action.payload);
        }
    }
})

// selectors
export const selectMusicError = state => state.MusicSlice.error;

export const selectMusicErrorMessage = state => state.MusicSlice.errorMessage;

export const selectMusicQueue = state => state.MusicSlice.queue;

export const selectMusicPlayingState = state => state.MusicSlice.playing;

export const selectMusicVolume = state => state.MusicSlice.volume;

// actions
export const {toggleMusicPlaying, addSongToQueue, skipSong, updateMusicState, throwMusicError, updateMusicVolume} = MusicSlice.actions;

export default MusicSlice.reducer;