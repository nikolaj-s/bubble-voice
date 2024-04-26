import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import Axios from 'axios';

export const GetPostsFromSubReddit = createAsyncThunk(
    'ServerMediaSlice/GetPostsFromSubReddit',
    async ({subreddit, sort}, {rejectWithValue, getState}) => {

        try {

            const {after} = getState().ServerMediaSlice;

            const data = await Axios.get(`http://www.reddit.com${subreddit}${sort}/.json${after && sort === 'top' ? '?after=' + after + '&t=all' : !after && sort === 'top' ? '?t=all' : after ? '?after=' + after : ''}`)
            .then(data => {
                
                return {posts: data.data.data.children.map(c => {return {...c.data}}), after: data.data.data.after};
            })
            .catch(err => {
                return rejectWithValue({error: true, errorMessage: err.message})
            });
            
            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message})
        }
    }
)

export const SubRedditSearch = createAsyncThunk(
    'ServerMediaSlice/SubRedditSearch',
    async ({query}, {rejectWithValue}) => {
        try {

            const data = await Axios.get(`https://www.reddit.com/subreddits/search.json?q=${query}&include_over_18=on&limit=9`)
            .then(data => {

                return data.data.data.children.map(c => {return {...c.data}});
            
            })
            .catch(err => err);
    
            return data;
    
        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error})
        }
    }
)

const ServerMediaSlice = createSlice({
    name: 'ServerMediaSlice',
    initialState: {
        serverMediaPage: 'recommendations',
        subReddits: [],
        redditPosts: [],
        selectedSubReddit: {},
        subRedditQuery: "",
        loading: false,
        error: false,
        errorMessage: "",
        sort: 'new',
        after: '',
        scrollPosition: 0,
        media: [],
        mediaQuery: "",
        loadingNewMedia: false,
        fullMode: false,
        index: 0,
        videos: []
    },
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        toggleLoadingRedditMedia: (state, action) => {
            state.loading = action.payload;
        },
        setServerMediaPage: (state, action) => {
            state.serverMediaPage = action.payload;
        },
        setSubRedditQuery: (state, action) => {
            state.subRedditQuery = action.payload;
        },
        setSubReddit: (state, action) => {
            state.after = '';
            state.redditPosts = [];
            state.selectedSubReddit = action.payload;
        },
        toggleSortSubPosts: (state, action) => {
            state.sort = action.payload;
        },
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload;
        },
        setMediaQuery: (state, action) => {
            state.mediaQuery = action.payload;
        },
        setNewMedia: (state, action) => {
            state.mediaQuery = "";
            state.media = action.payload;
        },
        addMoreMedia: (state, action) => {
            state.media = [...state.media, ...action.payload];
        },
        toggleLoadingNewMedia: (state, action) => {
            state.loadingNewMedia = action.payload;
        },
        clearMedia: (state, action) => {
            state.media = [];

            state.subReddits = [];

            state.redditPosts = [];

            state.scrollPosition = 0;
        },
        setRedditIndex: (state, action) => {
            state.index = action.payload;
        },
        toggleFullMode: (state, action) => {
            state.fullMode = !state.fullMode;
        },
    },
    extraReducers: {
        [GetPostsFromSubReddit.pending]: (state, action) => {
            state.loading = true;
        },
        [GetPostsFromSubReddit.fulfilled]: (state, action) => {
            state.redditPosts = [...state.redditPosts, ...action.payload.posts];
            state.after = action.payload.after;
            state.loading = false;

            if (state.fullMode && state.index > 0) {
                state.index = state.index + 1;
            }
        },
        [GetPostsFromSubReddit.rejected]: (state, action) => {
            state.loading = false;
        },
        [SubRedditSearch.pending]: (state, action) => {
            state.loading = true;
        },
        [SubRedditSearch.fulfilled]: (state, action) => {
            state.loading = false;
            state.subReddits = action.payload;
        },
        [SubRedditSearch.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})

export const selectServerMediaPage = state => state.ServerMediaSlice.serverMediaPage;

export const selectSubRedditPosts = state => state.ServerMediaSlice.redditPosts;

export const selectSubReddits = state => state.ServerMediaSlice.subReddits;

export const selectLoadingSubReddit = state => state.ServerMediaSlice.loading;

export const selectSubRedditQuery = state => state.ServerMediaSlice.subRedditQuery;

export const selectCurrentSubReddit = state => state.ServerMediaSlice.selectedSubReddit;

export const selectSubRedditSortState = state => state.ServerMediaSlice.sort;

export const selectNextPostPage = state => state.ServerMediaSlice.after;

export const selectScrollServerMediaScrollPosition = state => state.ServerMediaSlice.scrollPosition;

export const selectMediaQuery = state => state.ServerMediaSlice.mediaQuery;

export const selectMedia = state => state.ServerMediaSlice.media;

export const selectLoadingNewMedia = state => state.ServerMediaSlice.loadingNewMedia;

export const selectCurrentRedditIndex = state => state.ServerMediaSlice.index;

export const selectFullModeState = state => state.ServerMediaSlice.fullMode;

export const selectVideoResults = state => state.ServerMediaSlice.videos;

export const { setVideos, setRedditIndex, toggleFullMode, clearMedia, toggleLoadingNewMedia, addMoreMedia, setNewMedia, setMediaQuery, setScrollPosition, setSubRedditQuery, toggleSortSubPosts, setSubReddit, toggleLoadingRedditMedia, setServerMediaPage} = ServerMediaSlice.actions;

export default ServerMediaSlice.reducer;