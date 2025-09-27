import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const fetchConversationMessages = createAsyncThunk('fetchConversationMessages', async (params, {rejectWithValue, getState}) => {
    try {
        
        const {conversation_id, last_message_id, count = 20} = params;

        if (!isValidObjectId(conversation_id)) return rejectWithValue('Invalid Conversation ID');

        if (!last_message_id) {
            try {

            } catch (e) {

            }
        }

        const {token} = getState().authSlice;

        const response = await axios({
            method: "GET",
            url: `${API_URL}/conversations/${conversation_id}/messages`,
            headers: {TOKEN: token},
            params: {conversation_id, last_message_id, count}
        })

        return {
            conversation_id,
            messages: response.data.messages || [],
            no_more_messages: response.data.no_more_messages,
            last_message_id
        }

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})