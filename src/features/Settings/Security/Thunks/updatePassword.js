import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";
import { triggerAlert } from "../../../Alerts/alertsSlice";

export const updatePassword = createAsyncThunk('updatePassword/securitySlice', async (params, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        if (!params.currentPassword || !params.newPassword || !params.confirmPassword) return rejectWithValue("Invalid Input");

        if (params.newPassword !== params.confirmPassword) return rejectWithValue("New password and confirm password do not match");

        const data = generateFormData(params);

        const response = await axios({
            method: "PUT",
            url: `${API_URL}/security/update-password`,
            headers: {TOKEN: token},
            data
        })

        if (response.data.success) {
            dispatch(triggerAlert("Password Updated"))
        }

        return {success: true};
    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})

