import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const fetchServerSettings = createAsyncThunk('fetchServerSettings/serverSettingsSlice', async (__, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!token || !server_id) return rejectWithValue("Validation Error");

        const response = await axios({
            method: "GET",
            url: `${API_URL}/server-settings/`,
            headers: {TOKEN: token},
            params: {server_id: server_id}
        })
       
        return response.data;

    } catch (error) {
        return APIErrorHandler(rejectWithValue, error);
    }
})