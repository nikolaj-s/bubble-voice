import { createAsyncThunk } from "@reduxjs/toolkit";
import { triggerAlert } from "../../../Alerts/alertsSlice";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";

export const sendServerInvite = createAsyncThunk('sendServerInvite/serverInvitesSlice', async (user_id, {getState, rejectWithValue, dispatch}) => {
    try {

        if (!user_id) {
            dispatch(triggerAlert('Invalid User Data', 'error'));
            return rejectWithValue("Invalid User Data");
        }

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;
console.log(server_id)
        await axios({
            method: "POST",
            url: `${API_URL}/invites/send-server-invite`,
            headers: {TOKEN: token},
            data: {server_id, user_id}
        })
console.log('invite sent')
        dispatch(triggerAlert("Invite Sent!"));

        return true;

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert('An Error Occured While Sending The Invite', 'error'));

        return APIErrorHandler(rejectWithValue, error);
    }
})