import { createSlice } from "@reduxjs/toolkit";
import { getMoments } from "./Thunks/getMoments";
import { createMoment } from "./Thunks/createMoment";

const momentsSlice = createSlice({
    name: "momentsSlice",
    initialState: {
        loading: false,
        error: false,
        isSelecting: false,
        selectedMessages: {},
        selectedMoment: null,
        selectedChannel: null,
        moments: [],
        noMoreMoments: false
    },
    reducers: {
        addMessageToMoment: (state, action) => {
            state.selectedMessages[action.payload._id] = action.payload;
        },
        removeMessageFromMoment: (state, action) => {
            delete state.selectedMessages[typeof action.payload === 'string' ? action.payload : action.payload._id]
        },
        setIsSelecting: (state, action) => {
            state.isSelecting = action.payload;

            state.selectedMessages = {};
        },
        setSelectedMoment: (state, action) => {
            state.selectedMoment = action.payload;
        }
    },
    extraReducers: (builder) => {
        // fetch moments 
        builder.addCase(getMoments.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getMoments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getMoments.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            if (action.payload.channel_id !== state.selectedChannel) {
                state.selectedChannel = action.payload.channel_id;
                state.moments = [];
            }
            state.moments = action.payload.moments;
            state.noMoreMoments = action.payload.noMoreMoments;
        })

        // create moment
        builder.addCase(createMoment.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(createMoment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createMoment.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;
            state.isSelecting = false;
            state.selectedMessages = {};
            state.moments.unshift(action.payload);
        })
    }
})

export const {addMessageToMoment, removeMessageFromMoment, setIsSelecting, setSelectedMoment} = momentsSlice.actions;

export default momentsSlice.reducer;