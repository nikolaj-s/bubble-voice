import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { closeOverlay } from "../../Overlay/overlaySlice";


export const createMoment = createAsyncThunk('createMoment/momentsSlice', async ({messages, name, channel_id, description}, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (messages.length === 0 || messages.length > 10) return rejectWithValue("a moment cannot be empty or contain more than 10 messages");

        if (name.trim().length < 2) return rejectWithValue('Moment name cannot be less than 2');

        const response = await axios({
            method: "POST",
            headers: {TOKEN: token},
            url: `${API_URL}/moments/create`,
            data: {server_id, channel_id, name, description, messages}
        })

        sessionStorage.removeItem(`moments_${server_id}_${channel_id}_${1}`)

        dispatch(closeOverlay());
      
        return {...response.data, new: true};

    } catch (error) {
        return APIErrorHandler(rejectWithValue, error);
    }
})

