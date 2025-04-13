import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { triggerAlert } from "../../Alerts/alertsSlice";

export const updateAccountStatus = createAsyncThunk(
    'accountSlice/updateAccountStatus',
    async (status, {rejectWithValue, getState, dispatch}) => {
        try {

            const valid_statuses = ['online', 'offline', 'away'];

            if (!valid_statuses.includes(status.toLowerCase())) return rejectWithValue("Not a valid status");

            const {token} = getState().authSlice;

            const response = await axios({
                method: "PUT",
                url: `${API_URL}/update-account/status`,
                headers: {TOKEN: token},
                data: {status}
            })

            return response.data;

        } catch (error) {
            console.log(error);

            dispatch(triggerAlert("Fatal Error Updating Status", "error"));

            return APIErrorHandler(rejectWithValue, error);
        }
    }
)