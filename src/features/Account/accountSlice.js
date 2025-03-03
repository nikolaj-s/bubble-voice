import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAccount } from './Thunks/fetchAccount';

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState: {
    account: null,
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    // Additional reducers can go here (e.g., for logout)
    logout: (state) => {
      state.account = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload)
        state.account = action.payload; // Set the account details
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set the error message
      });
  }
});

export const selectAccountError = state => state.accountSlice.error;

export const selectAccount = state => state.accountSlice.account;

export const { logout } = accountSlice.actions;

export default accountSlice.reducer;
