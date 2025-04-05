import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const fetchServers = createAsyncThunk(
    'fetchServers/serversSlice',
    async (_, {rejectWithValue, getState}) => {
        try {

            const {token} = getState().authSlice;

            if (!token) return rejectWithValue("Validation Error");

            const response = await axios({
                url: `${API_URL}/servers/fetch`,
                headers: {TOKEN: token},
                method: "GET"
            })

            if (response.data) {

            }

            return rejectWithValue("Internal Server Error");

        } catch (error) {
            console.log(error);

            return APIErrorHandler(rejectWithValue, error, "Internal Server Error");
        }
    }
)