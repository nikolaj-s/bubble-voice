import { createSlice } from "@reduxjs/toolkit";

const AppFeature = createSlice({
    name: "AppFeature",
    initialState: {
        isElectron: () => {
            return typeof window !== "undefined" && 
            typeof window.process === "object" && 
            window.process.type === "renderer";
        }
    },
    reducers: {

    }
})

export const selectIsElectron = state => state.AppFeature.isElectron;

export default AppFeature.reducer;