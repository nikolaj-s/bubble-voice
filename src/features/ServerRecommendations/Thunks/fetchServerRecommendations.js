import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIErrorHandler } from '../../../lib/handlers/APIErrorHandler/APIErrorHandler';
import { API_URL } from '../../../lib/Validation';

export const fetchServerRecommendations = createAsyncThunk(
    'fetchServerRecommendations/serverRecommendationsSlice',
    async (server_id, { rejectWithValue, getState }) => {
      try {
        const { token } = getState().authSlice;

        const {mediaByServer} = getState().serverRecommendationsSlice;

        if (mediaByServer[server_id]) {
            return {cached: true, server_id}
        }
        console.log(mediaByServer[server_id])
        if (!server_id) return rejectWithValue("No server passed");

        const response = await axios({
          url: `${API_URL}/recommendations/fetch-server-recommendations`,
          method: 'GET',
          headers: { TOKEN: token },
          params: {server_id}
        });
  
        return response.data;
      } catch (error) {
        
        return APIErrorHandler(rejectWithValue, error);
      }
    }
  );
  