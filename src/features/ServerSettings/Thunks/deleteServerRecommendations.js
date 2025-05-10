import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { triggerAlert } from "../../Alerts/alertsSlice";


export const deleteServerRecommendations = createAsyncThunk('deleteServerRecommendations/serverSettingsSlice', async (_, {rejectWithValue, getState, dispatch}) => {
    try{

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        await axios({
            url: `${API_URL}`,
            method: 'DELETE',
            headers: {TOKEN: token},
            data: {server_id}
        })

        dispatch(triggerAlert('Success'));

        return;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})