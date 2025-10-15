import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { clearToken, setToken } from "../../../lib/services/authService";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const signInWithGoogle = createAsyncThunk('signInWithGoogle/authSlice', async (credential, {rejectWithValue}) => {
    try {

        const isDekstop = window?.electron?.ipcRenderer;

        clearToken();

        const response = await axios({
            method: "POST",
            url: `${API_URL}/auth/google-sign-in`,
            data: {credential},
            params: isDekstop ? {desktop: true} : {},
            
        })

        if (response.data) {
            setToken(response.data.token);

            return response.data;
        }

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})