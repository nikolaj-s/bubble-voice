import { createSlice } from "@reduxjs/toolkit";
import { resetServerPassword } from "./thunks/resetServerPassword";

const serverSecuritySlice = createSlice({
    name: 'serverSecuritySlice',
    initialState: {
        loading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(resetServerPassword.pending, (state, action) => {
            state.error = false;
            state.loading = true;
        })
        .addCase(resetServerPassword.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(resetServerPassword.fulfilled, (state) => {
            state.error = false;
            state.loading = false;
        })
    }
})


export default serverSecuritySlice.reducer;