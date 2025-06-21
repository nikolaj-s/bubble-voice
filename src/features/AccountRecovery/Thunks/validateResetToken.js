import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const validateResetToken = createAsyncThunk('validateResetToken/accountRecoverySlice', async (token, {rejectWithValue}) => {
    try {

        await axios({
            method: "POST",
            url: `${API_URL}/recovery/validate-reset-token`,
            data: {token}
        })

        return;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})