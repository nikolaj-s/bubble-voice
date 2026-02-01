import { createAsyncThunk } from "@reduxjs/toolkit";
import { triggerAlert } from "../../Alerts/alertsSlice";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { clearSearchHistory } from "../../Search/searchSlice";

const CACHE_KEY = "bubble:userRecommendations:lastDeleteAt";
const BYPASS_MS = 5 * 60 * 1000;

export const deleteUserRecommendations = createAsyncThunk(
  "userRecommendationsSlice/deleteUserRecommendations",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      // If we deleted recently, bypass server call to avoid spam
      const lastDeleteAtRaw = localStorage.getItem(CACHE_KEY);
      const lastDeleteAt = lastDeleteAtRaw ? Number(lastDeleteAtRaw) : 0;

      if (Number.isFinite(lastDeleteAt) && Date.now() - lastDeleteAt < BYPASS_MS) {
        // Treat as success, no request
        dispatch(triggerAlert("Data Deleted", "success"));
        dispatch(clearSearchHistory())
        return { success: true, bypassed: true };
      }

      const { token: TOKEN } = getState().authSlice;

      await axios({
        url: `${API_URL}/recommendations/user`,
        headers: { TOKEN },
        method: "DELETE",
      });

      // Cache successful delete time
      localStorage.setItem(CACHE_KEY, String(Date.now()));

      dispatch(clearSearchHistory());

      dispatch(triggerAlert("Data Deleted", "success"));
      return { success: true, bypassed: false };
    } catch (error) {
      dispatch(triggerAlert("Unexpected Error Deleting Data", "error"));
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);
