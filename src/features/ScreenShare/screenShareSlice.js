// screenShareSlice.js
import { createSlice } from "@reduxjs/toolkit";

const screenShareSlice = createSlice({
  name: "screenShareSlice",
  initialState: {
    isSharing: false,
    selecting: false,     // If picker is open
    error: null,
    streamDetails: null,         // Optionally store MediaStream here (or ref)
  },
  reducers: {
    setScreenSharing: (state, action) => {
      state.isSharing = action.payload;
    },
    setSelecting: (state, action) => {
      state.selecting = action.payload;
    },
    setScreenError: (state, action) => {
      state.error = action.payload;
    },
    setStreamDetails: (state, action) => {
      state.streamDetails = action.payload;
    },
    clearScreenState: (state) => {
      state.isSharing = false;
      state.selecting = false;
      state.error = null;
      state.streamDetails = null;
    },
  },
});

export const {
  setScreenSharing,
  setSelecting,
  setScreenError,
  setStreamDetails,
  clearScreenState,
} = screenShareSlice.actions;
export default screenShareSlice.reducer;
