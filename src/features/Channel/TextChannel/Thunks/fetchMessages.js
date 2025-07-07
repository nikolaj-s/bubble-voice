// src/features/textChannel/Thunks/fetchMessages.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { API_URL } from "../../../../lib/Validation";
import { loadMessagesFromCache } from "../textChannelSlice";
import { getCachedMessages } from "../../../../lib/indexedDBCache";

export const fetchMessages = createAsyncThunk(
  'textChannel/fetchMessages',
  async (params, { rejectWithValue, getState, dispatch }) => {
    const { channel_id, last_message_id, count = 20 } = params;

    if (!channel_id) {
      return rejectWithValue("Invalid Channel");
    }

    let cachedRec = null;
    const STALE_MS = 3 * 60 * 60 * 1000; // 3h

    // 1️⃣ Try to load from IndexedDB on initial load
    if (!last_message_id) {
      try {
        const rec = await getCachedMessages(channel_id);

        if (rec && (Date.now() - rec.cachedAt) < STALE_MS) {

          cachedRec = rec;

          dispatch(loadMessagesFromCache({ channel_id, messages: rec.messages }));

        }
      } catch {
        // ignore any idb errors
      }
    }

    // 2️⃣ Fetch fresh from server, including cachedLength if we had a valid cache
    try {
      const { token } = getState().authSlice;

      const { server_id } = getState().serverDetailsSlice;

      const query = { channel_id, last_message_id, count, server_id };

      if (!last_message_id && Array.isArray(cachedRec?.messages)) {
        query.count = cachedRec.messages.length;
      }

      const response = await axios.get(`${API_URL}/text-channel/fetch`, {
        params:  query,
        headers: { TOKEN: token }
      });

      return {
        channel_id,
        messages:        response.data.messages || [],
        no_more_messages: response.data.no_more_messages,
        last_message_id
      };
    } catch (err) {
      return APIErrorHandler(rejectWithValue, err, 'Internal Server Error');
    }
  }
);
