import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const reorderServers = createAsyncThunk('reorderServers/serversSlice', async (new_order, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        if (!new_order) return rejectWithValue("Invalid Server Order");

        new_order = new_order.map(s => s._id);

        await axios({
            method: "POST",
            url: `${API_URL}/servers/reorder`,
            data: {new_order},
            headers: {TOKEN: token}
        })

        return {success: true, new_order};

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})