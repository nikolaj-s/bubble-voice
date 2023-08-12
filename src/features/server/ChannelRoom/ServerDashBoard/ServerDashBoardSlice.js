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
        loadingPins: true,
        loadingScreenShots: true,
        error: false,
        errorMessage: ""
    },
    reducers: {
        removePinnedMessage: (state, action) => {
           
            state.pins = state.pins.filter(p => p._id !== action.payload.message._id);
        },
        setPinnedMessages: (state, action) => {
            state.pins = action.payload;
        },
        addPinnedMessage: (state, action) => {

            state.pins.unshift(action.payload.message);
        
        },
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
        }
    }
})

// selectors
export const selectPinnedMessages = state => state.ServerDashBoardSlice.pins;

export const selectLoadingPins = state => state.ServerDashBoardSlice.loadingPins;

export const selectScreenShots = state => state.ServerDashBoardSlice.screenShots;

export const selectLoadingScreenShots = state => state.ServerDashBoardSlice.loadingScreenShots;

export const { setPinnedMessages, removePinnedMessage, addPinnedMessage  } = ServerDashBoardSlice.actions;

export default ServerDashBoardSlice.reducer;