import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getToken } from "../../../lib/services/authService";

import { API_URL } from "../../../lib/Validation";

// Async thunk to fetch account details
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async (_, { rejectWithValue }) => {
      try {
  
          const token = getToken();
          
          if (!token) rejectWithValue("Not Authorized");
  
          const response = await axios.get(`${API_URL}/fetch-account`, {
              method: 'GET',
              headers: {"TOKEN": token},
          })
          console.log(response)
          if (response.status === 200) {
              return response.data;
          } else {
              return rejectWithValue("Not Authroized")
          }
  
          return response; // Return account data
      } catch (error) {
  
          console.log(error);
  
          return rejectWithValue(error.message); // Return error message
      }
    }
  );
