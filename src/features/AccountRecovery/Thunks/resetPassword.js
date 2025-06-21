import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { validatePassword } from "../../../lib/handlers/inputValidation/inputValidation";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const resetPassword = createAsyncThunk('resetPassword/accountRecoverySlice', async ({newPassword, confirmNewPassword, token}, {rejectWithValue}) => {
    try {

        if (!validatePassword(newPassword)) return rejectWithValue("Invalid Password");

        if (newPassword !== confirmNewPassword) return rejectWithValue("Passwords Do Not Match");

        await axios({
            method: "POST",
            url: `${API_URL}/recovery/reset-password`,
            data: {newPassword, confirmNewPassword, token}
        })

        return true;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})