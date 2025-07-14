import { createSlice } from "@reduxjs/toolkit";
import { pokeUser } from "./Thunks/pokeUser";
import { inviteUserToChannel } from "./Thunks/inviteUserToChannel";

const socialSlice = createSlice({
    name: "socialSlice",
    initialState: {
        loading: false,
        error: false,
    },
    extraReducers: (builder) => {
        builder.addCase(pokeUser.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(pokeUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(pokeUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        })

        builder.addCase(inviteUserToChannel.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(inviteUserToChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(inviteUserToChannel.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export default socialSlice.reducer;