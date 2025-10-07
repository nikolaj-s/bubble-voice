import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { triggerAlert } from "../../Alerts/alertsSlice";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { isValidObjectId } from "../../../lib/services/helperFunctions";

export const subscribe = createAsyncThunk('subscribe/subscriptionSlice', async ({channel_id, server_id, channel_name, channel_type}, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        if (channel_type !== 'text') {
            dispatch(triggerAlert("You cannot subscribe to non text channels"));

            return rejectWithValue("invalid channel type");
        }

        if (!isValidObjectId(server_id) || !isValidObjectId(channel_id)) {
            dispatch(triggerAlert("Invalid Channel / Server ID"));

            return rejectWithValue('Invalid ID');
        }

        const response = await axios({
            method: "POST",
            url: `${API_URL}/subscriptions`,
            headers: {TOKEN: token},
            data: {channel_id, server_id}
        })

        dispatch(triggerAlert('Channel Added To Subscriptions'));

        return response.data;

    } catch (error) {
        console.log(error);

        dispatch(triggerAlert('Fatal Error Subscribing to Channel', 'error'))

        return APIErrorHandler(rejectWithValue, error);
    }
})