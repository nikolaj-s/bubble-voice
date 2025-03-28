import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { API_URL } from "../../../lib/Validation";

import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";


export const globalSearch = createAsyncThunk(
    'searchSlice/globalSearch',
    async (_, {rejectWithValue, getState}) => {
        try {

            const {query, filter} = getState().searchSlice;

            if (!query) return rejectWithValue("Query cannot be empty");

            if (!filter) return rejectWithValue("Invalid Filter");

            const {token }= getState().authSlice;

            const response = await axios.get(`${API_URL}/search/${filter}`, {
                headers: {TOKEN: token},
                params: {query: query}
            }).then(res => {
                return res.data;
            })

            if (response.success) {
                return {filter: filter, ...response};
            }
            
            return rejectWithValue("No Results");
        } catch (error) {
           
            return APIErrorHandler(rejectWithValue, error, "Fatal Error Gettig Results Try Again Later")

        }
    }
)