import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getToken } from "../../../lib/services/authService";

import { API_URL } from "../../../lib/Validation";
import { setServers } from "../../Servers/serversSlice";

// Async thunk to fetch account details
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async (_, { rejectWithValue, dispatch }) => {
      try {
  
          const token = await getToken();
          
          if (!token) rejectWithValue("Not Authorized");
  
          const response = await axios.get(`${API_URL}/fetch-account`, {
              method: 'GET',
              headers: {"TOKEN": token},
          })

          const data = response.data;

          if (data.success) {

            const account = data.account;

            dispatch(setServers(account.servers));

          }

          if (response.status === 200) {
              return response.data;
          } else {
              return rejectWithValue("Not Authroized")
          }
  
      } catch (error) {
  
          console.log(error);
  
          return rejectWithValue(error.message); // Return error message
      }
    }
  );
