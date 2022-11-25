import { createSlice } from "@reduxjs/toolkit";

const ServerDashBoardSlice = createSlice({
    name: "ServerDashBoardSlice",
    initialState: {
        pins: []
    },
    reducers: {
        removePinnedMessage: (state, action) => {
            console.log(action.payload.message._id)
            state.pins = state.pins.filter(p => p._id !== action.payload.message._id);
        },
        setPinnedMessages: (state, action) => {
            state.pins = action.payload;
        },
        addPinnedMessage: (state, action) => {

            state.pins.unshift(action.payload.message);
        
        }
    }
})

// selectors
export const selectPinnedMessages = state => state.ServerDashBoardSlice.pins;

export const { setPinnedMessages, removePinnedMessage, addPinnedMessage  } = ServerDashBoardSlice.actions;

export default ServerDashBoardSlice.reducer;