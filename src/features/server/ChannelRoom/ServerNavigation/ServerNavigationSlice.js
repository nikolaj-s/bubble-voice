import { createSlice } from "@reduxjs/toolkit";

const ServerNavigationSlice = createSlice({
    name: "ServerNavigationSlice",
    initialState: {
        page: "activity"
    },
    reducers: {
        handleChangePage: (state, action) => {
            state.page = action.payload;
        }
    }
})

export const selectCurrentServerPageState = state => state.ServerNavigationSlice.page;

export const { handleChangePage } = ServerNavigationSlice.actions;

export default ServerNavigationSlice.reducer;