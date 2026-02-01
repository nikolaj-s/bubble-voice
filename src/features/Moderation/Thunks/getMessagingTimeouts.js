import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { getPermissions } from "../../../lib/getPermissions";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const getMessagingTimeouts = createAsyncThunk('moderationSlice/getMessagingTimeouts', async (_ ,{rejectWithValue, getState}) => {
    try {

        const {token: TOKEN} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const permissions = getPermissions(getState);

        if (!permissions.user_can_timeout_user_messaging) return rejectWithValue("You are not authorized to view this");

        const res = await axios({
            method: "GET",
            headers: {TOKEN},
            url: `${API_URL}/moderation/${server_id}/messaging-timeout`
        })

        return res.data;

    } catch (error) {
        console.log(error);

        return APIErrorHandler(rejectWithValue, error);
    }
})