import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const updateServerSettings = createAsyncThunk('updateServerSettings/serverSettingsSlice', async (newSettings, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!newSettings?.server_id) return rejectWithValue('Validation Error');

        const response = await axios({
            url: `${API_URL}/server-settings`,
            method: "POST",
            headers: {TOKEN: token},
            data: {server_id, newSettings}
        })

        return response.data;

    } catch (error) {
        return APIErrorHandler(rejectWithValue, error);
    }
})