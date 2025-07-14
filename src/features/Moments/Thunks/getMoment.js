import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { isValidObjectId } from "../../../lib/services/helperFunctions";

export const getMoment = createAsyncThunk('getMoment/momentSlice', async (momentID, {rejectWithValue, getState}) => {
    try {

        const {token} = getState().authSlice;

        if (!isValidObjectId(momentID)) return rejectWithValue('Invalid Moment ID')

        const cached = sessionStorage.getItem(`moment_${momentID}`);

        if (cached) return JSON.parse(cached);

        const response = await axios({
            method: "GET",
            url: `${API_URL}/moments/${momentID}`,
            headers: {TOKEN: token}
        })

        sessionStorage.setItem(`moment_${momentID}`, JSON.stringify(response.data));

        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})

