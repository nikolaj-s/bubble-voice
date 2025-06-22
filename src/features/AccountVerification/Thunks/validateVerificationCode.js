import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const validateVerificationCode = createAsyncThunk('validateVerificationCode/accountVerificationSlice', async (code, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        if (!code || code?.trim()?.length < 6) return rejectWithValue("Invalid Verification Code");

        const response = await axios({
            method: "POST",
            url: `${API_URL}/auth/validate-verification-code`,
            headers: {TOKEN: token},
            data: {code}
        })

        if (response.data.success) {
            window.location.replace('/');
            return;
        }

        return rejectWithValue("Unknown Error Occured");
    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})

