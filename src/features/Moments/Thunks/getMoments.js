import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const getMoments = createAsyncThunk(
  'moments/getMoments',
  async ({ channel_id, page = 1, query = '' }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().authSlice;
      const { server_id } = getState().serverDetailsSlice;

      // build params
      const params = { page, server_id };
      if (channel_id) params.channel_id = channel_id;
      if (query)     params.query      = query;

      // cache key includes channel, page & query
      const key = `moments_${server_id}_${channel_id||'all'}_${page}_${query}`;
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const { timestamp, data } = JSON.parse(raw);
        if (Date.now() - timestamp < 1*60*1000) {
          return { ...data, channel_id, page, query };
        }
      }

      const response = await axios.get(`${API_URL}/moments`, {
        params,
        headers: { TOKEN: token }
      });

      const payload = { ...response.data, channel_id, page, query };
      // only cache if we got results
      if (response.data.moments?.length) {
        sessionStorage.setItem(key, JSON.stringify({
          timestamp: Date.now(),
          data: payload
        }));
      }
      return payload;
    } catch (err) {
      console.error(err);
      return APIErrorHandler(rejectWithValue, err);
    }
  }
);
