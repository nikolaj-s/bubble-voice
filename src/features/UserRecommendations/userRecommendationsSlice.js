import { createSlice } from "@reduxjs/toolkit";
import { fetchUserRecommendations } from "./Thunks/fetchUserRecommendations";


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
    }
})

export default userRecommendationsSlice.reducer;