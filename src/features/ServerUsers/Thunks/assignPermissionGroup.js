import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const assignPermissionGroup = createAsyncThunk(
    'assignPermissionGroup/serverUsersSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

            if (!params.user_id && !params.new_server_group) return rejectWithValue("Invalid Input");

            const {token} = getState().authSlice;

            const {server_id} = getState().serverDetailsSlice;

            const data = generateFormData({...params, server_id});

            await axios({
                method: "POST",
                url: `${API_URL}/permissions/assign`,
                headers: {TOKEN: token},
                data
            })

            return {success: true}

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error, 'Internal Server Error');
        }
    }
)