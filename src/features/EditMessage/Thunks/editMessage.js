import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { closeOverlay } from "../../Overlay/overlaySlice";


export const editMessage = createAsyncThunk('editMessageSlice/editMessage', async ({message, navigate}, {rejectWithValue, getState, dispatch}) => {
    try {

        const {token: TOKEN} = getState().authSlice;

        if (!message.channel_id) return rejectWithValue("You can only edit messages with a text channel");
        
        if (message?.text?.length === 0 && !message.image && !message.images) return rejectWithValue("Cannot update message to be empty");

        const response = await axios({
            method: "PUT",
            url: `${API_URL}/text-channel/update-message`,
            data: {message, server_id: message.server_id},
            headers: {TOKEN}
        })

        if (response.data.message) {

            const message = response.data.message;

            dispatch(closeOverlay());

            if (navigate) {
                navigate(`/dashboard/server/${message.server_id}/channel/${message.channel_id}?message=${message._id}`)
            }
        }

        return response.data.message;

    } catch (error) {
        console.log(error);

        return APIErrorHandler(rejectWithValue, error);
    }
})

