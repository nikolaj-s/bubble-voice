import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";


export const sendMessage = createAsyncThunk(
    'sendMessage/textChannelSlice',
    async (params, {rejectWithValue, dispatch, getState}) => {
        try {

            const {server_id} = getState().serverDetailsSlice;

            const {token} = getState().authSlice;

            if (!token) return rejectWithValue("Validation Error");
     
            if (!params.channel_id) return rejectWithValue("Invalid Channel");

            if (params.text?.trim().length === 0 && !params.image) return rejectWithValue("Cannot send an empty message")

            if (params?.text?.length > 1024) return rejectWithValue("Message exceeds the character limit");

            const data = generateFormData({...params, channel_id: params.channel_id, server_id: server_id, reply_to: params?.reply_to?._id})

            const response = await axios({
                method: "POST",
                url: `${API_URL}/text-channel/send`,
                data,
                headers: {TOKEN: token}
            })

            if (response?.data?.sent) {
                return {sent: true}
            }

            return rejectWithValue("Fatal Error Sending Message");
        } catch (error) {
            console.log(error)
            return APIErrorHandler(rejectWithValue, error, "Internal Server Error");
        }
    }
)


