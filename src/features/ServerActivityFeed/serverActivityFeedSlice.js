import { createSlice } from '@reduxjs/toolkit';

import { fetchServerActivityFeed } from './Thunks/fetchServerActivityFeed';

const serverActivityFeedSlice = createSlice({
  name: 'serverActivityFeedSlice',
  initialState: {
    feeds: {},
    loading: false,
    error: false // { [serverId]: { feed, loading, error, lastFetched } }
  },
  reducers: {
    clearServerActivityFeed(state, action) {
      if (action.payload?.serverId) {
        delete state.feeds[action.payload.serverId];
      } else {
        state.feeds = {};
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchServerActivityFeed.pending, (state, action) => {
        const serverId = action.meta.arg.server_id;
        if (!state.feeds[serverId]) state.feeds[serverId] = {loading: true, error: false};
        
      })
      .addCase(fetchServerActivityFeed.fulfilled, (state, action) => {
        const { server_id, feed } = action.payload;
        state.feeds[server_id] = {
          feed,
          lastFetched: Date.now(),
          loading: false
        };
      })
      .addCase(fetchServerActivityFeed.rejected, (state, action) => {
        const serverId = action.meta.arg.server_id;
        state.feeds[serverId] = {loading: false, error: action.payload};
      });
  }
});

export const { clearServerActivityFeed } = serverActivityFeedSlice.actions;

// Selector for use in components
export const selectActivityFeedByServerId = (state, serverId) =>
  state.serverActivityFeed.feeds[serverId] || { feed: [] };

export default serverActivityFeedSlice.reducer;

