import { createSlice } from "@reduxjs/toolkit";
import { getPatchNotes } from "./Thunks/getPatchNotes";
import { getCurrentVersion } from "./Thunks/getCurrentVersion";


const patchNotesSlice = createSlice({
    name: "patchNotesSlice",
    initialState: {
        loading: false,
        error: false,
        patchNotes: [],
        pages: 1,
        currentVersion: null
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

        // get current app version
        builder.addCase(getCurrentVersion.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getCurrentVersion.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getCurrentVersion.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentVersion = action.payload.version;
        })
    }
})

export default patchNotesSlice.reducer;