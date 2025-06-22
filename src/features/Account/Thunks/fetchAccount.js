import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../../../lib/Validation";

import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";

// Async thunk to fetch account details
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async (_, { rejectWithValue, dispatch, getState }) => {
      try {
  
          const {token} = getState().authSlice;
  
          const response = await axios.get(`${API_URL}/fetch-account`, {
              method: 'GET',
              headers: {"TOKEN": token},
          })

          if (response.data.verification_required) {

            window.location.assign(`/verify-account?email=${response.data.email}`);

            return {account: null};
          
          }

          return response.data;
  
      } catch (error) {
  
          console.log(error);
  
          return  APIErrorHandler(rejectWithValue, error, 'Internal Server Error'); // Return error message
      }
    }
  );
