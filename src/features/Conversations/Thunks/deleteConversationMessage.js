import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { triggerAlert } from "../../Alerts/alertsSlice";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { isValidObjectId } from "../../../lib/services/helperFunctions";


export const deleteConversationMessage = createAsyncThunk('deleteConversationMessage/conversationSlice', async (message, {rejectWithValue, dispatch, getState}) => {
    try {

        const {token} = getState().authSlice;

        if (!isValidObjectId(message._id)) return rejectWithValue("Invalid Message ID");

        if (!isValidObjectId(message.conversation_id)) return rejectWithValue("Invalid Conversation ID");

        await axios({
            url: `${API_URL}/conversations/${message.conversation_id}/message`,
            headers: {TOKEN: token},
            data: {message_id: message._id},
            method: 'DELETE'
        })

        dispatch(triggerAlert("Message Deleted", 'success'));

        return message;

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert('Fatal Error Deleting Message', 'error'))
        return APIErrorHandler(rejectWithValue, error);
    }
})