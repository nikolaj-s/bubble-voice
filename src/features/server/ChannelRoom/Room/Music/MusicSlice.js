import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMusicWidgetVolume } from "../../../../../util/LocalData";
import { throwServerError } from "../../../ServerSlice";
import { socket } from "../../../ServerBar/ServerBar";

export const handleAddingMedia = createAsyncThunk(
    'MusicSlice/handleAddingMedia',
    async (query, {rejectWithValue, dispatch}) => {
        try {

            await socket.request('add song to queue', {query: query})
            .then(response => {
                return true;
            })
            .catch(error => {
                console.log(error);
                
                dispatch(throwServerError({error: true, errorMessage: error}))
            
                return true;
            })

            return;
        } catch (error) {
            dispatch(throwServerError({error: true, errorMessage: error}))
            return rejectWithValue(true);
        }
    }
)

const MusicSlice = createSlice({
    name: 'MusicSlice',
    initialState: {
        playing: false,
        queue: [],
        error: false,
        errorMessage: "",
        volume: 25,
        expanded: false,
        loading: false
    },
    reducers: {
        toggleMusicPlaying: (state, action) => {
            state.playing = action.payload;
        },
        like_song: (state, action) => {
            const s_index = state.queue.findIndex(s => s._id === action.payload.song._id);

            if (s_index === -1) return;

            state.queue[s_index].liked = true;
        },
        un_like_song: (state, action) => {
            const s_index = state.queue.findIndex(s => s._id === action.payload.song._id);

            if (s_index === -1) return;

            state.queue[s_index].liked = false;
        },
        addSongToQueue: (state, action) => {

            const index = state.queue.findIndex(song => song._id === action.payload._id);

            if (index !== -1) return;

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
        },
        removeSongFromQueue: (state, action) => {

            const m_index = state.queue.findIndex(s => s._id === action.payload.song._id);

            if (m_index === -1) return;

            state.queue.splice(m_index, 1);
        },
        toggleMusicExpanded: (state, action) => {
            state.expanded = action.payload;
        },
        toggleLoadingMusic: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: {
        [handleAddingMedia.pending]: (state, action) => {
            state.loading = true;
        },
        [handleAddingMedia.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [handleAddingMedia.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})

// selectors
export const selectMusicError = state => state.MusicSlice.error;

export const selectMusicErrorMessage = state => state.MusicSlice.errorMessage;

export const selectMusicQueue = state => state.MusicSlice.queue;

export const selectMusicPlayingState = state => state.MusicSlice.playing;

export const selectMusicVolume = state => state.MusicSlice.volume;

export const selectMusicExpanded = state => state.MusicSlice.expanded;

export const selectLoadingMusicState = state => state.MusicSlice.loading;

// actions
export const {toggleLoadingMusic,toggleMusicExpanded, removeSongFromQueue, un_like_song, like_song, toggleMusicPlaying, addSongToQueue, skipSong, updateMusicState, throwMusicError, updateMusicVolume} = MusicSlice.actions;

export default MusicSlice.reducer;