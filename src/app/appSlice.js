

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initializeApplication = createAsyncThunk(
    'appSlice/initializeApplication',
    async (_, { rejectWithValue }) => {
        // validate if user is signed in
        // load assets for application

        // placeholder return until functionality is built
        return true;
    }
)


const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        loadingApp: true,
        userSignedIn: false,
    },
    reducers: {
        incrementLoadingPercentage: (action, payload) => {

        }
    },
    extraReducers: {
        [initializeApplication.pending]: (state, action) => {

        },
        [initializeApplication.fulfilled]: (state, action) => {
            state.loadingApp = false;
        },  
        [initializeApplication.rejected]: (state, action) => {

        }
    }
})

export const selectCurrentRouteState = state => state.appSlice.currentRoute;

export const selectLoadingAppState = state => state.appSlice.loadingApp;



export default appSlice.reducer;