import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const fetchNotifications = createAsyncThunk('fetchNotifications/notificationsSlice', async (params, {getState, rejectWithValue}) => {
    try {

        const {limit = 20, skip = 0} = params || {};

        const {token} = getState().authSlice;
        
        const res = await axios({
            method: "GET",
            url: `${API_URL}/notifications/fetch`,
            headers: {TOKEN: token},
            params: {limit, skip}
        })
        console.log(res)
        return res.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})