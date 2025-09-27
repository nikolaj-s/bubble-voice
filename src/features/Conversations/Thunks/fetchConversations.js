import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const fetchConversations = createAsyncThunk('fetchConversations/conversationsSlice', async (_, {getState, rejectWithValue}) => {
    try {

        const {token} = getState().authSlice;

        const response = await axios({
            method: "GET",
            url: `${API_URL}/conversations`,
            headers: {TOKEN: token}
        })
console.log(response.data)
        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})