import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { triggerAlert } from "../../Alerts/alertsSlice";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { generateFormData } from "../../../lib/services/generateFormData";

export const saveMediaToPlayer = createAsyncThunk('saveMediaToPlayer/mediaPlayerSlice', async (params, {getState, rejectWithValue, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        const {currentVoiceChannel} = getState().voiceChannelSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!currentVoiceChannel) return rejectWithValue("You are not currently in a voice channel to save media in");

        const data = generateFormData({...params, server_id, channel_id: currentVoiceChannel})

        const response = await axios({
            url: `${API_URL}/media/save-media-to-player`,
            method: "PUT",
            headers: {TOKEN: token},
            data
        })

        if (response.data.media) {
            dispatch(triggerAlert(`SAVED: ${response.data.media.title}`));
        }
      

        return response.data;

    } catch (error) {
        dispatch(triggerAlert(error.response.data.errorMessage || 'fatal Error', 'error'));
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})