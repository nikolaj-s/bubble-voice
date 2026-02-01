import { createSlice } from "@reduxjs/toolkit";
import { addMessagingTimeout } from "./Thunks/addMessagingTimeout";
import { deleteMessagingTimeout } from "./Thunks/deleteMessagingTimeout";
import { getMessagingTimeouts } from "./Thunks/getMessagingTimeouts";

const moderationSlice = createSlice({
    name: 'moderationSlice',
    initialState: {
        loading: false,
        error: false,
        userToModerate: null,
        messagingTimeouts: []
    },
    reducers: {
        setUserToModerate: (state, action) => {
            state.userToModerate = action.payload;
        }
    },
    extraReducers: (builder) => {
        // add messaging timeout
       builder.addCase(addMessagingTimeout.pending, (state) => {
        state.loading = true;
        state.error = false;
       })
       .addCase(addMessagingTimeout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       })
       .addCase(addMessagingTimeout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
       })

       // delete messaging timeout
       builder.addCase(deleteMessagingTimeout.pending, (state) => {
        state.loading = true;
        state.error = false;
       })
       .addCase(deleteMessagingTimeout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       })
       .addCase(deleteMessagingTimeout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.messagingTimeouts = state.messagingTimeouts.filter(timeout => timeout.user_id !== action.payload.targetUser)
       })

       // get messaging timeouts
       builder.addCase(getMessagingTimeouts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.messagingTimeouts = [];
       })
       .addCase(getMessagingTimeouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       })
       .addCase(getMessagingTimeouts.fulfilled, (state, action) => {
            state.loading = false;
            state.loading = false;

            if (Array.isArray(action.payload)) {
                state.messagingTimeouts = action.payload;
            }
       })
    }
})

export const {setUserToModerate} = moderationSlice.actions;

export default moderationSlice.reducer;