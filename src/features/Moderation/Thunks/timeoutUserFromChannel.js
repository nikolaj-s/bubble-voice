import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";

export const timeoutUserFromChannel = createAsyncThunk('moderationSlice/timeoutUserFromChannel', async ({userId, channelId}, {rejectWithValue, getState, dispatch}) => {
    try {

        

    } catch (error) {
        console.log(error);

        return APIErrorHandler(rejectWithValue, error);
    }
})