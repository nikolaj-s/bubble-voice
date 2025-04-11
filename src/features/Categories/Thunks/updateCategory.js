import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const updateCategory = createAsyncThunk(
    'updateCategory/categoriesSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

            if (!params.category_id && !params._id) return rejectWithValue("No valid category data");

            const {server_id} = getState().serverDetailsSlice;

            const {token} = getState().authSlice;

            const category = params;

            const response = await axios({
                method: "PUT",
                url: `${API_URL}/categories/update`,
                headers: {TOKEN: token},
                data: {category, server_id}
            })

            return response.data;

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error, "Internal Server Error");
        }
    }
)