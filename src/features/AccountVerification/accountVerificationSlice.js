import { sendVerificationCode } from "./Thunks/sendVerificationCode";
import { validateVerificationCode } from "./Thunks/validateVerificationCode";

const { createSlice } = require("@reduxjs/toolkit");


const accountVerificationSlice = createSlice({
    name: 'accountVerificationSlice',
    initialState: {
        loading: false,
        error: false,
        verification_re_sent: false
    },
    extraReducers: (builder) => {
        // re send verification email
        builder.addCase(sendVerificationCode.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.verification_re_sent = false;
        })
        .addCase(sendVerificationCode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(sendVerificationCode.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.verification_re_sent = true;
        })

        // validate verification code
        builder.addCase(validateVerificationCode.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(validateVerificationCode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(validateVerificationCode.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export default accountVerificationSlice.reducer;