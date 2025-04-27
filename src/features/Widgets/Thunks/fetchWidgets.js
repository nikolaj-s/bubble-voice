import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const fetchWidgets = createAsyncThunk('fetchWidgets/widgetsSlice', async (channel_id, {rejectWithValue, getState}) => {
    try {

        if (!channel_id) return rejectWithValue("No channel provided");

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const response = await axios({
            method: "GET",
            url: `${API_URL}/widgets`,
            headers: {TOKEN: token},
            params: {channel_id, server_id}
        })

        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})