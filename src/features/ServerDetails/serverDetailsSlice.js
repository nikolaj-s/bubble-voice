
import { createSlice } from "@reduxjs/toolkit";
import { updateServerDetails } from "./Thunks/updateServerDetails";

const initialState = {
    server_id: "",
    name: "",
    banner: "",
    status: "idle",
    loading: false,
    error: false
}

const serverDetailsSlice = createSlice({
    name: "serverDetailsSlice",
    initialState,
    reducers: {
        setServerName: (state, action) => {
            state.name = action.payload;
        },
        setServerBanner: (state,action) => {
            state.banner = action.payload;
        },
        setServerDetailsStatus: (state, action) => {
            state.status = action.payload;
        },
        setServerDetails: (state, action) => {
            state.name = action.payload.server_name;
            state.banner = action.payload.server_banner;
            state.server_id = action.payload.server_id;
            state.status = 'complete';
        },
        resetServerDetails: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(updateServerDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(updateServerDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updateServerDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export const selectServerName = state => state.serverDetailsSlice.name;

export const selectServerBanner = state => state.serverDetailsSlice.banner;

export const selectServerDetailsStatus = state => state.serverDetailsSlice.status;

export const selectServerDetailsID = state => state.serverDetailsSlice._id;

export const {setServerDetails, setServerBanner, setServerName, resetServerDetails, setServerDetailsStatus} = serverDetailsSlice.actions;

export default serverDetailsSlice.reducer;