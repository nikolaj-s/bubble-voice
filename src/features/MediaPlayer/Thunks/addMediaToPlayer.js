import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const addMediaToPlayer = createAsyncThunk('addMediaToPlayer/mediaPlayerSlice', async (media, {getState, rejectWithValue}) => {
    try {

        const {token} = getState().authSlice;

        const {currentChannel} = getState().mediaPlayerSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!currentChannel) return rejectWithValue("Invalid Channel");

        const response = await axios({
            url: `${API_URL}/media/add-to-media-player`,
            method: "POST",
            headers: {TOKEN: token},
            data: {server_id, channel_id: currentChannel, media}
        })

        return response.data;

    } catch (error) {
        console.log(error);

        return APIErrorHandler(rejectWithValue, error, 'fatal error adding media to player')
    }
})
