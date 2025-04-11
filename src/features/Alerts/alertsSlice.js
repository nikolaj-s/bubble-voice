// store/alertsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: null, // 'info' | 'success' | 'error' | etc.
  visible: false,
};

let timeoutId;

const alertsSlice = createSlice({
  name: 'alertsSlice',
  initialState,
  reducers: {
    showAlert: {
      reducer: (state, action) => {
        state.message = action.payload.message;
        state.type = action.payload.type || 'info';
        state.visible = true;
      },
      prepare: (message, type) => {
        return { payload: { message, type } };
      }
    },
    hideAlert: (state) => {
      state.visible = false;
      state.message = null;
      state.type = null;
    },
  },
});

export const { showAlert, hideAlert } = alertsSlice.actions;

// Custom dispatch logic to auto-dismiss and interrupt existing alerts
export const triggerAlert = (message, type = 'info') => (dispatch) => {
  dispatch(showAlert(message, type));
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => dispatch(hideAlert()), 2500);
};

export default alertsSlice.reducer;
