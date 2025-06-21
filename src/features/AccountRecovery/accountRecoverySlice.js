import { createSlice } from "@reduxjs/toolkit";
import { sendRecoveryEmail } from "./Thunks/sendRecoveryEmail";
import { validateResetToken } from "./Thunks/validateResetToken";
import { resetPassword } from "./Thunks/resetPassword";

const accountRecoverySlice = createSlice({
    name: 'accountRecoverSlice',
    initialState: {
        loading: false,
        error: false,
        success: false,
        validated: false,
        passwordReset: false
    },
    extraReducers: (builder) => {
        // send password reset
        builder.addCase(sendRecoveryEmail.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        })
        builder.addCase(sendRecoveryEmail.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        builder.addCase(sendRecoveryEmail.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.success = true;
        })
        // validate password reset token
        builder.addCase(validateResetToken.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.success = false;
            state.validated = false;
        })
        builder.addCase(validateResetToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(validateResetToken.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.validated = true;
        })

        // reset password
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.passwordReset = false;
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.passwordReset = false;
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.passwordReset = true;
        })
    }
})

export default accountRecoverySlice.reducer;