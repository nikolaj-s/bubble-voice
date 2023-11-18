import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSavedLocalData, saveLocalData, setMusicWidgetVolume } from "../../../../../util/LocalData";
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

export const handleFetchPersistedMusicSettings = createAsyncThunk(
    'MusicSlice/handleFetchPersistedMusicSettings',
    async () => {
        try {

            const data = await fetchSavedLocalData("MEDIA", "WIDGET")
            .then(res => res);

            if (!data || data.error) return {};
            console.log(data);
            return data;

        } catch (e) {

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
        loading: false,
        behind: false,
        mute: false,
        color: "",
        time: 0
    },
    reducers: {
        toggleMuted: (state, action) => {
            state.mute = !state.mute;

            saveLocalData("MEDIA", "WIDGET", {
                mute: state.mute,
                volume: state.volume
            })
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
        toggleBehind: (state, action) => {
            state.behind = action.payload;
        },
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

            saveLocalData("MEDIA", "WIDGET", {
                mute: state.mute,
                volume: state.volume
            })
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
        },
        setMediaColor: (state, action) => {
            state.color = action.payload;
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
        },
        [handleFetchPersistedMusicSettings.fulfilled]: (state, action) => {
            if (action.payload.mute) state.mute = true;

            if (action.payload.volume) state.volume = action.payload.volume;
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

export const selectBehindState = state => state.MusicSlice.behind;

export const selectMuteState = state => state.MusicSlice.mute;

export const selectMediaColor = state => state.MusicSlice.color;

export const selectTime = state => state.MusicSlice.time;

// actions
export const {setTime, setMediaColor, toggleMuted, toggleBehind, toggleLoadingMusic,toggleMusicExpanded, removeSongFromQueue, un_like_song, like_song, toggleMusicPlaying, addSongToQueue, skipSong, updateMusicState, throwMusicError, updateMusicVolume} = MusicSlice.actions;

export default MusicSlice.reducer;