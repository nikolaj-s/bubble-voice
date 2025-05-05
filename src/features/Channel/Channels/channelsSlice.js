import { createSlice } from "@reduxjs/toolkit";
import { createChannel } from "./Thunks/createChannel";

const channelsSlice = createSlice({
    name: "channelsSlice",
    initialState: {
        channels: {},
        currentChannel: null,
        loading: false,
        status: "loading",
        error: false
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
            console.log(action.payload)
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
console.log(action.payload);
            state.channels[action.payload.channel_id].users = action.payload.users;

        },
        userLeavesChannel: (state, action) => {

            state.channels[action.payload.channel_id].users = state.channels[action.payload.channel_id].users.filter(user => user !== action.payload.user_id)

        },
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
            console.log(action.payload)
        },
        clearCurrentChannel: (state,action) => {
            state.currentChannel = null;
        },
        setChannelsStatus: (state, action) => {
            state.status = action.payload;
        },
        removeChannel: (state, action) => {
            delete state.channels[action.payload._id];
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
    removeChannel
} = channelsSlice.actions;

export default channelsSlice.reducer;