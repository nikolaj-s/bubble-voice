import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";

// Async thunk to fetch media history for a channel
export const fetchMediaHistory = createAsyncThunk(
  'mediaHistory/fetchMediaHistory',
  async ({ channel_id, page = 1, limit = 20, title = "" }, { rejectWithValue, getState }) => {
    try {

        if (!channel_id) return rejectWithValue("Not a valid channel");

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;
            
        const res = await axios({
            method: "GET",
            url: `${API_URL}/history/media/${channel_id}`,
            params: { page, limit, title, server_id },
            headers: {TOKEN: token}
        })
        console.log(res)
        return {
            channel_id,
            history: res.data.history,
            page: res.data.page,
            limit: res.data.limit,
            success: res.data.success,
            no_more: res.data.no_more
        };
    } catch (err) {
      return APIErrorHandler(rejectWithValue, err)
    }
  }
);

