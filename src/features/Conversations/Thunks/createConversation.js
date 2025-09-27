import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { setCurrentConversation } from "../conversationSlice";

export const createConversation = createAsyncThunk('createConversation/conversationsSlice', async (user_id, {getState, rejectWithValue, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        if (!isValidObjectId(user_id)) return rejectWithValue("Invalid User ID");

        const {selectedConversation} = getState().conversationSlice;

        const response = await axios({
            method: "POST",
            headers: {TOKEN: token},
            url: `${API_URL}/conversations/create`,
            data: {to: user_id}
        })
      
        dispatch(setCurrentConversation(response.data));

        return response.data;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})