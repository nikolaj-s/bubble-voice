import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


const TTL_MS     = 12 * 60 * 60 * 1000; // 12 hours

export const fetchUserRecommendations = createAsyncThunk(
  "fetchUserRecommendations/userRecommendations",
  async (_, { getState, rejectWithValue }) => {
    try {

      const {account} = getState().accountSlice;

      const { token } = getState().authSlice;

      if (!token) return rejectWithValue("Validation Error");

      // 1) Try to load from cache

      const CACHE_KEY = `userRecommendations-${account?._id}`;

      const raw = localStorage.getItem(CACHE_KEY);

      if (raw) {
        try {
          const { timestamp, data } = JSON.parse(raw);
          if (Date.now() - timestamp < TTL_MS) {
            // still fresh—return cached data
            return data;
          }
        } catch {
          // if parse fails, fall back to network
        }
      }

      // 2) Fetch from API
      const response = await axios.get(
        `${API_URL}/recommendations/fetch-user-recommendations`,
        { headers: { TOKEN: token } }
      );
      const result = response.data;

      // 3) Cache if it meets criteria
      if (Array.isArray(result) && result.length > 10) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: result })
        );
      }

      return result;
    } catch (error) {
      return APIErrorHandler(rejectWithValue, error, "Internal Server Error");
    }
  }
);
