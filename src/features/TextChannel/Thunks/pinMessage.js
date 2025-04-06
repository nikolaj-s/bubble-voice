import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";


export const pinMessage = createAsyncThunk(
    'pinMessage/textChannelSlice',
    async (params, {rejectWithValue, getState}) => {
        try {

            const {token} = getState().authSlice;

            if (!params.message_id) return rejectWithValue("no message provided to pin");

            const data = generateFormData(params);

            await axios({
                method: "PUT",
                url: `${API_URL}/social/pin`,
                headers: {TOKEN: token},
                data
            })

            return true;

        } catch (error) {

            return APIErrorHandler(rejectWithValue, error, "Internal Server Error")
        }
    }
)