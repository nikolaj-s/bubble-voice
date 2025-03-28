import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { generateFormData } from "../../../lib/services/generateFormData";
import { API_URL } from "../../../lib/Validation";


export const deleteSearchHistoryItem = createAsyncThunk(
    'deleteHistory/searchSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

            if (!params.query) return rejectWithValue("No selected history item to delete");

            const {token} = getState().authSlice;

            const data = generateFormData(params);

            await axios({
                method: "POST",
                url: `${API_URL}/search-history/delete`,
                data,
                headers: {TOKEN: token}
            })

            return params.query;

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)