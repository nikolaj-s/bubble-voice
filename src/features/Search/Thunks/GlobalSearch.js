import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { API_URL } from "../../../lib/Validation";

import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";

export const globalSearch = createAsyncThunk(
    'searchSlice/globalSearch',
    async (_, {rejectWithValue, getState}) => {
        try {

            const {query, filter, similarImageSrc, isPinned, hasImage, hasVideo, hasLink, fromDate, selectedChannel} = getState().searchSlice;

            const {server_id} = getState().serverDetailsSlice;

            if (!filter) return rejectWithValue("Invalid Filter");

            if (!query.trim().length === 0 && !similarImageSrc && filter.path !== 'text-channel') return rejectWithValue("Query cannot be empty");

            const { token }= getState().authSlice;

            const response = await axios.get(`${API_URL}/search/${filter.path}`, {
                headers: {TOKEN: token},
                params: {
                    query, 
                    similarImage: similarImageSrc,
                    isPinned,
                    hasImage,
                    hasVideo,
                    hasLink,
                    server_id,
                    fromDate,
                    channel: selectedChannel?.channel_id === '*' ? null : selectedChannel.channel_id
                }
            }).then(res => {
                return res.data;
            })

            if (response.success) {
                return {filter: filter.path, ...response};
            }
            
            return rejectWithValue("No Results");
        } catch (error) {
           console.log(error)
            return APIErrorHandler(rejectWithValue, error, "Fatal Error Getting Results Try Again Later")

        }
    }
)