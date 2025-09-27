import { createSlice } from "@reduxjs/toolkit";
import { createChannel } from "./Thunks/createChannel";

const channelsSlice = createSlice({
    name: "channelsSlice",
    initialState: {
        channels: {},
        currentChannel: null,
        loading: false,
        status: "loading",
        error: false,
        draggingChannel: false,
        draggingCategory: false,
        draggingUser: false
    },
    reducers: {
        addChannel: (state, action) => {
            state.channels[action.payload.channel_id] = action.payload;
        },
        updateCategoryofChannels: (state, action) => {

            for (const [key, value] of Object.entries(state.channels)) {

                if (value.category === action.payload.category_id) {
                    state.channels[key].category = 'channels';
                }

            }

        },
        updateChannelDetails: (state, action) => {
            if (action.payload.channel_id) {
                
                state.channels[action.payload.channel_id] = {...state.channels[action.payload.channel_id], ...action.payload};

            }
        },
        reorderChannels: (state, action) => {
            const sortOrder = action.payload.newOrder;

            for (const [index, value] of sortOrder.entries()) {
                state.channels[value].sort_order = index;
            }

            state.channels[action.payload.channel_id].category = action.payload.category;

        },
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        userJoinsChannel: (state, action) => {

            state.channels[action.payload.channel_id].users = action.payload.users;

        },
        userLeavesChannel: (state, action) => {

            state.channels[action.payload.channel_id].users = state.channels[action.payload.channel_id].users.filter(user => user !== action.payload.user_id)

            if (state.channels[action.payload.channel_id].users.length === 0) {
                state.channels[action.payload.channel_id].status = null;
            }

        },
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        },
        clearCurrentChannel: (state,action) => {
            state.currentChannel = null;
        },
        setChannelsStatus: (state, action) => {
            state.status = action.payload;
        },
        removeChannel: (state, action) => {
            delete state.channels[action.payload._id];
        },
        updateChannelStatus: (state, action) => {
            if (action.payload.channel_id) {
                state.channels[action.payload.channel_id].status = action.payload.status;
            }
           
        },
        updateLatestMessageAt: (state, action) => {
            if (state.channels[action.payload.channel_id]) {
                state.channels[action.payload.channel_id].latest_message_at = action.payload.latest_message_at;
            }
        },
        toggleDraggingState: (state, action) => {
            state[action.payload.state] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createChannel.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createChannel.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
        })
        
    }
})

export const {
    reorderChannels, 
    addChannel, 
    setChannels, 
    setCurrentChannel, 
    clearCurrentChannel, 
    userLeavesChannel, 
    userJoinsChannel,
    updateChannelDetails,
    setChannelsStatus,
    updateCategoryofChannels,
    removeChannel,
    updateChannelStatus,
    updateLatestMessageAt,
    toggleDraggingState
} = channelsSlice.actions;

export default channelsSlice.reducer;