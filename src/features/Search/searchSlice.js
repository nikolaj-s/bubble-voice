import { createSlice } from "@reduxjs/toolkit";
import { GlobalSearch } from "./Thunks/GlobalSearch";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        loading: false,
        results: {},
        error: false,
        filter: "servers",
        filters: ["servers", "social", "images", "videos"],
        open: false,
        query: ""
    },
    reducers: {
        toggleOpenSearch: (state, action) => {
            state.open = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(GlobalSearch.pending, (state) => {
            state.loading = true;
            state.error = false
        })
        .addCase(GlobalSearch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(GlobalSearch.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.results[action.payload.filter] = action.payload.results;
        })
    }
})

export const {toggleOpenSearch, setFilter, setQuery} = searchSlice.actions;

export default searchSlice.reducer;