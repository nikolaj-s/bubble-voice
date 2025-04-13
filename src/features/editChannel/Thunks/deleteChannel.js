import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { triggerAlert } from "../../Alerts/alertsSlice";


export const deleteChannel = createAsyncThunk(
    'deleteChannel/editChannelSlice',
    async (params, {rejectWithValue, getState, dispatch}) => {
        try {

            const {token} = getState().authSlice;

            const data = generateFormData(params);

            await axios({
                method: "DELETE",
                url: `${API_URL}/channels/delete`,
                headers: {TOKEN: token},
                data
            })

            dispatch(triggerAlert("Channel Deleted"));

            return;

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)