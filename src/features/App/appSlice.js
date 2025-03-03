import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        isElectron: typeof window !== "undefined" && 
        typeof window.process === "object" && 
        window.process.type === "renderer",
    }
})

export const selectIsElectron = state => state.appSlice.isElectron;

export default appSlice.reducer;