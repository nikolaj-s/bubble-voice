import { createAsyncThunk } from '@reduxjs/toolkit';

import Axios from 'axios';

import { API_URL } from '../../../lib/Validation';

import { getToken } from '../../../lib/services/authService';
import { generateFormData } from '../../../lib/services/generateFormData';
import { APIErrorHandler } from '../../../lib/handlers/APIErrorHandler/APIErrorHandler';

export const updateAccount = createAsyncThunk(
  'accountSlice/updateAccount',
  async (params, { rejectWithValue }) => {
    try {
      const token = await getToken();

      if (!token) {
        return rejectWithValue('Validation error: No token');
      }

      // Prepare form data
      const data = generateFormData(params);

      // Make Axios request
      const response = await Axios.post(`${API_URL}/update-account/details`, data, {
        headers: { TOKEN: token },
      });

      if (response.data.error) {
        return rejectWithValue(response.data.errorMessage || 'Unknown error');
      }

      console.log(response.data);

      return response.data;
    } catch (error) {
      return APIErrorHandler(rejectWithValue, error, "Fatal Internal Server Error");
    }
  }
);
