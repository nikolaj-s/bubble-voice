import { createSlice } from "@reduxjs/toolkit";
import { JoinServer } from "./Thunks/JoinServer";

const joinServerSlice = createSlice({
    name: "joinServerSlice",
    initialState: {
        selectedServer: {},
        loading: false,
        error: false,
        status: 'idle',
        password: ""
    },
    reducers: {
        setSelectedServerToJoin: (state, action) => {
            state.selectedServer = action.payload;
        },
        resetJoinServerStatus: (state, action) => {
            state.status = 'idle';
        },
        setServerToJoinPassword: (state, action) => {
            state.password = action.payload;
        },
        setJoinServerError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(JoinServer.pending, (state) => {
            state.loading = true;
            state.status = 'loading';
        })
        builder.addCase(JoinServer.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = 'error';
        })
        builder.addCase(JoinServer.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;
            state.status = 'complete'
        })
    }
})

export const {setSelectedServerToJoin, setServerToJoinPassword, setJoinServerError} = joinServerSlice.actions;

export default joinServerSlice.reducer;