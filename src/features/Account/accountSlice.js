import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAccount } from './Thunks/fetchAccount';

import { updateAccount } from './Thunks/updateAccount';
import { updateAccountStatus } from './Thunks/updateAccountStatus';

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState: {
    account: null,
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    updateLoading: false,
    updateError: ""
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
        state.error = false;
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.account = action.payload.account; // Set the account details
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set the error message
      })

      // update account
      .addCase(updateAccount.pending, (state) =>  {
        state.updateLoading = true;
        state.updateError = false;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.updateError = action.payload;
        state.updateLoading = false;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateError = false;
        state.account = action.payload.account;
      })

      // update account status
      .addCase(updateAccountStatus.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateAccountStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })
      .addCase(updateAccountStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.account = action.payload;
      })
  }
});

export const selectAccountError = state => state.accountSlice.error;

export const selectAccount = state => state.accountSlice.account;

export const { logout } = accountSlice.actions;

export default accountSlice.reducer;
