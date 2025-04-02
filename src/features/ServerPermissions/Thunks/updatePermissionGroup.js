import { createAsyncThunk } from "@reduxjs/toolkit";

import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";

import axios from "axios";

import { API_URL } from "../../../lib/Validation";

export const updatePermissionGroup = createAsyncThunk(
    'updatePermissionGroup/serverPermissionsSlice',
    async (params, {rejectWithValue, getState}) => {
        try {
            console.log(params.updatedPermissions)

            const {token} = getState().authSlice;

            const {server_id} = getState().serverDetailsSlice;

            const data = {server_id, ...params}

            await axios({
                url: `${API_URL}/permissions/update`,
                headers: {TOKEN: token},
                method: "POST",
                data
            })

            return true;

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)