import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { triggerAlert } from "../../../Alerts/alertsSlice";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";


export const reactToMessage = createAsyncThunk('textChannelSlice/reactToMessage', async (data, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token: TOKEN} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!data?.message_id) {
            dispatch(triggerAlert("No message selected", 'error'));

            return rejectWithValue("no message selected");
        }

        const response = await axios({
            method: "PUT",
            url: `${API_URL}/text-channel/react-to-message`,
            headers: {TOKEN},
            data: {...data, server_id}
        })

        dispatch(triggerAlert(`${data.reaction}`, 'success'));

        return response.data.message;

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert("Fatal error reacting to message", 'error'))
        return APIErrorHandler(rejectWithValue, error);
    }
})