import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./State/contentState";

const contentSettingsSlice = createSlice({
    name: "contentSettingsSlice",
    initialState,
    reducers: {
        toggleContentState: (state, action) => {
            state[action.payload] = !state[action.payload];

            localStorage.setItem(action.payload, JSON.stringify(state[action.payload]))
        }
    }
})

export const { toggleContentState } = contentSettingsSlice.actions; 

export default contentSettingsSlice.reducer;
