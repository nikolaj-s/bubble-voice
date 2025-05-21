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
        },
        updateServerButton: (state, action) => {

            state.servers = state.servers.map(server => {

                if (server.server_id === action.payload.server_id) {
                    return action.payload;
                } else {
                    return server;
                }
            
            })

        },
        setServerStatus: (state, action) => {

            state.servers = state.servers.map(server => {
                if (action.payload[server.server_id]) {
                    return {...server, ...action.payload[server.server_id]}
                } else {
                    return server;
                }
            })

        },
        toggleServersLoading: (state, action) => {
            state.loading = action.payload;
        },
        setServersError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const selectServers = state => state.serversSlice.servers;

export const {setServers, addServer, updateServerButton, setServerStatus} = serversSlice.actions;

export default serversSlice.reducer;