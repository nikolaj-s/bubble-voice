import { createAsyncThunk } from "@reduxjs/toolkit";
import { triggerAlert } from "../../Alerts/alertsSlice";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { getPermissions } from "../../../lib/getPermissions";


export const kickUserFromChannel = createAsyncThunk('moderationSlice/kickUserFromChannel', async (userID, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token: TOKEN} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const permissions = getPermissions(getState);

        if (!permissions.user_can_kick_user) {
            dispatch(triggerAlert("You are not authorized to kick users", 'error'));
            return rejectWithValue("validation error");
        }

        const res = await axios({
            url: `${API_URL}/moderation/${server_id}/kick-user-from-channel`,
            method: "POST",
            headers: {TOKEN},
            data: {userToKick: userID}
        })

        dispatch(triggerAlert("User Kick From Channel", "success"));

        return {success: true}

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert(error.response.data?.errorMessage || "Fatal Error Kicking User", "error"));

        APIErrorHandler(rejectWithValue, error);
    }
})

