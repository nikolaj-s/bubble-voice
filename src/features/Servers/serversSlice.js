import { createSlice } from "@reduxjs/toolkit";
import { testServerListData } from "../../lib/TestData";

const serverSlice = createSlice({
    name: 'serverSlice',
    initialState: {
        servers: [],
        loading: false,
        error: false
    },
    reducers: {
        setServers: (state, action) => {
            state.servers = action.payload;
        }
    }
})

export const selectServers = state => state.serverSlice.servers;

export default serverSlice.reducer;