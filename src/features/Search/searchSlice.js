import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        loading: false,
        results: [],
        error: false,
        filter: "all",
        filters: ["all", "servers", "social", "images", "videos"],
        open: false
    },
    reducers: {
        toggleOpenSearch: (state, action) => {
            state.open = action.payload;
        }
    },
    extraReducers: {

    }
})

export const selectSearchFilters = state => state.searchSlice.filters;

export const selectCurrentSearchFilter = state => state.searchSlice.filter;

export const selectSearchOpen = state => state.searchSlice.open;

export const {toggleOpenSearch} = searchSlice.actions;

export default searchSlice.reducer;