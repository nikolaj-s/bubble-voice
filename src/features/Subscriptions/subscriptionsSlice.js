import { createSlice } from "@reduxjs/toolkit";
import { subscribe } from "./Thunks/subscribe";
import { unSubscribe } from "./Thunks/unSubscribe";
import { getSubscriptions } from "./Thunks/getSubscriptions";


const subscriptionsSlice = createSlice({
    name: 'subscriptionsSlice',
    initialState: {
        subscriptions: [],
        loading: false,
        error: false
    },
    extraReducers: (builder) => {
        // add subscription
        builder.addCase(subscribe.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(subscribe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(subscribe.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.subscriptions.unshift(action.payload);
        })

        // remove subscription
        builder.addCase(unSubscribe.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(unSubscribe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(unSubscribe.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.subscriptions = state.subscriptions.filter(sub => sub._id !== action.payload);
        })

        // get subscriptions
        builder.addCase(getSubscriptions.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getSubscriptions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getSubscriptions.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            if (Array.isArray(action.payload)) {
                state.subscriptions = action.payload;
            }
        })

    }
})

export default subscriptionsSlice.reducer;