import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";


export const getInviteDetails = createAsyncThunk('getInviteDetails', async (invite, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const response = await axios({
            url: `${API_URL}/invites/get-invite-link-details`,
            method: "GET",
            headers: {TOKEN: token},
            params: {invite}
        })
        console.log(response.data)
        return response.data;

    } catch (error) {
        return APIErrorHandler(rejectWithValue, error);
    }
})