import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { closeOverlay } from "../../Overlay/overlaySlice";


export const createCategory = createAsyncThunk(
    'createCategory/channelsSlice',
    async (params, {rejectWithValue, getState, dispatch}) => {
        try {

            if (params.categoryName.trim().length < 3 || !params.categoryName) return rejectWithValue("Category name must be greater than 3 characters long")

            const {token} = getState().authSlice;

            if (!token) return rejectWithValue("Validation Error");

            const {server_id} = getState().serverDetailsSlice;

            if (!server_id) return rejectWithValue("Validation Error");

            const data = generateFormData({...params, server_id});

            const response = await axios({
                method: "POST",
                url: `${API_URL}/categories/create`,
                headers: {TOKEN: token},
                data
            })

            if (response.data.success) {
                dispatch(closeOverlay());

                return response.data;
            }

            return rejectWithValue("Internal Server Error");

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error, "Internal Server Error")
        
        }
    
    }
)