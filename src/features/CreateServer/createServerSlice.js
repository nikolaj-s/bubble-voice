import { createSlice } from "@reduxjs/toolkit";

import { CreateServerThunk } from "./Thunks/CreateServerThunk";

const createServerSlice = createSlice({
    name: "createServerSlice",
    initialState: {
        loading: false,
        error: false,
        nameError: false,
        passwordError: false,
        open: false
    },
    toggleCreateServerMenu: (state, action) => {
        state.open = action.payload;
    },
    extraReducers: (builder) => {
        builder.addCase(CreateServerThunk.pending, state => {
            state.loading = true;
            state.error = false;
        })
        .addCase(CreateServerThunk.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(CreateServerThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
})

export const {toggleCreateServerMenu} = createServerSlice.actions;

export const selectCreateServerMenuOpenState = state => state.createServerSlice.open;

export const selectCreateServerNameError = state => state.createServerSlice.nameError;

export const selectCreateServerError = state => state.createServerSlice.error;

export const selectCreateServerLoading = state => state.createServerSlice.loading;

export const selectCreateServerPasswordError = state => state.createServerSlice.passwordError;

export default createServerSlice.reducer;