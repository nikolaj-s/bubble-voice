import { createSlice } from "@reduxjs/toolkit";
import { pokeUser } from "./Thunks/pokeUser";
import { inviteUserToChannel } from "./Thunks/inviteUserToChannel";
import { moveUserToChannel } from "./Thunks/moveUserToChannel";

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

        // handle invite user to your channel
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

        // move a user to another channel
        builder.addCase(moveUserToChannel.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(moveUserToChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(moveUserToChannel.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export default socialSlice.reducer;