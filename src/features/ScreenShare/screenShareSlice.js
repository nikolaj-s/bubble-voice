// screenShareSlice.js
import { createSlice } from "@reduxjs/toolkit";

const screenShareSlice = createSlice({
  name: "screenShareSlice",
  initialState: {
    isSharing: false,
    selecting: false,     // If picker is open
    error: null,
    streamDetails: null,  
    streamIcon: null,       // Optionally store MediaStream here (or ref)
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
      console.log(action.payload)
      state.streamDetails = action.payload;
    },
    clearScreenState: (state) => {
      state.isSharing = false;
      state.selecting = false;
      state.error = null;
      state.streamDetails = null;
      state.streamIcon = null;
    },
    setStreamIcon: (state, action) => {
      state.streamIcon = action.payload;
    }
  },
});

export const {
  setScreenSharing,
  setSelecting,
  setScreenError,
  setStreamDetails,
  clearScreenState,
  setStreamIcon
} = screenShareSlice.actions;
export default screenShareSlice.reducer;
