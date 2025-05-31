

import { APIErrorHandler } from '../../../lib/handlers/APIErrorHandler/APIErrorHandler';
import axios from 'axios';
import { API_URL } from '../../../lib/Validation';

import { createAsyncThunk } from '@reduxjs/toolkit';

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