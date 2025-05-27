import { createSlice } from "@reduxjs/toolkit";

// uiSlice.js
const initialState = {
    fullscreen: false,
    focused: typeof document !== "undefined" ? document.hasFocus() : true,
    // ...
};
  
const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        setFullscreen: (state, action) => {
            state.fullscreen = action.payload;
        },
        setFocused: (state, action) => {
            state.focused = action.payload;
        },
    },
});
  
export const { setFullscreen, setFocused } = uiSlice.actions;

export default uiSlice.reducer;
  