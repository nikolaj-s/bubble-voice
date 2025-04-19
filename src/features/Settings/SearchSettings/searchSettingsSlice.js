import { createSlice } from "@reduxjs/toolkit"

import searchSettingsState from "./State/searchSettingsState";

const initialState = searchSettingsState;

const searchSettingsSlice = createSlice({
    name: "searchSettingsSlice",
    initialState,
    reducers: {
        toggleSearchSetting: (state, action) => {
            state[action.payload] = !state[action.payload];
            localStorage.setItem(action.payload, JSON.stringify(state[action.payload]));
        }
    }
})

export const {toggleSearchSetting} = searchSettingsSlice.actions;

export default searchSettingsSlice.reducer;