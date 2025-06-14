

// features/streamPreviewSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const streamPreviewSlice = createSlice({
  name: "streamPreviewSlice",
  initialState: {preview: null, color: null},
  reducers: {
    updatePreview: (state, action) => {
      const { dataUri, avgColor } = action.payload;
      state.preview = dataUri;
      state.color = avgColor;
    },
    clearPreview: (state, action) => {
      state.preview = null;
      state.color = null;
    },
  },
});

export const { updatePreview, clearPreview } = streamPreviewSlice.actions;

export default streamPreviewSlice.reducer;
