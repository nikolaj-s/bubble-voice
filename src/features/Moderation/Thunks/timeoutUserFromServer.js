import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { getPermissions } from "../../../lib/getPermissions";
import axios from "axios";

export const timeoutUserFromServer = createAsyncThunk('moderationSlice/timeoutUserFromServer', async (targetUser, {rejectWithValue, getState, dispatch}) => {
    try {

        const {server_id} = getState().serverDetailsSlice;

        const permissions = getPermissions(getState);

        const {token: TOKEN} = getState().authSlice;

        const res = await axios({


        })

    } catch (error) {
        console.log(error);

        

        return APIErrorHandler(rejectWithValue, error);
    }
})

