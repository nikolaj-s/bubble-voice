import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


// 24 hours in milliseconds
const CACHE_TTL = 1 * 60 * 60 * 1000;

export const getPatchNotes = createAsyncThunk(
  'getPatchNotes/patchNotesSlice',
  async (page, { rejectWithValue }) => {
    try {
      const cacheKey = `patchNotes_page_${page}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL && data?.notes) {
          console.log('Using cached patch notes');
          return data;
        }
      }

      const response = await axios({
        url: `${API_URL}/patch-notes`,
        params: { page },
        method: 'GET',
      });

      if (response.data?.notes) {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), data: response.data })
        );
      }

      return response.data;

    } catch (error) {
      console.error('Error fetching patch notes:', error);
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);
