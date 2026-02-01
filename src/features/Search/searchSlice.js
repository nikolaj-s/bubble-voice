import { createSlice } from "@reduxjs/toolkit";
import { globalSearch } from "./Thunks/globalSearch";
import { fetchSearchHistory } from "./Thunks/fetchSearchHistory";
import { deleteSearchHistoryItem } from "./Thunks/deleteSearchHistoryItem";
import { getFormattedDate } from "../../lib/services/helperFunctions";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        loading: false,
        results: {},
        error: false,
        filter: {label: "Bubbles", path: "servers"},
        filters: [{label: "Bubbles", path: "servers"}, {label: "Images", path: "images"}, {label: "Videos", path: "videos"}, {label: "Text Channels", path: "text-channel"}, {label: "Users", path: 'users'}],
        searchHistory: [],
        similarImageSrc: false,
        open: false,
        query: "",
        prevSearch: "",
        scrollPos: 0,
        loadingSearchHistory: false,
        searchHistoryFetched: false,
        // text channel search params
        isPinned: false,
        hasImage: false,
        hasVideo: false,
        hasLink: false,
        fromDate: false,
        selectedChannel: {channel_name: "All", channel_id: "*"}
    },
    reducers: {
        setPrevSearch: (state, action) => {
            state.prevSearch = action.payload;
        },
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
        },
        setFromDate: (state, action) => {
            state.fromDate = action.payload;
        },
        setTextChannelFilter: (state, action) => {
            for (const [key,value] of Object.entries(action.payload)) {
                state[key] = value;
            }
        },
        setSelectedChannelToFilter: (state, action) => {
            state.selectedChannel = action.payload;
        },
        removeMessageFromSearchResults: (state, action) => {
            const messageId = action.payload;

            if (state.results['text-channel']) {
                state.results['text-channel'] =
                state.results['text-channel'].filter(m => m._id !== messageId);
            }
        },
        clearSearchHistory: (state, action) => {
            state.searchHistory = [];
        }

    },
    extraReducers: (builder) => {
        // search
        builder
        .addCase(globalSearch.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.prevSearch = state.query;
        })
        .addCase(globalSearch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(globalSearch.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;

            let results = [];

            if (action.payload.filter === 'text-channel') {
                
                results = action.payload.results.map(m => {
                    return {...m, ...getFormattedDate(m.date)}
                })

            } else {
                results = action.payload.results;
            }

            if (action.payload.isFiltered) state.error = 'Some results were filtered out due to Safe Search being enabled.'

            state.results[action.payload.filter] = results;
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

export const {
    toggleOpenSearch, 
    setFilter, 
    setQuery, 
    setSearchResultsScrollPos, 
    setSimilarImageSrc,
    setTextChannelFilter,
    setSelectedChannelToFilter,
    setFromDate,
    setPrevSearch,
    removeMessageFromSearchResults,
    clearSearchHistory
} = searchSlice.actions;

export default searchSlice.reducer;