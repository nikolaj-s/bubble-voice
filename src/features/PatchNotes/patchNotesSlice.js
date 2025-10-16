import { createSlice } from "@reduxjs/toolkit";
import { getPatchNotes } from "./Thunks/getPatchNotes";


const patchNotesSlice = createSlice({
    name: "patchNotesSlice",
    initialState: {
        loading: false,
        error: false,
        patchNotes: [],
        pages: 1
    },
    extraReducers: (builder) => {
        builder.addCase(getPatchNotes.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getPatchNotes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getPatchNotes.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.patchNotes = action.payload.notes;
            state.pages = action.payload.pageCount;
        })
    }
})

export default patchNotesSlice.reducer;