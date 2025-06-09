import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { triggerAlert } from "../../Alerts/alertsSlice";

import axios from "axios";

import { API_URL } from "../../../lib/Validation";

import { generateFormData } from "../../../lib/services/generateFormData";

export const removeSavedMediaFromPlayer = createAsyncThunk('removeSavedMediaFromPlayer/mediaPlayerSlice', async (media_id, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        const {currentVoiceChannel: channel_id} = getState().voiceChannelSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!channel_id) {rejectWithValue('You are not currently in a channel to perform this action'); dispatch(triggerAlert('You are not currently in a channel to perform this action', 'error')); return}
   
        if (!media_id) {
            rejectWithValue("No media provided to delete");

            return dispatch(triggerAlert('Invalid Input'))
        }

        const data = generateFormData({media_id, channel_id, server_id});

        const response = await axios({
            url: `${API_URL}/media/remove-saved-media`,
            method: 'PUT',
            headers: {TOKEN: token},
            data
        })

        dispatch(triggerAlert("Removed From Saves"))

        return response.data;

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert("Fatal Error Removing Media", "error"));

        return APIErrorHandler(rejectWithValue, error);
    }
})