import { createAsyncThunk } from "@reduxjs/toolkit";

import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../../lib/services/generateFormData";
import { API_URL } from "../../../../lib/Validation";
import axios from "axios";
import { closeOverlay } from "../../../Overlay/overlaySlice";

export const createChannel = createAsyncThunk(
    'createChannel/channelsSlice',
    async (params, {rejectWithValue, getState, dispatch}) => {
        try {

            const {token} = getState().authSlice;

            if (!token) return rejectWithValue("Validation Error");

            const {server_id} = getState().serverDetailsSlice;

            if (!server_id) return rejectWithValue("Validation Error");

            const data = generateFormData({...params, server_id});

            const response = await axios({
                method: "POST",
                url: `${API_URL}/channels/create`,
                headers: {TOKEN: token},
                data
            })

            if (response.data.success) {

                dispatch(closeOverlay());

                return response.data
            
            };

            return rejectWithValue("Internal Server Error");
        } catch (error) {
            console.log(error);

            return APIErrorHandler(rejectWithValue, error, "Internal Server Error")

        }
    },
    {
        condition: (_, { getState }) => {
            const { loading } = getState().channelsSlice;

            console.log(loading);

            if (loading) return false;
            
            
        },
    }
)