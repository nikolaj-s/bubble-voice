
import { createSlice } from '@reduxjs/toolkit';

import { fetchServerRecommendations } from './Thunks/fetchServerRecommendations';


const serverRecommendationsSlice = createSlice({
    name: 'serverRecommendationsSlice',
    initialState: {
      mediaByServer: {}, // keyed by server_id
      loading: true,
      error: null
    },
    reducers: {
      clearRecommendations: (state) => {
        state.mediaByServer = {};
        state.loading = false;
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchServerRecommendations.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchServerRecommendations.fulfilled, (state, action) => {
          const { server_id, cached, mediaOfTheDay, media } = action.payload;
          state.loading = false;
  
          // Do not overwrite if cached
          if (cached) return;
  
          state.mediaByServer[server_id] = {
            mediaOfTheDay,
            media,
          };
        })
        .addCase(fetchServerRecommendations.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch recommendations';
        });
    }
  });

export const { clearRecommendations } = serverRecommendationsSlice.actions;

export default serverRecommendationsSlice.reducer;
