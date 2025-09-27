import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import { generateFormData } from "../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { updateConversationTimeStamp } from "../conversationsSlice";

export const sendConversationMessage = createAsyncThunk('sendConversationMessage/conversationSlice', async (params, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        if (params.text?.trim().length === 0 && !params.image && !params.images) return rejectWithValue('Cannot send an empty message');

        if (!isValidObjectId(params.conversation_id)) return rejectWithValue("Invalid Conversation");

        const data = generateFormData({...params, conversation_id: params.conversation_id})

        const response = await axios({
            method: "POST",
            url: `${API_URL}/conversations/${params.conversation_id}/message`,
            data,
            headers: {TOKEN: token}
        })

        dispatch(updateConversationTimeStamp(response.data));

        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})


