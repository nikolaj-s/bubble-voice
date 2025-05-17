

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../lib/Validation';
import { APIErrorHandler } from '../../../lib/handlers/APIErrorHandler/APIErrorHandler';

export const fetchSavedMedia = createAsyncThunk(
  'savedMediaSlice/fetchSavedMedia',
  async (channelId, { getState, rejectWithValue }) => {
    try {

      const { token } = getState().authSlice;

      const existing = getState().savedMediaSlice.saves[channelId];

      const {server_id} = getState().serverDetailsSlice;

      if (existing) {
        // Return early if cached
        return { channelId, media: existing.items, cached: true };
      }

      const response = await axios({
        url: `${API_URL}/media/fetch-media-widget-saves`,
        method: 'GET',
        headers: { TOKEN: token },
        params: {channel_id: channelId, server_id}
      });

      return { channelId, media: response.data, cached: false };
    } catch (error) {
      console.log(error);
      return APIErrorHandler(rejectWithValue, error, `Failed to fetch saved media for channel ${channelId}`);
    }
  }
);
