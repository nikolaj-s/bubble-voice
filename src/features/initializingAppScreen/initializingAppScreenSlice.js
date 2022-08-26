import { createSlice } from "@reduxjs/toolkit";


const initializingAppScreenSlice = createSlice({
    name: "initializingAppScreenSlice",
    initialState: {
        loadingPercent: 0,
        loadingState: "Initializing",
        error: false,
        errorMessage: "",
        retryToggle: false
    },
    reducers: {
        incrementLoadingPercentage: (state, action) => {
            state.loadingPercent = action.payload.percent;
            state.loadingState = action.payload.state;
        },
        retryLoadingApplication: (state, action) => {
            state.error = false;
            state.errorMessage = "";
            state.retryToggle = !state.retryToggle;
        },
        throwInitializationError: (state, action) => {
            state.error = true;
            state.errorMessage = action.payload;
        }
    }
})

// actions
export const { incrementLoadingPercentage, retryLoadingApplication, throwInitializationError } = initializingAppScreenSlice.actions;

// selectors
export const selectRetryState = state => state.initializingAppScreenSlice.retryToggle;

export const selectLoadingError = state => state.initializingAppScreenSlice.error;

export const selectLoadingErrorMessage = state => state.initializingAppScreenSlice.errorMessage;

export const selectLoadingPercent = state => state.initializingAppScreenSlice.loadingPercent;

export const selectLoadingState = state => state.initializingAppScreenSlice.loadingState;

export default initializingAppScreenSlice.reducer;