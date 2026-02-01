import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { generateFormData } from "../../../../lib/services/generateFormData";
import axios from "axios";
import { API_URL } from "../../../../lib/Validation";
import { triggerAlert } from "../../../Alerts/alertsSlice";
import { removeMessageFromSearchResults } from "../../../Search/searchSlice";


export const deleteMessage = createAsyncThunk(
    'deleteMessage/textChannelSlice',
    async (params, {rejectWithValue, getState, dispatch}) => {

        try {

            const { server_id } = getState().serverDetailsSlice;

            if (!params.message_id) return rejectWithValue("No Message Details Provided");

            const {token} = getState().authSlice;

            const data = generateFormData({...params, server_id: server_id});

            const response = await axios({
                method: "DELETE",
                url: `${API_URL}/text-channel/delete`,
                headers: {TOKEN: token},
                data
            })

            if (response.data.deleted) {
                
                dispatch(triggerAlert("Message Deleted"));

                dispatch(removeMessageFromSearchResults(params.message_id));

                return response.data;
            }

            return rejectWithValue("Internal Server Error");

        } catch (error) {
            console.log(error);

            return APIErrorHandler(rejectWithValue, error, "Internal Server Error");
        }

    }
)