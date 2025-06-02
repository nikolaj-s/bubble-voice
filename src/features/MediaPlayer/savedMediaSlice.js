import { createSlice } from "@reduxjs/toolkit";
import { fetchSavedMedia } from "./Thunks/fetchSavedMedia";
import { saveMediaToPlayer } from "./Thunks/saveMediaToPlayer";
import { removeSavedMediaFromPlayer } from "./Thunks/removeSavedMediaFromPlayer";

const savedMediaSlice = createSlice({
    name: 'savedMediaSlice',
    initialState: {
        loading: false,
        error: false,
        saves: {}
    },
    addSavedMedia: (state, action) => {
        if (action.payload.channel_id) {
            state.saves[action.payload.channel_id].push(action.payload.media)
        }
    },
    removeSavedMedia: (state, action) => {
        if (action.payload.channel_id) {
            state.saves[action.payload.channel_id] = state.saves[action.payload.channel_id].filter(m => m._id !== action.payload.media_id)
        }
    },
    extraReducers: (builder) => {
        // fetch saved media
        builder.addCase(fetchSavedMedia.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(fetchSavedMedia.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchSavedMedia.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;
            
            state.saves[action.payload.channelId] = action.payload.media;

            
        })

        // add saved media
        builder.addCase(saveMediaToPlayer.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(saveMediaToPlayer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(saveMediaToPlayer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            if (state.saves[action.payload.channel_id]) {
                state.saves[action.payload.channel_id].unshift(action.payload.media);
            }
        })

        // remove saved media
        builder.addCase(removeSavedMediaFromPlayer.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(removeSavedMediaFromPlayer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(removeSavedMediaFromPlayer.fulfilled, (state, action) => {
            state.loading = false;

            state.error = false;

            if (action.payload.channel_id) {
                state.saves[action.payload.channel_id] = state.saves[action.payload.channel_id].filter(m => m._id !== action.payload.media_id);
            }
        })
    }
})

export const {addSavedMedia, removeSavedMedia} = savedMediaSlice.actions;

export default savedMediaSlice.reducer;

