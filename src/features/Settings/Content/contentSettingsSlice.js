import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    try {
        const saved = JSON.parse(localStorage.getItem('disableNsfwBlur'));

        return {
            safeSearchDisabled: false,
            disableNsfwBlur: saved
        }
    } catch (error) {
        return {
            safeSearchDisabled: false,
            disableNsfwBlur: false
        }
    }
}

const contentSettingsSlice = createSlice({
    name: "contentSettingsSlice",
    initialState,
    reducers: {
        toggleDisableNsfwBlur: (state, action) => {
            state.disableNsfwBlur = action.payload;

            localStorage.setItem('disableNsfwBlur', state.disableNsfwBlur);
        }
    }
})

export const { toggleDisableNsfwBlur } = contentSettingsSlice.actions; 

export default contentSettingsSlice.reducer;
