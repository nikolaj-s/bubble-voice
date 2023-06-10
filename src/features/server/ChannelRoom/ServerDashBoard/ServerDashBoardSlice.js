import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../ServerBar/ServerBar";

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

const ServerDashBoardSlice = createSlice({
    name: "ServerDashBoardSlice",
    initialState: {
        pins: [],
        loadingPins: true,
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
        }
    }
})

// selectors
export const selectPinnedMessages = state => state.ServerDashBoardSlice.pins;

export const selectLoadingPins = state => state.ServerDashBoardSlice.loadingPins;

export const { setPinnedMessages, removePinnedMessage, addPinnedMessage  } = ServerDashBoardSlice.actions;

export default ServerDashBoardSlice.reducer;