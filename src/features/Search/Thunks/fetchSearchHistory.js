import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const fetchSearchHistory = createAsyncThunk(
    'fetchSearchHistory/searchSlice',
    async (_, {rejectWithValue, getState}) => {
        try {

            const {token} = getState().authSlice;

            if (!token) return rejectWithValue("Validation Error");

            const response = await axios({
                method: "GET",
                url: `${API_URL}/search-history/fetch`,
                headers: {TOKEN: token}
            })

            if (response.data.search_history) {
                return response.data.search_history;
            }

            return [];

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)