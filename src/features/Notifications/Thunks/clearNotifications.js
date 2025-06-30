import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const clearNotifcations = createAsyncThunk('clearNotifcations/notificationsSlice', async (_, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        await axios({
            method: "DELETE",
            url: `${API_URL}/notifications/clear-all`,
            headers: {TOKEN: token}
        })

        return;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})