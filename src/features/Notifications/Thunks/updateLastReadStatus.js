import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const updateLastReadStatus = createAsyncThunk('updateLastReadStatus/notificationsSlice', async (channel_id, {rejectWithValue, getState}) => {
    try {

        if (!channel_id) return rejectWithValue("Invalid Channel");

        const {token} = getState().authSlice;

        const response = await axios({
            method: "PUT",
            url: `${API_URL}/notifications/update-last-read-status`,
            headers: {TOKEN: token},
            data: {channel_id}
        })
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})