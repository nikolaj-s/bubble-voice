import { createSlice } from "@reduxjs/toolkit";


const RoomActionOverlaySlice = createSlice({
    name: "RoomActionOverlaySlice",
    initialState: {
        widgetOverlayQueue: [],
    },
    reducers: {
        addNewWidgetOverlayToQueue: (state, action) => {

            state.widgetOverlayQueue.push(action.payload);

        },
        clearWidgetOverLay: (state, action) => {

            state.widgetOverlayQueue = [];

        },
        removeWidgetActionFromQueue: (state, action) => {

            if (state.widgetOverlayQueue.length > 0) {

                state.widgetOverlayQueue.shift();

            }

        }
    }
})

// selectors

export const selectOverlayQueue = state => state.RoomActionOverlaySlice.widgetOverlayQueue;

// setters / actions

export const { clearWidgetOverLay, removeWidgetActionFromQueue, addNewWidgetOverlayToQueue } = RoomActionOverlaySlice.actions;

export default RoomActionOverlaySlice.reducer;