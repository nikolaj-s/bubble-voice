import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./State/appearanceState";

const appearanceSlice = createSlice({
    name: "appearanceSlice",
    initialState,
    reducers: {
        toggleAppearanceSetting: (state, action) => {
            state[action.payload] = !state[action.payload]
        }
    }
})

export const {
    toggleAppearanceSetting
} = appearanceSlice.actions;

export default appearanceSlice.reducer;