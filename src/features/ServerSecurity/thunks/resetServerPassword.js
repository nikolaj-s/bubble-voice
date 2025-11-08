import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const resetServerPassword = createAsyncThunk('resetServerPassword/serverSecuritySlice', async ({currentPassword, newPassword, confirmPassword}, {rejectWithValue, dispatch, getState}) => {
    try {

        const {token: TOKEN} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const response = await axios({
            url: `${API_URL}/server/reset-password`,
            method: "POST",
            headers: {TOKEN},
            data: {server_id, currentPassword, newPassword, confirmPassword}
        })

        return response.data;

    } catch (error) {
        console.log(error);

        return APIErrorHandler(rejectWithValue, error);
    }
})