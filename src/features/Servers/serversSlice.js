import { createSlice } from "@reduxjs/toolkit";

const serversSlice = createSlice({
    name: 'serversSlice',
    initialState: {
        servers: [],
        loading: false,
        error: false
    },
    reducers: {
        setServers: (state, action) => {
            
            if (Array.isArray(action.payload)) {
                state.servers = action.payload;
            }
             
        },
        addServer: (state, action) => {
            state.servers.push(action.payload);
        }
    }
})

export const selectServers = state => state.serversSlice.servers;

export const {setServers, addServer} = serversSlice.actions;

export default serversSlice.reducer;