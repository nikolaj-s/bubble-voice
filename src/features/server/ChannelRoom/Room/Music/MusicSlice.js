import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSavedLocalData, saveLocalData, setMusicWidgetVolume } from "../../../../../util/LocalData";
import { throwServerError } from "../../../ServerSlice";
import { socket } from "../../../ServerBar/ServerBar";

export const handleAddingMedia = createAsyncThunk(
    'MusicSlice/handleAddingMedia',
    async ({query, song}, {rejectWithValue, dispatch, getState}) => {
        try {

            const { queue } = getState().MusicSlice;

            let inQueue = false;

            if (song) {
                for (const s of queue) {
                    if (s.id === song.id) {
                        inQueue = true;
                        break;
                    }
                }
            }
            
            if (inQueue) {
                dispatch(throwServerError({error: true, errorMessage: "Media Already In Queue"}));
                return true;
            }

            await socket.request('add song to queue', {query: query, song: song})
            .then(response => {
                return true;
            })
            .catch(error => {
                console.log(error);
                
                dispatch(throwServerError({error: true, errorMessage: error.message}))
            
                return true;
            })

            return;
        } catch (error) {
            dispatch(throwServerError({error: true, errorMessage: error.message}))
            return rejectWithValue(true);
        }
    }
)

export const searchMedia = createAsyncThunk(
    'MusicSlice/searchMedia',
    async (query, {rejectWithValue, dispatch}) => {
        try {

            const results = await socket.request('search media', {query: query})
            .then(res => {
                return res;
            })

            if (results.error) {
                dispatch({error: true, errorMessage: results.errorMessage});
                return rejectWithValue(true);
            }
            console.log(results)
            return results.results;

        } catch (error) {
            dispatch(throwServerError({error: true, errorMessage: error.message}));
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

export const fetchRecentSongs = createAsyncThunk(
    'MusicSlice/fetchRecentSongs',
    async () => {
        try {

            const data = await socket.request('fetch recent songs').then(res => {
                return res;
            })
            .catch (err => {
                return {error: true}
            })

            if (data.error) return [];

            return data.songs;

        } catch (error) {
            return [];
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
        time: 0,
        savesVisible: false,
        resultsVisible: true,
        results: [],
        loadingSearchResults: false,
        recentSongs: [],
        loadingRecentSongs: false,
        openOverlay: false,
        lastInteracted: 0
    },
    reducers: {
        toggleOverlay: (state, action) => {
            state.openOverlay = !state.openOverlay;
        },
        toggleSavesVisible: (state, action) => {
            state.savesVisible = !state.savesVisible;
            state.resultsVisible = !state.savesVisible;
        },
        toggleResultsVisible: (state, action) => {
            state.resultsVisible = !state.resultsVisible;
            state.savesVisible = !state.resultsVisible;
        },
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
            state.lastInteracted = new Date.getTime();
        },
        [handleAddingMedia.rejected]: (state, action) => {
            state.loading = false;
        },
        [handleFetchPersistedMusicSettings.fulfilled]: (state, action) => {
            if (action.payload.mute) state.mute = true;

            if (action.payload.volume) state.volume = action.payload.volume;
        },
        [searchMedia.pending]: (state, action) => {
            state.loading = true;
        },
        [searchMedia.rejected]: (state, action) => {
            state.loading = false;
        },
        [searchMedia.fulfilled]: (state, action) => {
            state.loading = false;
            state.results = action.payload;
            state.resultsVisible = true;
            state.savesVisible = false;
        },
        [fetchRecentSongs.pending]: (state, action) => {
            state.loadingRecentSongs = true;
        },
        [fetchRecentSongs.fulfilled]: (state, action) => {
            state.loadingRecentSongs = false;
            state.recentSongs = action.payload;
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

export const selectSavesVisible = state => state.MusicSlice.savesVisible;

export const selectSearchResultsVisible = state => state.MusicSlice.resultsVisible;

export const selectSearchResults = state => state.MusicSlice.results;

export const selectRecentSongs = state => state.MusicSlice.recentSongs;

export const selectLoadingRecentSongs = state => state.MusicSlice.loadingRecentSongs;

export const selectOverlayOpenState = state => state.MusicSlice.openOverlay;

// actions
export const {toggleOverlay, toggleResultsVisible, toggleSavesVisible, setTime, setMediaColor, toggleMuted, toggleBehind, toggleLoadingMusic,toggleMusicExpanded, removeSongFromQueue, un_like_song, like_song, toggleMusicPlaying, addSongToQueue, skipSong, updateMusicState, throwMusicError, updateMusicVolume} = MusicSlice.actions;

export default MusicSlice.reducer;