import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateEmail, validatePassword } from "../../../lib/handlers/inputValidation/inputValidation";

import axios from 'axios';

import { API_URL } from "../../../lib/Validation";
import { setToken } from "../../../lib/services/authService";

export const signinThunk = createAsyncThunk(
    'auth/signIn',
    async ({email, password}, { rejectWithValue }) => {
      try {
        
        // if (!validateEmail(email) || !validatePassword(password)) {
        //     return rejectWithValue({ errorMessage: 'Invalid Credentials', errorType: "signinError" });
        // }

        const response = await axios.post(`${API_URL}/sign-in`, { email, password });
        
        if (response.status >= 200 && response.status < 300) {

          if (response?.data?.success) {

            setToken(response?.data?.token);

          }

          return {authorized: true}; // Expected to contain user info and token

        } else {

          return rejectWithValue('Unexpected server response');
        
        }
       // Assuming the response contains the user data
      } catch (error) {
        if (error.response) {
          // Server responded with a status code outside 2xx
          return rejectWithValue(error.response.data?.errorMessage || 'Invalid credentials');
        } else if (error.request) {
          // Request was made but no response received
          return rejectWithValue('No response from the server');
        } else {
          // Something else went wrong
          return rejectWithValue('An error occurred during sign-in');
        }
      }
    }
  );