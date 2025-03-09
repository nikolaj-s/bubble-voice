
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    banner: "",
    status: "idle"
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
            state._id = action.payload.server_id;
            state.status = 'complete';
        },
        resetServerDetails: () => initialState,
    }
})

export const selectServerName = state => state.serverDetailsSlice.name;

export const selectServerBanner = state => state.serverDetailsSlice.banner;

export const selectServerDetailsStatus = state => state.serverDetailsSlice.status;

export const selectServerDetailsID = state => state.serverDetailsSlice._id;

export const {setServerDetails, setServerBanner, setServerName, resetServerDetails, setServerDetailsStatus} = serverDetailsSlice.actions;

export default serverDetailsSlice.reducer;