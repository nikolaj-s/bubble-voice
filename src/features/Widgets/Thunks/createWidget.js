import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";

export const createWidget = createAsyncThunk('createWidget/manageWidgetsSlice', async (params, {rejectWithValue, getState}) => {
    try {

        const {server_id} = getState().serverDetailsSlice;

        const {channel_id} = getState().manageWidgetsSlice;

        const {token} = getState().authSlice;

        let data = new FormData();

        switch (params.type) {
            case "gallery": 
                params.images.forEach(img => {
                    data.append('images', img);
                })
                break;
            case "single_image":
                data.append('image', params.image);
                break;
            case "embed":
                data.append('embed', params.embed);
                break;
            case "rich_text":
                data.append('text', params.text);
                break;
            case "dynamic_media":
                data.append('query', params.query);
                break;
            default:
                return rejectWithValue("Invalid Widget Type");
        }

        data.append('channel_id', channel_id);

        data.append('server_id', server_id);

        data.append('type', params.type);

        const response = await axios({
            url: `${API_URL}/widgets`,
            method: "POST",
            headers: {TOKEN: token},
            data
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        return APIErrorHandler(rejectWithValue, error);
    }
})