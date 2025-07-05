import { createSlice } from "@reduxjs/toolkit";
import { reorderServers } from "./Thunks/reorderServers";

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
        removeServer: (state, action) => {
            state.servers = state.servers.filter(s => s._id !== action.payload.server_id);
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
        toggleNewMessageStatus: (state, action) => {
            state.servers = state.servers.map(server => {
                if (action.payload.server_id === server.server_id) {
                    return {...server, unread_message: action.payload.unread_message}
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
    },
    extraReducers: (builder) => {
        builder.addCase(reorderServers.pending, (state, action) => {
            
            const new_order = action.meta.arg?.map(s => s._id);

            state.servers.sort((a, b) => new_order.indexOf(a._id) - new_order.indexOf(b._id));

        })
    }
})

export const selectServers = state => state.serversSlice.servers;

export const {setServers, addServer, updateServerButton, setServerStatus, toggleNewMessageStatus, removeServer } = serversSlice.actions;

export default serversSlice.reducer;