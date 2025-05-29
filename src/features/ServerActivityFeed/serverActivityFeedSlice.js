import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIErrorHandler } from '../../lib/handlers/APIErrorHandler/APIErrorHandler';
import axios from 'axios';
import { API_URL } from '../../lib/Validation';

const FEED_CACHE_TTL = 1000 * 60 * 3; // 3 minutes (adjust as needed)

export const fetchServerActivityFeed = createAsyncThunk(
  'serverActivityFeedSlice/fetchServerActivityFeed',
  async ({ limit = 30 }, { getState, rejectWithValue }) => {

    const {server_id} = getState().serverDetailsSlice;

    const {token} = getState().authSlice;

    if (!server_id) return rejectWithValue("You are not currently in a server");

    const state = getState().serverActivityFeed;

    const serverFeed = state.feeds[server_id];

    // Use cached if exists and not stale
    if (
      serverFeed &&
      serverFeed.feed &&
      Date.now() - serverFeed.lastFetched < FEED_CACHE_TTL
    ) {
      // Already in cache and fresh enough; skip fetching
      return { server_id, feed: serverFeed.feed, fromCache: true };
    }

    try {
        const response = await axios({
            method: "GET",
            url: `${API_URL}/activity-feed/server/${server_id}?limit=${limit}`,
            headers: {TOKEN: token}
        })

        return { server_id, feed: response.data, fromCache: false };
    } catch (error) {
        return APIErrorHandler(rejectWithValue, error)
    }
  }
);

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
        if (!state.feeds[serverId]) state.feeds[serverId] = {};
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServerActivityFeed.fulfilled, (state, action) => {
        const { serverId, feed } = action.payload;
        state.feeds[serverId] = {
          feed,
          lastFetched: Date.now(),
        };
      })
      .addCase(fetchServerActivityFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearServerActivityFeed } = serverActivityFeedSlice.actions;

// Selector for use in components
export const selectActivityFeedByServerId = (state, serverId) =>
  state.serverActivityFeed.feeds[serverId] || { feed: [] };

export default serverActivityFeedSlice.reducer;

