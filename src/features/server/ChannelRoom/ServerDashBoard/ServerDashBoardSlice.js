import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../ServerBar/ServerBar";
import { throwServerError } from "../../ServerSlice";

export const FetchPins = createAsyncThunk(
    'FetchPins/ServerDashBoardSlice',
    async (_, {rejectWithValue, dispatch, getState}) => {
        try {

            const { pins } = getState().ServerDashBoardSlice;
            console.log('fetching pins')
            const data = await socket.request('fetch pins', {count: pins.length + 15})
            .then(res => {
                return res;
            })
            .catch(error => {
                return rejectWithValue({error: true, errorMessage: error.errorMessage})
            })
            console.log(data)
            return data.pins;

        } catch (error) {
            console.log(error);
            return rejectWithValue({errorMessage: error.message})
        }
    }
)

export const FetchActivityFeed = createAsyncThunk(
    'FetchActivityFeed/ServerDashboardSlice',
    async (_, {rejectWithValue}) => {
        try {

            const data = await socket.request('fetch activity feed').then(res =>{
                return res;
            })
            .catch(err => {
                return rejectWithValue({error: true, errorMessage: err.message});
            })

            return data.activity_feed;

        } catch (err) {
            return rejectWithValue({error: true, errorMessage: err.message});
        }
    }
)

export const FetchScreenShots = createAsyncThunk(
    'FetchScreenShots/ServerDashBoardSlice',
    async (_, {rejectWithValue, dispatch}) => {
        try {

            const data = await socket.request('fetch screen shots', {count: 20})
            .then(res => {
                return res;
            })
            .catch(err => {
                return rejectWithValue({error: true, errorMessage: err.errorMessage})
            })
            console.log(data)
            return data.screen_shots;

        } catch (error) {
            rejectWithValue({error: true});
            dispatch(throwServerError({error: true, errorMessage: "Error Fetching Screen Shots"}));
            return;
        }
    }
)

const ServerDashBoardSlice = createSlice({
    name: "ServerDashBoardSlice",
    initialState: {
        pins: [],
        screenShots: [],
        activityFeed: [],
        loadingPins: true,
        loadingScreenShots: true,
        error: false,
        errorMessage: "",
        loadingActivityFeed: true,
        hideImageOfTheDay: false,
        hideActivityFeed: true,
        pinnedSubReddits: [],
        loadedSubreddits: {}
    },
    reducers: {
        setLoadedSubReddit: (state, action) => {
            state.loadedSubreddits[action.payload.subreddit] = action.payload.posts;
        },
        setPinnedSubReddits: (state, action) => {
            state.pinnedSubReddits = action.payload;
        },
        toggleHideImageOfTheDay: (state, action) => {
            state.hideImageOfTheDay = !state.hideImageOfTheDay;
        },
        toggleHideActivityFeed: (state, action) => {
            state.hideActivityFeed = !state.hideActivityFeed;
        },
        removePinnedMessage: (state, action) => {
           
            state.pins = state.pins.filter(p => p._id !== action.payload.message._id);
        },
        setPinnedMessages: (state, action) => {
            state.pins = action.payload;
        },
        addPinnedMessage: (state, action) => {

            state.pins.unshift(action.payload.message);
    
        },
        addActivityMessage: (state, action) => {
            if (state.loadingActivityFeed) return;

            state.activityFeed.unshift(action.payload);
        },
        setActivityFeed: (state, action) => {

            if (state.loadingActivityFeed) return;

            state.activityFeed = action.payload;
        }
    },
    extraReducers: {
        [FetchPins.pending]: (state, action) => {
            state.loadingPins = true;
        },
        [FetchPins.fulfilled]: (state, action) => {
            state.loadingPins = false;

            state.pins = action.payload;
        },
        [FetchPins.rejected]: (state, action) => {
            state.loadingPins = false;

            state.error = true;

            state.errorMessage = action.payload.errorMessage;
        },
        [FetchScreenShots.pending]: (state, action) => {
            state.loadingScreenShots = true;
        },
        [FetchScreenShots.fulfilled]: (state, action) => {
            state.loadingScreenShots = false;
            
            state.screenShots = action.payload;
        },
        [FetchScreenShots.rejected]: (state, action) => {
            state.loadingScreenShots = false;

            state.error = true;

            state.errorMessage = 'Error Fetching Screen Shots';
        },
        [FetchActivityFeed.pending]: (state, action) => {
            state.loadingActivityFeed = true;
            state.error = false;
            state.errorMessage = "";
        },
        [FetchActivityFeed.fulfilled]: (state, action) => {
            state.loadingActivityFeed = false;
            state.activityFeed = action.payload;
            state.error = false;
        },
        [FetchActivityFeed.rejected]: (state, action) => {
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
        }
    }
})

// selectors
export const selectPinnedMessages = state => state.ServerDashBoardSlice.pins;

export const selectLoadingPins = state => state.ServerDashBoardSlice.loadingPins;

export const selectScreenShots = state => state.ServerDashBoardSlice.screenShots;

export const selectLoadingScreenShots = state => state.ServerDashBoardSlice.loadingScreenShots;

export const selectHideImageOfTheDay = state => state.ServerDashBoardSlice.hideImageOfTheDay;

export const selectHideActivityFeed = state => state.ServerDashBoardSlice.hideActivityFeed;

export const selectActivityFeed = state => state.ServerDashBoardSlice.activityFeed;

export const selectLoadingActivityFeed = state => state.ServerDashBoardSlice.loadingActivityFeed;

export const selectPinnedSubreddits = state => state.ServerDashBoardSlice.pinnedSubReddits;

export const selectLoadedSubreddits = state => state.ServerDashBoardSlice.loadedSubreddits;

export const {setLoadedSubReddit, setPinnedSubReddits, setActivityFeed, addActivityMessage, toggleHideActivityFeed, toggleHideImageOfTheDay, setPinnedMessages, removePinnedMessage, addPinnedMessage  } = ServerDashBoardSlice.actions;

export default ServerDashBoardSlice.reducer;