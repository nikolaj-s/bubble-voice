import { createSlice } from "@reduxjs/toolkit";


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
    }
})


export const {toggleCreateServerMenu} = createServerSlice.actions;

export const selectCreateServerMenuOpenState = state => state.createServerSlice.open;

export const selectCreateServerNameError = state => state.createServerSlice.nameError;

export const selectCreateServerError = state => state.createServerSlice.error;

export const selectCreateServerPasswordError = state => state.createServerSlice.passwordError;

export default createServerSlice.reducer;