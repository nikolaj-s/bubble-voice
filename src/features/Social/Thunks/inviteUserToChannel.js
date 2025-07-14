import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import { triggerAlert } from "../../Alerts/alertsSlice";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const inviteUserToChannel = createAsyncThunk(
  'inviteUserToChannel/socialSlice',
  async (user_id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { server_id } = getState().serverDetailsSlice;

      const { currentVoiceChannel: channel_id } = getState().voiceChannelSlice;

      const { token: TOKEN } = getState().authSlice;

      // Validate user ID
      if (!isValidObjectId(user_id)) {
        dispatch(triggerAlert('Invalid User ID', 'error'));
        return rejectWithValue("Invalid User ID");
      }

      // Rate‐limit: only once every 5 minutes per user
      const key = `invite_${user_id}`;
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const last = parseInt(raw, 10);
        if (!isNaN(last) && Date.now() - last < 5 * 60 * 1000) {
          dispatch(triggerAlert('You can only invite this user once every 5 minutes.', 'error'));
          return rejectWithValue('Rate limit: too soon to invite again');
        }
      }

      // Perform the invite API call
      const response = await axios({
        method: "POST",
        url: `${API_URL}/social/channel-invite`,
        headers: { TOKEN },
        data: { server_id, channel_id, user_id }
      });

      // On success, cache timestamp
      try {
        sessionStorage.setItem(key, Date.now().toString());
      } catch {
        // ignore storage errors
      }

      dispatch(triggerAlert("User Invited To Your Channel!"));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(triggerAlert("Fatal Error Inviting User To Channel", 'error'));
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);
