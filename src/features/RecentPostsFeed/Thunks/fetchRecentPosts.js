import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { API_URL } from "../../../lib/Validation";
import axios from "axios";


const CACHE_PREFIX = "bubble_recent_posts_v1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const getCacheKey = (serverID) => `${CACHE_PREFIX}:${serverID}`;

const readCache = (serverID) => {
  try {
    const raw = localStorage.getItem(getCacheKey(serverID));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
      localStorage.removeItem(getCacheKey(serverID));
      return null;
    }

    return parsed?.data ?? null;
  } catch {
    return null;
  }
};

const writeCache = (serverID, data) => {
  try {
    localStorage.setItem(
      getCacheKey(serverID),
      JSON.stringify({
        data,
        expiresAt: Date.now() + CACHE_TTL_MS,
        cachedAt: Date.now(),
      })
    );
  } catch {
    // ignore storage quota / private mode issues
  }
};

export const fetchRecentPosts = createAsyncThunk(
  "recentPostsFeedSlice/fetchRecentPosts",
  async (serverID, { rejectWithValue, getState }) => {
    try {
      const { token: TOKEN } = getState().authSlice;

      // 1) Serve from cache if valid
      const cached = readCache(serverID);
      if (cached?.messages?.length) {
        return { ...cached, fromCache: true };
      }

      // 2) Fetch from API
      const response = await axios({
        url: `${API_URL}/server/${serverID}/recent-posts`,
        method: "GET",
        headers: {TOKEN},
      });

      const payload = response.data;

      // 3) Cache only if there are messages
      if (payload?.messages?.length) {
        writeCache(serverID, payload);
      } else {
        // If empty, clear stale cache if any
        try {
          localStorage.removeItem(getCacheKey(serverID));
        } catch {}
      }

      return { ...payload, fromCache: false };
    } catch (error) {
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);