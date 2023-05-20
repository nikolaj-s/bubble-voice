import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from 'axios'

import { pushNewServerCard } from "../sideBar/sideBarSlice";
import { setServerId } from "../server/ServerSlice";
import { getToken, url } from "../../util/Validation";


export const createServerFunction = createAsyncThunk(
    'createServerSlice/createServerFunction',
    async (image, {getState, rejectWithValue, dispatch}) => {
        const {serverName, serverPassword, confirmServerPassword } = getState().createServerSlice;
        // validate data to avoid unecessary server calls
        if (serverName.length === 0) return rejectWithValue({error: true, errorMessage: "Server name input cannot be empty"});

        if (serverName.length < 6) return rejectWithValue({error: true, errorMessage: "Server Name Cannot Be Less Than 6 Characters Long"});

        if (image.size > 5000000) return rejectWithValue({error: true, errorMessage: "server banner file size exceeds the data cap of 5mb"});

        if (serverPassword.length === 0) return rejectWithValue({error: true, errorMessage: "server password cannot be empty"});

        if (confirmServerPassword.length === 0) return rejectWithValue({error: true, errorMessage: "server password confirmation input cannot be empty"});

        if (serverPassword.length < 6) return rejectWithValue({error: true, errorMessage: "server password cannot be less than 6 characters long"});

        if (serverPassword !== confirmServerPassword) return rejectWithValue({error: true, errorMessage: "server password and confirm server password do not match"});
        
        const token = await getToken();

        const data = new FormData();

        data.append("server_name", serverName);

        data.append("server_password", serverPassword);

        data.append("image", image);
        
        const result = await Axios({
            method: "POST",
            url: `${url}/create-server`,
            headers: {TOKEN: token},
            data: data,
        }).then(response => {
            
            if (response.data.error) {
                return rejectWithValue({error: true, errorMessage: response.data.errorMessage});
            }
            
            dispatch(pushNewServerCard(response.data.server));
            dispatch(setServerId(response.data.server.server_id));

            return response.data;
        })
        .catch(error => {
            return rejectWithValue({error: true, errorMessage: "unexpected server error has occurred"})
        })

        return result;
    }
)

const createServerSlice = createSlice({
    name: "createServerSlice",
    initialState: {
        serverName: "",
        serverBanner: {},
        serverPassword: "",
        confirmServerPassword: "",
        error: false,
        errorMessage: "",
        loading: false,
        visible: false
    },
    reducers: {
        closeCreateServerError: (state, action) => {
            state.error = false;
            state.errorMessage = "";
        },
        createServerSetServerBanner: (state, action) => {
            state.serverBanner = action.payload;
        },
        clearCreateServerState: (state, action) => {
            state.serverName = "";
            state.serverBanner = {};
            state.serverPassword = "";
            state.confirmServerPassword = "";
            state.error = false;
            state.errorMessage = "";
            state.loading = false;
        },
        setCreateServerState: (state, action) => {
            state[action.payload.state] = action.payload.value;
        },
        toggleAddServerMenu: (state, action) => {
            state.visible = action.payload;
        }
    },
    extraReducers: {
        [createServerFunction.pending]: (state, action) => {
            state.loading = true;
        },
        [createServerFunction.fulfilled]: (state, action) => {
            if (action.payload.success) {
                state.loading = false;
                state.serverName = "";
                state.serverPassword = "";
                state.confirmServerPassword = "";
                state.visible = false;
                window.location.hash = `/dashboard/server/${action.payload.server.server_name}`;
            }
                
        },
        [createServerFunction.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
        }

    }
})

// actions
export const {toggleAddServerMenu, closeCreateServerError, createServerSetServerBanner, clearCreateServerState, setCreateServerState } = createServerSlice.actions;

// selectors
export const selectCreateServerName = state => state.createServerSlice.serverName;

export const selectCreateServerPassword = state => state.createServerSlice.serverPassword;

export const selectCreateConfirmServerPassword = state => state.createServerSlice.confirmServerPassword;

export const selectCreateServerLoadingState = state => state.createServerSlice.loading;

export const selectCreateServerErrorState = state => state.createServerSlice.error;

export const selectCreateServerErrorMessage = state => state.createServerSlice.errorMessage;

export const selectAddServerMenuVisible = state => state.createServerSlice.visible;

export default createServerSlice.reducer;