import { createSlice } from "@reduxjs/toolkit";

// uiSlice.js
const initialState = {
    fullscreen: false,
    focused: typeof document !== "undefined" ? document.hasFocus() : true,
    sideBarPage: 'users'
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
        setSideBarPage: (state, action) => {
            state.sideBarPage = action.payload;
        }
    },
});
  
export const { setFullscreen, setFocused, setSideBarPage } = uiSlice.actions;

export default uiSlice.reducer;
  