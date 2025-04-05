import { createSlice } from "@reduxjs/toolkit";
import { globalSearch } from "./Thunks/globalSearch";
import { fetchSearchHistory } from "./Thunks/fetchSearchHistory";
import { deleteSearchHistoryItem } from "./Thunks/deleteSearchHistoryItem";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        loading: false,
        results: {},
        error: false,
        filter: {label: "Bubbles", path: "servers"},
        filters: [{label: "Bubbles", path: "servers"}, {label: "Images", path: "images"}, {label: "Text Channels", path: "social"}],
        searchHistory: [],
        similarImageSrc: false,
        open: false,
        query: "",
        scrollPos: 0,
        loadingSearchHistory: false,
        searchHistoryFetched: false
    },
    reducers: {
        toggleOpenSearch: (state, action) => {
            state.open = action.payload;
        },
        setFilter: (state, action) => {

            state.error = false;

            const filter = state.filters.find(f => f.path === action.payload.path);

            if (filter) {
                state.filter = filter;
            }
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setSearchResultsScrollPos: (state,action) => {
            state.scrollPos = action.payload;
        },
        setSimilarImageSrc: (state, action) => {
            state.similarImageSrc = action.payload;
        }
    },
    extraReducers: (builder) => {
        // search
        builder
        .addCase(globalSearch.pending, (state) => {
            state.loading = true;
            state.error = false
        })
        .addCase(globalSearch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(globalSearch.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.results[action.payload.filter] = action.payload.results;
        })

        // search history
        builder.addCase(fetchSearchHistory.pending, (state) => {
            state.error = false;
            state.loadingSearchHistory = true;
            state.searchHistoryFetched = true;
        })
        builder.addCase(fetchSearchHistory.rejected, (state, action) => {
            state.error = action.payload;
            state.loadingSearchHistory = false;
        })
        builder.addCase(fetchSearchHistory.fulfilled, (state, action) => {
            state.error = false;
            state.loadingSearchHistory = false;
            state.searchHistory = action.payload;
        })

        // delete search history item
        builder.addCase(deleteSearchHistoryItem.pending, (state, action) => {
            const query = action.meta.arg.query;
            state.searchHistory = state.searchHistory.filter(item => item.query !== query);
        })
        builder.addCase(deleteSearchHistoryItem.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})

export const {toggleOpenSearch, setFilter, setQuery, setSearchResultsScrollPos, setSimilarImageSrc} = searchSlice.actions;

export default searchSlice.reducer;