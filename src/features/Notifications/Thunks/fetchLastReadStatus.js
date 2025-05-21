import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const fetchLastReadStatus = createAsyncThunk('fetchLastReadStatus/notificationsSlice', async (_, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const response = await axios({
            method: "GET",
            url: `${API_URL}/notifications/fetch-last-read-status`,
            headers: {TOKEN: token}
        })
console.log(response.data)
        return response.data;

    } catch (error) {
        console.warn(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})