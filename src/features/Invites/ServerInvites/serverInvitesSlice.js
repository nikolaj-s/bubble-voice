
import { createSlice } from "@reduxjs/toolkit";

import { generateInviteLink } from "./Thunks/generateInviteLink";

import { getInviteLink } from "./Thunks/getInviteLink";
import { sendServerInvite } from "./Thunks/sendServerInvite";

const serverInvitesSlice = createSlice({
    name: "serverInvitesSlice",
    initialState: {
        error: false,
        loading: false,
        inviteLink: null,
        pendingInvites: []
    },
    extraReducers: (builder) => {
        // generate invite link
        builder.addCase(generateInviteLink.pending, (state) => {
            state.error = false;
            state.loading = true
        })
        builder.addCase(generateInviteLink.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(generateInviteLink.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.inviteLink = action.payload;
        })

        // get existing invite link
        builder.addCase(getInviteLink.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(getInviteLink.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false; 
        })
        builder.addCase(getInviteLink.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.inviteLink = action.payload;
        })

        // send server invite
        builder.addCase(sendServerInvite.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(sendServerInvite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(sendServerInvite.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export default serverInvitesSlice.reducer;