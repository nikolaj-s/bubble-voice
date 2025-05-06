import { createSlice } from "@reduxjs/toolkit";
import { updatePassword } from "./Thunks/updatePassword";


const securitySlice = createSlice({
    name: 'securitySlice',
    initialState: {
        loading: false,
        error: false,
        enable2fa: false,
    },
    extraReducers: (builder) => {
        builder.addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export default securitySlice.reducer;