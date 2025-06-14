import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";


export const fetchMessages = createAsyncThunk(
    'fetchMessages/textChannelSlice',
    async (params, {rejectWithValue, getState, dispatch}) => {
        try {

            const {token} = getState().authSlice;
            
            if (!params.channel_id) return rejectWithValue("Invalid Channel");

            const {server_id} = getState().serverDetailsSlice;

            let count = 20;

            const textChannelPos = JSON.parse(sessionStorage.getItem(`${params.channel_id}-pagination`)) || null;

            if (textChannelPos && !params?.last_message_id) {
                count = textChannelPos.count;
            }

            const response = await axios({
                method: "GET",
                url: `${API_URL}/social/fetch`,
                params: {channel_id: params.channel_id, last_message_id: params?.last_message_id, count: count, server_id: server_id},
                headers: {TOKEN: token}
            })

            if (response.data.messages) {
                return response.data;
            }

            return {messages: [], no_more_messages: true};

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error, 'Internal Server Error');
        }
    }
)