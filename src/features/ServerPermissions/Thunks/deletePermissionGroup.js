import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const deletePermissionGroup = createAsyncThunk(
    'deletePermissionGroup/serverPermissionsSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

            const {token} = getState().authSlice;

            const {server_id} = getState().serverDetailsSlice;

            if (!token || !server_id) return rejectWithValue("Validation Error");

            if (!params.permissionGroup) return rejectWithValue("No permission group was passed for deletion");

            const data = {...params, server_id}

            await axios({
                url: `${API_URL}/permissions/delete`,
                method: "POST",
                data,
                headers: {TOKEN: token}
            })

            return {success: true};

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)