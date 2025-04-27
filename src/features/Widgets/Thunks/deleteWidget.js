import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const deleteWidget = createAsyncThunk('deleteWidget/manageWidgetsSlice', async (id, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const response = await axios({
            method: "DELETE",
            url: `${API_URL}/widgets/${id}`,
            headers: {TOKEN: token},
            params: {server_id}
        })

        console.log(response, 'DELETED');
        
        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})