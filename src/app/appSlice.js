

import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        loadingApp: true,
        userSignedIn: false,
        updateAvailable: false,
    },
    reducers: {
        handleUpdateAvailable: (state, action) => {
            state.updateAvailable = action.payload;
        }
    }
})

export const selectCurrentRouteState = state => state.appSlice.currentRoute;

export const selectLoadingAppState = state => state.appSlice.loadingApp;

export const selectUpdateAvailableState = state => state.appSlice.updateAvailable;

export const { handleUpdateAvailable } = appSlice.actions;

export default appSlice.reducer;