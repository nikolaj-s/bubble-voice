import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

// Cache key & TTL (12 hours)

const CACHE_TTL = 1 * 60 * 60 * 1000; // 12 hours in ms

export const getSubscriptions = createAsyncThunk(
  "getSubscriptions/subscriptionsSlice",
  async (refresh = false, { rejectWithValue, getState }) => {
    try {

      const {account} = getState().accountSlice;

      const CACHE_KEY = `subscriptions_cache-${account?._id}`;

      const cached = localStorage.getItem(CACHE_KEY);
      const now = Date.now();

      if (!refresh && cached) {
        const { data, timestamp } = JSON.parse(cached);

        // If cache is valid (less than 12h old), return it
        if (now - timestamp < CACHE_TTL) {
          return data;
        }
      }

      const { token: TOKEN } = getState().authSlice;

      const response = await axios({
        method: "GET",
        url: `${API_URL}/subscriptions`,
        headers: { TOKEN },
      });

      const data = response.data;
      // Cache the result
      // only cache if subscriptions are greater than 0
      if (data?.length > 0) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, timestamp: now })
        );
      }

      return data;
    } catch (error) {
      console.error(error);
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);
