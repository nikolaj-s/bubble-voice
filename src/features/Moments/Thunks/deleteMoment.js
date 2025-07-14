import { createAsyncThunk } from "@reduxjs/toolkit";
import { triggerAlert } from "../../Alerts/alertsSlice";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { isValidObjectId } from "../../../lib/services/helperFunctions";


export const deleteMoment = createAsyncThunk('deleteMoment/momentsSlice', async (momentID, {getState, rejectWithValue, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!isValidObjectId(momentID)) {dispatch(triggerAlert('Invalid Moment ID', 'error')); rejectWithValue('Invalid Moment ID'); return}

        const response = await axios({
            method: "DELETE",
            url: `${API_URL}/moments/${momentID}`,
            headers: {TOKEN: token},
            data: {server_id}
        })

        return response.data;

    } catch (error) {
        dispatch(triggerAlert('An Error Occured While Deleting', 'error'));
        return APIErrorHandler(rejectWithValue, error);
    }
})
