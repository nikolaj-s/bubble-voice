import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIErrorHandler } from '../../../lib/handlers/APIErrorHandler/APIErrorHandler';
import { API_URL } from '../../../lib/Validation';

export const fetchServerRecommendations = createAsyncThunk(
  'fetchServerRecommendations/serverRecommendationsSlice',
  async (server_id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().authSlice;

      if (!server_id) return rejectWithValue("No server passed");

      const sessionKey = `server_recs_${server_id}`;
      const cached = sessionStorage.getItem(sessionKey);

      // Check sessionStorage
      if (cached) {
        const { data, cachedAt, mediaOfTheDayDate } = JSON.parse(cached);

        const now = Date.now();
        const ageMs = now - cachedAt;
        const isStale = ageMs > 1000 * 60 * 60 * 3; // 3 hours
        const mediaOfTheDayAge = mediaOfTheDayDate
          ? now - new Date(mediaOfTheDayDate).getTime()
          : Infinity;

        const isMediaOfTheDayOld = mediaOfTheDayAge > 1000 * 60 * 60 * 24; // 24 hours

        if (!isStale && !isMediaOfTheDayOld) {
          console.log('using cached server recommendation data');
          return { ...data, cached: true , server_id};
        }
      }

      // Otherwise fetch
      const response = await axios({
        url: `${API_URL}/recommendations/fetch-server-recommendations`,
        method: 'GET',
        headers: { TOKEN: token },
        params: { server_id }
      });

      const responseData = response.data;

      if (responseData.mediaOfTheDay?.date) {
        sessionStorage.setItem(
          sessionKey,
          JSON.stringify({
            data: responseData,
            cachedAt: Date.now(),
            mediaOfTheDayDate: responseData.mediaOfTheDay?.date || null
          })
        );
      }
    

      return {...responseData, server_id};
    } catch (error) {
      return APIErrorHandler(rejectWithValue, error);
    }
  }
);

  