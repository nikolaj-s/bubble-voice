import { createSlice } from "@reduxjs/toolkit";
import { fetchUserRecommendations } from "./Thunks/fetchUserRecommendations";
import { deleteUserRecommendations } from "./Thunks/deleteUserRecommendations";


const userRecommendationsSlice = createSlice({
    name: 'userRecommendationsSlice',
    initialState: {
        recommendations: [],
        loading: false,
        error: false,
        status: 'idle',
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserRecommendations.pending, (state, action) => {
            state.loading = true;
            state.error = false;
            state.status = 'loading';
        })
        builder.addCase(fetchUserRecommendations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = 'error';
        })
        builder.addCase(fetchUserRecommendations.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.status = 'complete';
            state.recommendations = action.payload;
        })

        // delete user recommendations 
        builder.addCase(deleteUserRecommendations.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteUserRecommendations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteUserRecommendations.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.recommendations = [];
        })
    }
})

export default userRecommendationsSlice.reducer;