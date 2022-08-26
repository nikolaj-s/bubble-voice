import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, url } from "../../util/Validation";

import Axios from 'axios';
import { setServerId, setServerName } from "../server/ServerSlice";
import { pushNewServerCard } from "../sideBar/sideBarSlice";

export const joinNewServer = createAsyncThunk(
    'joinServerSlice/joinNewServer',
    async (_, {getState, rejectWithValue, dispatch}) => {
        const { selectedServer, password } = getState().joinServerSlice;

        if (!selectedServer.server_id) return rejectWithValue({error: true, errorMessage: "Invalid Server Issue"});

        if (!password) return rejectWithValue({error: true, errorMessage: "Password input cannot be empty"});

        const token = await getToken();

        const result = await Axios({
            method: "POST",
            url: `${url}/join-new-server`,
            headers: {"TOKEN": token},
            data: {server_id: selectedServer.server_id, password: password}
        }).then(response => {
            console.log(response)
            if (response.data.error) {
                return rejectWithValue({error: true, errorMessage: response.data.errorMessage});
            }

            if (response.data.success) {
                // on data response success set set server slice to include the required details
                // then redirect to the server route to load the server component
                dispatch(setServerId(response.data.server.server_id));
                dispatch(setServerName(response.data.server.server_name));
                dispatch(pushNewServerCard(response.data.server));
                window.location.hash = `/dashboard/server/${response.data.server.server_name}`;
            }
            
        }).catch(error => {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: "fatal error has occurred"});
        })

        return result;
    }
)

const joinServerSlice = createSlice({
    name: "joinServerSlice",
    initialState: {
        selectedServer: {},
        loading: false,
        error: false,
        errorMessage: "",
        password: "",
    },
    reducers: {
        setServerToJoin: (state, action) => {
            state.selectedServer = action.payload;
        },
        closeJoinServerError: (state, action) => {
            state.error = false;
            state.errorMessage = "";
        },
        setJoinServerState: (state, action) => {
            state[action.payload.state] = action.payload.value;
        },
        cleanUpJoiningNewServerState: (state, action) => {
            state.error = false;
            state.errorMessage = "";
            state.selectedServer = {};
            state.loading = false;
        }
    },
    extraReducers: {
        [joinNewServer.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
            state.errorMessage = "";
        },
        [joinNewServer.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.errorMessage = "";
        },
        [joinNewServer.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
        }
    }
})

// selectors
export const selectServerToJoin = state => state.joinServerSlice.selectedServer;

export const selectServerToJoinPassword = state  => state.joinServerSlice.password;

export const selectServerToJoinLoading = state => state.joinServerSlice.loading;

export const selectServerToJoinErrorState = state => state.joinServerSlice.error;

export const selectServerToJoinErrorMessage = state => state.joinServerSlice.errorMessage;

// actions
export const { cleanUpJoiningNewServerState, setServerToJoin, closeJoinServerError, setJoinServerState } = joinServerSlice.actions;

export default joinServerSlice.reducer;