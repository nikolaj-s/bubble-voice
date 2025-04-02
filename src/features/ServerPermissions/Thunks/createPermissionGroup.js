import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const createPermissionGroup = createAsyncThunk(
    'createPermissionGroup/serverPermissionsSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

            const {server_id} = getState().serverDetailsSlice;

            const {token} = getState().authSlice;

            const data = generateFormData({...params, server_id});

            await axios({
                url: `${API_URL}/permissions/create`,
                method: "POST",
                headers: {TOKEN: token},
                data
            })

            return {success: true}

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)