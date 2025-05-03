import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";


export const updateChannel = createAsyncThunk(
    'updateChannel/editChannelSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

            const {token} = getState().authSlice;

            const {server_id} = getState().serverDetailsSlice;

            if (!params.channel_id) return rejectWithValue("No channel selected to edit");

            const data = generateFormData({...params, server_id});

            const response = await axios({
                method: "POST",
                url: `${API_URL}/channels/update`,
                headers: {TOKEN: token},
                data
            })
            
            console.log(response.data);

            return response.data;

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)