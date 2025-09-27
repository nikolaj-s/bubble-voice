import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import { triggerAlert } from "../../Alerts/alertsSlice";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { setCurrentVoiceChannel } from "../../Channel/VoiceChannel/voiceChannelSlice";

export const moveUserToChannel = createAsyncThunk('moveUserToChannel/socialSlice', async ({channel_id, user_id}, {dispatch, getState, rejectWithValue}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const {_id} = getState().accountSlice.account;


        if (!isValidObjectId(channel_id) || !isValidObjectId(user_id)) {

            dispatch(triggerAlert('Invalid ID', 'error'));

            return rejectWithValue('Invalid ID');
        }

        if (_id === user_id) {

            dispatch(setCurrentVoiceChannel(channel_id));

            return true;
        }

        await axios({
            method: "POST",
            headers: {TOKEN: token},
            url: `${API_URL}/social/move-user`,
            data: {server_id, channel_id, user_id}
        })

        dispatch(triggerAlert("User Moved"));

        return true;
    } catch (error) {
        console.log(error);
        dispatch(triggerAlert(error?.response?.data?.errorMessage || 'Unexpected Error Occured While Moving The User', 'error'));
        return APIErrorHandler(rejectWithValue, error);
    }
})