import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const fetchUserRecommendations = createAsyncThunk(
    'fetchUserRecommendations/userRecommendations',
    async (__, {rejectWithValue, getState}) => {
        try {

            const {token} = getState().authSlice;

            if (!token) return rejectWithValue("Validation Error");

            const response = await axios({
                method: "GET",
                headers: {TOKEN: token},
                url: `${API_URL}/recommendations/fetch-user-recommendations`
            })

            console.log(response);

            return response.data;

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error, 'Internal Server Error')
        }
    }
)
