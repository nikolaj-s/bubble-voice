import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { triggerAlert } from "../../Alerts/alertsSlice";
import { getPermissions } from "../../../lib/getPermissions";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const deleteMessagingTimeout = createAsyncThunk('moderationSlice/deleteMessagingTimeout', async (targetUser, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token: TOKEN} = getState().authSlice;

        const permissions = getPermissions(getState);

        const {server_id} = getState().serverDetailsSlice;

        if (!permissions.user_can_timeout_user_messaging) {
            dispatch(triggerAlert("You are not authorized to perform messaging timeouts", 'error'));
            return rejectWithValue("Not Allowed");
        }

        if (!isValidObjectId(targetUser)) {
            dispatch(triggerAlert("Invalid User", 'error'));
            return rejectWithValue("Invalid User");
        }

        await axios({
            method: "DELETE",
            url: `${API_URL}/moderation/${server_id}/messaging-timeout`,
            headers: {TOKEN},
            data: {targetUser}
        })

        dispatch(triggerAlert("Removed User Time Out", "success"));

        return {success: true, targetUser};

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert(error.response.data?.errorMessage || 'Fatal Error', 'error'));
        return APIErrorHandler(rejectWithValue, error);
    }
})
