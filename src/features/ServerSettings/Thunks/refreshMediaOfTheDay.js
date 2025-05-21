import { createAsyncThunk } from "@reduxjs/toolkit";

import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";

import axios from "axios";

import { API_URL } from "../../../lib/Validation";

import { setMediaOfTheDay } from "../../ServerRecommendations/serverRecommendationsSlice";

export const refreshMediaOfTheDay = createAsyncThunk('refreshMediaOfTheDay/serverSettingsSlice', async (__, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const response = await axios({
            method: "POST",
            url: `${API_URL}/recommendations/refresh-media-of-the-day`,
            headers: {TOKEN: token},
            data: {server_id}
        })
       
        dispatch(setMediaOfTheDay(response.data));

        return {success: true}

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})