import { createSlice } from "@reduxjs/toolkit";
import { leaveServer } from "./Thunks/leaveServer";


const leaveServerSlice = createSlice({
    name: 'leaveServerSlice',
    initialState: {
        leavingServer: null,
        loading: false,
        error: false,
    },
    reducers: {
        setServerToLeave: (state, action) => {
            state.leavingServer = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(leaveServer.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(leaveServer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(leaveServer.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.leavingServer = null;
        })
    }
})

export const {setServerToLeave} = leaveServerSlice.actions;

export default leaveServerSlice.reducer;