import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const getMoments = createAsyncThunk(
  'getMoments/momentsSlice',
  async ({ channel_id, page = 1 }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().authSlice;
      const { server_id } = getState().serverDetailsSlice;

      // Build a cache key that includes server, channel, and page
      const cacheKey = `moments_${server_id}_${channel_id}_${page}`;
      const rawCache = sessionStorage.getItem(cacheKey);
      if (rawCache) {
        const { timestamp, data } = JSON.parse(rawCache);
        // If cached less than 10 minutes ago ago, return it
        if (Date.now() - timestamp < 10 * 60 * 1000) {
          return { ...data, channel_id };
        }
      }

      // Otherwise, fetch from API
      const response = await axios({
        method: "GET",
        url: `${API_URL}/moments`,
        params: { page, server_id, channel_id },
        headers: { TOKEN: token }
      });

      // Cache the fresh response
      const toCache = {
        timestamp: Date.now(),
        data: response.data
      };
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(toCache));
      } catch {
        // fail silently if storage quota exceeded
      }

      return { ...response.data, channel_id };
    } catch (error) {
      console.log(error);
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);
