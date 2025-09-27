import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { isValidObjectId } from "../../../lib/services/helperFunctions";
import { setCurrentConversation } from "../conversationSlice";
import { triggerAlert } from "../../Alerts/alertsSlice";


export const deleteConversation = createAsyncThunk('deleteConversation/conversationsSlice', async (conversation_id, {getState, rejectWithValue, dispatch}) => {
    try {

        const {token} = getState().authSlice;

        const {selectedConversation} = getState().conversationSlice;

        if (!isValidObjectId(conversation_id)) return rejectWithValue("Invalid Conversation ID");

        await axios({
            method: "DELETE",
            headers: {TOKEN: token},
            url: `${API_URL}/conversations/${conversation_id}`
        })

        if (selectedConversation?._id === conversation_id) {
            dispatch(setCurrentConversation(null));
        }

        dispatch(triggerAlert("Conversation Deleted"));
        
        return conversation_id;

    } catch (error) {
        console.log(error);
        rejectWithValue(rejectWithValue, error);
    }
})

