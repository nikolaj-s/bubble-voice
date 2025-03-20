import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateFormData } from "../../../lib/services/generateFormData";
import Axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";


export const updateServerDetails = createAsyncThunk(
    'serverDetailsSlice/updateServerDetails',
    async (params, {rejectWithValue, getState}) => {
        try {

            const {token} = getState().authSlice;

            if (!token) return rejectWithValue("Validation Error");

            const {server_id} = getState().serverDetailsSlice;

            if (!server_id) return rejectWithValue("Not currently in a server")

            const data = generateFormData({...params, server_id});

            const response = await Axios.post(`${API_URL}/update-server/details`, data, {
                headers: {TOKEN: token}
            });

            if (response.data.success) return response.data;

            return rejectWithValue("Error");

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error, 'Internal Server Error')
        }
    }
)
