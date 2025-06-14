import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL, INVITE_URL } from "../../../../lib/Validation";

export const getInviteLink = createAsyncThunk('getInviteLink/serverInvitesSlice', async (_, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const {inviteLink} = getState().serverInvitesSlice;

        if (inviteLink) return inviteLink;

        const response = await axios({
            method: "GET",
            url: `${API_URL}/invites/get-invite-link`,
            headers: {TOKEN: token},
            params: {server_id}
        })
      
        return `${INVITE_URL}?inviteKey=${response.data}`

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error)
    }
})