import { createSlice } from "@reduxjs/toolkit";
import { getMoments } from "./Thunks/getMoments";
import { createMoment } from "./Thunks/createMoment";
import { deleteMoment } from "./Thunks/deleteMoment";

const momentsSlice = createSlice({
    name: "momentsSlice",
        initialState: {
        loading: false,
        error: false,
        isSelecting: false,
        selectedMessages: {},
        moments: [],
        noMoreMoments: false,
        lastChannel: null,
        lastQuery: ''
    },
    reducers: {
        addMessageToMoment: (state, action) => {
            if (Object.values(state.selectedMessages).length >= 10) return;
            state.selectedMessages[action.payload._id] = action.payload;
        },
        removeMessageFromMoment: (state, action) => {
            delete state.selectedMessages[typeof action.payload === 'string' ? action.payload : action.payload._id]
        },
        setIsSelecting: (state, action) => {
            state.isSelecting = action.payload;

            state.selectedMessages = {};
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
        .addCase(getMoments.fulfilled, (state, { payload, meta }) => {
            state.loading      = false;
            state.error        = false;
            const { moments: pageData, noMoreItems, channel_id, query, page } = payload;

            // if channel or query changed, always reset on page 1
            const chanChanged  = channel_id !== state.lastChannel;
            const queryChanged = query     !== state.lastQuery;

            if (page === 1 || chanChanged || queryChanged) {
                state.moments = pageData;
            } else {
                state.moments = state.moments.concat(pageData);
            }

            state.noMoreMoments = noMoreItems;
            state.lastChannel   = channel_id;
            state.lastQuery     = query;
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

        // delete moment
        builder.addCase(deleteMoment.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteMoment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteMoment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            if (action.payload._id) {
                state.moments = state.moments.filter(moment => moment._id !== action.payload._id)

            }
            
        })
    }
})

export const {addMessageToMoment, removeMessageFromMoment, setIsSelecting} = momentsSlice.actions;

export default momentsSlice.reducer;