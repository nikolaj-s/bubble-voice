import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";


export const createPermissionGroup = createAsyncThunk(
    'createPermissionGroup/serverPermissionsSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error);
        }
    }
)