import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const reorderWidgets = createAsyncThunk('reorderWidgets/manageWidgetsSlice', async (newOrder, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const response = await axios({
            method: "PUT",
            url: `${API_URL}/widgets/reorder`,
            headers: {TOKEN: token},
            data: {newOrder, server_id}
        })

        return response.data;

    } catch (error) {
        return APIErrorHandler(rejectWithValue, error);
    }
})