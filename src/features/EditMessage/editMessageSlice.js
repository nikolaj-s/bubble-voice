import { createSlice } from "@reduxjs/toolkit";
import { editMessage } from "./Thunks/editMessage";


const editMessageSlice = createSlice({
    name: "editMessageSlice",
    initialState: {
        selectedMessage: null,
        loading: false,
        error: false
    },
    reducers: {
        setMessageToEdit: (state, action) => {
            state.selectedMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(editMessage.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        .addCase(editMessage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(editMessage.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;
            state.selectedMessage = action.payload;
        })
    }
})

export const {setMessageToEdit} = editMessageSlice.actions;

export default editMessageSlice.reducer;