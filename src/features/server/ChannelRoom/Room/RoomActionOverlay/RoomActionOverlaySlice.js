import { createSlice } from "@reduxjs/toolkit";


const RoomActionOverlaySlice = createSlice({
    name: "RoomActionOverlaySlice",
    initialState: {
        wheelSpinWidget: false,
        wheelSpinWidgetDegree: 0,
        selectedWidgetId: "",
        overlayMessage: "",
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

export const selectWheelSpinWidgetActive = state => state.RoomActionOverlaySlice.wheelSpinWidget;

export const selectWheelSpinWidgetDegree = state => state.RoomActionOverlaySlice.wheelSpinWidgetDegree;

export const selectWidgetOverlayId = state => state.RoomActionOverlaySlice.selectedWidgetId;

export const selectOverlayMessage = state => state.RoomActionOverlaySlice.overlayMessage;

export const selectOverlayQueue = state => state.RoomActionOverlaySlice.widgetOverlayQueue;

// setters / actions

export const { clearWidgetOverLay, removeWidgetActionFromQueue, addNewWidgetOverlayToQueue } = RoomActionOverlaySlice.actions;

export default RoomActionOverlaySlice.reducer;