import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from 'axios';
import { getToken, url } from "../../util/Validation";

export const fetchUsersServerList = createAsyncThunk(
    'sideBarSlice/fetchUsersServerList',
    async (_, {rejectWithValue}) => {
        const token = await getToken();
        // placeholder functionality
        const list = await Axios({
            method: "GET",
            url: `${url}/fetch-server-list`,
            headers: {TOKEN: token}
        }).then(response => {
            if (response.data.error) {
                return rejectWithValue({error: true, errorMessage: response.data.errorMessage})
            }

            return response.data.servers;
        })

        return list;
    }
)

export const searchForServers = createAsyncThunk(
    'sideBarSlice/searchForServers',
    async ({value}, { rejectWithValue }) => {
        const token = await getToken();
        // place holder syntax
        const servers = Axios({
            method: "POST",
            url: `${url}/query-server-list`,
            headers: {TOKEN: token},
            data: {query: value}
        }).then(response => {
            if (response.data.error) {
                return rejectWithValue({error: true, errorMessage: "unexpected error while searching for servers"})
            }

            return response.data.servers;
        })

        return servers;
    }
)

const sideBarSlice = createSlice({
    name: "sideBarSlice",
    initialState: {
        serverList: [],
        loadingUsersServers: true,
        header: "Servers",
        loadingServerResults: false,
        serverSearchResults: [],
        serverQuery: ""
    },
    reducers: {
        setSideBarHeader: (state, action) => {
            state.header = action.payload;
        },
        setServerQuery: (state, action) => {
            state.serverQuery = action.payload;
        },
        pushNewServerCard: (state, action) => {
            state.serverList.push(action.payload);
        },
        removeServer: (state, action) => {
            state.serverList = state.serverList.filter(s => s.server_id !== action.payload)
        }
    },
    extraReducers: {
        [fetchUsersServerList.pending]: (state, action) => {
            state.loadingUsersServers = true;
        },
        [fetchUsersServerList.fulfilled]: (state, action) => {
            state.serverList = action.payload;
            state.loadingUsersServers = false;
            
        },
        [fetchUsersServerList.rejected]: (state, action) => {

        },
        [searchForServers.pending]: (state, action) => {
            state.loadingServerResults = true;
        },
        [searchForServers.fulfilled]: (state, action) => {
            state.serverSearchResults = action.payload;
            state.loadingServerResults = false;
        },
        [searchForServers.rejected]: (state, action) => {
            state.loadingServerResults = false;
        }
    }
})

// selectors
export const selectLoadingServerResultsState = state => state.sideBarSlice.loadingServerResults;

export const selectServerSearchResults = state => state.sideBarSlice.serverSearchResults;

export const selectServerList = state => state.sideBarSlice.serverList;

export const selectLoadingUsersServersState = state => state.sideBarSlice.loadingUsersServers;

export const selectSideBarHeader = state => state.sideBarSlice.header;

export const selectServerQuery = state => state.sideBarSlice.serverQuery;

// actions

export const {removeServer, setSideBarHeader, setServerQuery, pushNewServerCard } = sideBarSlice.actions;

export default sideBarSlice.reducer;