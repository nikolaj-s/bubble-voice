import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        loading: false,
        error: false,
        screenshot: null,
        screenshotPreview: null
}

const screenshotSlice = createSlice({
    name: 'screenshotSlice',
    initialState,
    reducers: {
        setScreenshot: (state, action) => {
            state.screenshot = action.payload;
        },
        setScreenshotPreview: (state, action) => {
            state.screenshotPreview = action.payload;
        },
        clearScreenshotState: () => initialState
    }
})

export const {setScreenshot, setScreenshotPreview, clearScreenshotState} = screenshotSlice.actions;

export default screenshotSlice.reducer;