import { createSlice } from "@reduxjs/toolkit";
import { fetchServerSettings } from "./Thunks/fetchServerSettings";
import { updateServerSettings } from "./Thunks/updateServerSettings";

const serverSettingsSlice = createSlice({
    name: "serverSettingsSlice",
    initialState: {
        error: false,
        loading: false,
        settings: {}
    },
    reducers: {
        toggleLoadingServerSettings: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        // fetch settings
        builder.addCase(fetchServerSettings.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(fetchServerSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchServerSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.settings = action.payload;
        })

        // update settings
        builder.addCase(updateServerSettings.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(updateServerSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updateServerSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.settings = action.payload;
        })
    }
})

export const {toggleLoadingServerSettings} = serverSettingsSlice.actions;

export default serverSettingsSlice.reducer;
