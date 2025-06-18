import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const fetchPinnedWidgets = createAsyncThunk(
  'pinnedWidgetsSlice/fetchPinnedWidgets',
  async (server_id, { rejectWithValue, getState }) => {
    const cacheKey = `pinnedWidgets_${server_id}`

    // 1. Check sessionStorage for cached data
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        try {
          return JSON.parse(cached)
        } catch {
          // if parsing fails, just fall through to re-fetch
        }
      }
    }

    try {
      const { token } = getState().authSlice

      const response = await axios({
        url: `${API_URL}/widgets/pinned`,
        method: 'GET',
        headers: { TOKEN: token },
        params: { server_id }
      })

      const data = response.data

      // 2. Cache in sessionStorage if we got a non-empty array
      if (Array.isArray(data) && data.length > 0 && typeof window !== 'undefined') {
        sessionStorage.setItem(cacheKey, JSON.stringify(data))
      }

      return data
    } catch (error) {
      console.error(error)
      return APIErrorHandler(rejectWithValue, error)
    }
  }
)