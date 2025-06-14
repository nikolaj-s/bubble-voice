import { createSlice } from "@reduxjs/toolkit";
import { getInviteDetails } from "./Thunks/getInviteDetails";

const inviteSlice = createSlice({
    name: 'inviteSlice',
    initialState: {
        loading: false,
        error: false,
        server_details: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getInviteDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(getInviteDetails.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getInviteDetails.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;
            state.server_details = action.payload;
        })
    }
})

export default inviteSlice.reducer;