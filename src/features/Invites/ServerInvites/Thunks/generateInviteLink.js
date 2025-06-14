
import { createAsyncThunk } from "@reduxjs/toolkit";

import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";

import axios from "axios";

import { API_URL, INVITE_URL } from "../../../../lib/Validation";

import { triggerAlert } from "../../../Alerts/alertsSlice";

export const generateInviteLink = createAsyncThunk('generateInviteLink/serverInvitesSlice', async (_, {getState, rejectWithValue, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const response = await axios({
            method: "POST",
            headers: {TOKEN: token},
            url: `${API_URL}/invites/generate-link`,
            data: {server_id}
        })

        dispatch(triggerAlert('Link Generated', 'success'));

        return `${INVITE_URL}?inviteKey=${response.data}`;

    } catch (error) {

        dispatch(triggerAlert('Failed To Generate Link', 'error'));

        return APIErrorHandler(rejectWithValue, error)
    }
})