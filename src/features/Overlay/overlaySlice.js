import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeOverlay: null, // Stores the currently active overlay ('search', 'createServer', etc.)
};

const overlaySlice = createSlice({
  name: "overlaySlice",
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      state.activeOverlay = action.payload; // Set active overlay
    },
    closeOverlay: (state) => {
      state.activeOverlay = null; // Close any open overlay
    },
  },
});

export const { setOverlay, closeOverlay } = overlaySlice.actions;

export const selectActiveOverlay = (state) => state.overlaySlice.activeOverlay;

export default overlaySlice.reducer;
