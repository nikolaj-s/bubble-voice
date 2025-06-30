import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const markNotificationsRead = createAsyncThunk('markNotificationsRead/notificationsSlice', async (_, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        await axios({
            method: "PATCH",
            url: `${API_URL}/notifications/read-all`,
            headers: {TOKEN: token},
        })

        return true;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})