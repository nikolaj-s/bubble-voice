import { createSlice } from "@reduxjs/toolkit";

// uiSlice.js
const initialState = {
    fullscreen: false,
    // ...
  };
  
const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        setFullscreen: (state, action) => {
            state.fullscreen = action.payload;
        },
    },
});
  
export const { setFullscreen } = uiSlice.actions;

export default uiSlice.reducer;
  