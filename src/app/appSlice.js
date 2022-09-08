
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        loadingApp: true,
        userSignedIn: false,
        updateAvailable: false,
        currentVersion: ""
    },
    reducers: {
        handleUpdateAvailable: (state, action) => {
            state.updateAvailable = action.payload;
        },
        updateCurrentAppVersion: (state, action) => {
            state.currentVersion = action.payload;
        }
    }
})

export const selectCurrentRouteState = state => state.appSlice.currentRoute;

export const selectLoadingAppState = state => state.appSlice.loadingApp;

export const selectUpdateAvailableState = state => state.appSlice.updateAvailable;

export const selectCurrentAppVersion = state => state.appSlice.currentVersion;

export const { updateCurrentAppVersion, handleUpdateAvailable } = appSlice.actions;

export default appSlice.reducer;