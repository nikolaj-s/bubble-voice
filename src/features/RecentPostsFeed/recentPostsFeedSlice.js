import { fetchRecentPosts } from "./Thunks/fetchRecentPosts";

const { createSlice } = require("@reduxjs/toolkit");


const recentPostsFeedSlice = createSlice({
    name: 'recentPostsFeedSlice',
    initialState: {
        loading: false,
        error: false,
        feed: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecentPosts.pending, (state) => {
            state.loading = true;
            state.feed = [];
            state.error = false;
        })
        .addCase(fetchRecentPosts.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(fetchRecentPosts.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;

            state.feed = action.payload.messages;
        })
    }
})


export default recentPostsFeedSlice.reducer;