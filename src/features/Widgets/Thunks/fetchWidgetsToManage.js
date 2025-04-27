import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { API_URL } from "../../../lib/Validation";
import axios from "axios";

export const fetchWidgetsToManage = createAsyncThunk('fetchWidgetsToManage', async (params, {getState, rejectWithValue}) => {
    try {

        const {server_id} = getState().serverDetailsSlice;

        const {token} = getState().authSlice;

        const {channel_id} = getState().manageWidgetsSlice;

        if (!channel_id || !server_id) return rejectWithValue("Validation Error");

        const response = await axios({
            method: "GET",
            url: `${API_URL}/widgets`,
            headers: {TOKEN: token},
            params: {channel_id, server_id}
        })

        return response.data.widgets;   

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})