import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { API_URL } from "../../../lib/Validation";

import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import { getCachedSearchResults, setCachedSearchResults } from "../../../lib/indexedDBCache";

export const globalSearch = createAsyncThunk(
    'searchSlice/globalSearch',
    async (_, {rejectWithValue, getState}) => {
        try {

            const {query, filter, similarImageSrc, isPinned, hasImage, hasVideo, hasLink, fromDate, selectedChannel} = getState().searchSlice;

            const {disableSafeSearch} = getState().searchSettingsSlice;

            const {server_id} = getState().serverDetailsSlice;

            if (!filter) return rejectWithValue("Invalid Filter");

            if (!query.trim().length === 0 && !similarImageSrc && filter.path !== 'text-channel') return rejectWithValue("Query cannot be empty");

            const { token }= getState().authSlice;

            if ((filter.path === 'videos' || filter.path === 'images') && query) {
                const cached = await getCachedSearchResults(`${query}${filter.path}`);

                if (cached?.results) {
                    console.log('using cached search results');
                    return {filter: filter.path, results: cached.results, success: true}
                }
            }

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
                    disableSafeSearch,
                    channel: selectedChannel?.channel_id === '*' ? null : selectedChannel.channel_id
                }
            }).then(res => {
                return res.data;
            })
      
            if (response.success) {
                if (query) setCachedSearchResults({query: `${query}${filter.path}`, results: response.results})

                return {filter: filter.path, ...response};
            }
            
            return rejectWithValue("No Results");
        } catch (error) {
           console.log(error)
            return APIErrorHandler(rejectWithValue, error, "Fatal Error Getting Results Try Again Later")

        }
    }
)