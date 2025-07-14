import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import { triggerAlert } from "../../Alerts/alertsSlice";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const pokeUser = createAsyncThunk(
  'pokeUser/socialSlice',
  async (user_id, { rejectWithValue, dispatch, getState }) => {
    try {
      const { token } = getState().authSlice;

      // Validate ID
      if (!isValidObjectId(user_id)) {
        dispatch(triggerAlert('Invalid User ID', 'error'));
        return rejectWithValue('Invalid User ID');
      }

      // Rate‐limit via sessionStorage: one poke per 5 minutes per user
      const key = `poke_${user_id}`;
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const last = parseInt(raw, 10);
        if (!isNaN(last) && Date.now() - last < 5 * 60 * 1000) {
          dispatch(triggerAlert('You can only poke this user once every 5 minutes.', 'error'));
          return rejectWithValue('Rate limit: too soon to poke again');
        }
      }

      // Make the API request
      const response = await axios({
        method: "POST",
        url: `${API_URL}/social/poke-user`,
        headers: { TOKEN: token },
        data: { user_id }
      });

      // On success, record the timestamp
      try {
        sessionStorage.setItem(key, Date.now().toString());
      } catch {
        // ignore storage errors
      }
      dispatch(triggerAlert('User Poked'));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(triggerAlert("Fatal Error Poking User", 'error'));
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);
