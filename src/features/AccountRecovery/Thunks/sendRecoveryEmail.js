import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";


export const sendRecoveryEmail = createAsyncThunk('sendRecoveryEmail/accountRecoverySlice', async (email, {rejectWithValue}) => {
    try {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) return rejectWithValue("Invalid Email");

        await axios({
            method: "POST",
            url: `${API_URL}/recovery/send-recovery-email`,
            data: {email}
        })

        return {email};

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    } 
})