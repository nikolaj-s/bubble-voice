import { createAsyncThunk } from "@reduxjs/toolkit";
import { triggerAlert } from "../../Alerts/alertsSlice";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const unSubscribe = createAsyncThunk('unSubscribe/subscriptionsSlice', async (subscription_id, {rejectWithValue, dispatch, getState}) => {
    try {

        const {token: TOKEN} = getState().authSlice;

        await axios({
            method: "DELETE",
            url: `${API_URL}/subscriptions/${subscription_id}`,
            headers: {TOKEN}
        })

        dispatch(triggerAlert("Subscription Removed"));

        return subscription_id;

    } catch (error) {

        console.log(error);

        dispatch(triggerAlert("Fatal Error Removing Subscription, See Subscription Feed For Full Error"));

        return APIErrorHandler(rejectWithValue, error);
    }
})