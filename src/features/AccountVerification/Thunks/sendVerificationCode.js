import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

const THROTTLE_KEY = "sendVerificationTimestamp";
const THROTTLE_MS  = 5 * 60 * 1000; // 5 minutes

export const sendVerificationCode = createAsyncThunk(
  'accountVerificationSlice/sendVerificationCode',
  async (_, { rejectWithValue, getState }) => {
    try {
      // 1️⃣ Check last send timestamp
      const last = parseInt(sessionStorage.getItem(THROTTLE_KEY) || "0", 10);
      const now  = Date.now();
      if (last && now - last < THROTTLE_MS) {
        // too soon — pretend we succeeded without hitting the server
        return;
      }

      // 2️⃣ Actually send
      const { token } = getState().authSlice;
      await axios.post(
        `${API_URL}/auth/send-verification-code`,
        {},                   // no body
        { headers: { TOKEN: token } }
      );

      // 3️⃣ Record timestamp
      sessionStorage.setItem(THROTTLE_KEY, now.toString());
      return;
    } catch (err) {
      return APIErrorHandler(rejectWithValue, err);
    }
  }
);
