import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const fetchServerContentSettings = createAsyncThunk('fetchServerContentSettings/serverContentDataSlice', async (__, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!token || !server_id) return rejectWithValue("Validation Error");

        const response = await axios({
            method: "GET",
            url: `${API_URL}`
        })

    } catch (error) {
        return APIErrorHandler(rejectWithValue, error);
    }
})