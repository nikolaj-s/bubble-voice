import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const deleteNotification = createAsyncThunk('deleteNotification/notificationsSlice', async (notifcationId, {rejectWithValue, getState}) => {
    try {

        if (!notifcationId) return rejectWithValue("Invalid Notification");

        const {token} = getState().authSlice;

        const response = await axios({
            method: "DELETE",
            url: `${API_URL}/notifications/delete/${notifcationId}`,
            headers: {TOKEN: token}
        })

        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})