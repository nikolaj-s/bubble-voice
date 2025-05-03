import { createSlice } from "@reduxjs/toolkit";
import { createChannel } from "./Thunks/createChannel";

const channelsSlice = createSlice({
    name: "channelsSlice",
    initialState: {
        channels: [],
        currentChannel: null,
        loading: false,
        status: "loading",
        error: false
    },
    reducers: {
        addChannel: (state, action) => {
            const existingChannel = state.channels.find(channel => channel.channel_id === action.payload.channel_id);
            if (!existingChannel) {
                state.channels.push(action.payload);
            }
        },
        updateCategoryofChannels: (state, action) => {

            if (action.payload.category_id) {
                state.channels = state.channels.map(channel => {
                    if (channel.category === action.payload.category_id) {
                        return {...channel, category: 'channels'}
                    } else {
                        return channel
                    }
                })
            }

        },
        updateChannelDetails: (state, action) => {
            console.log(action.payload)
            if (action.payload.channel_id) {
                
                state.channels = state.channels.map(channel => {
                    if (channel.channel_id === action.payload.channel_id) {
                        return {...channel, ...action.payload}
                    } else {
                        return channel;
                    }
                })

            }
        },
        reorderChannels: (state, action) => {
            const sortOrder = action.payload.newOrder;

            state.channels = state.channels.sort((a, b) => {
                return sortOrder.indexOf(a.channel_id) - sortOrder.indexOf(b.channel_id);
            })

            const index = state.channels.findIndex(c => c.channel_id === action.payload.channel_id);

            if (index !== -1) {
                state.channels[index].category = action.payload.category;
            }
        },
        setChannels: (state, action) => {
            state.channels = Array.isArray(action.payload) ? action.payload : [];
        },
        userJoinsChannel: (state, action) => {

            state.channels = state.channels.map(channel => {

                if (channel.channel_id === action.payload.channel_id) {
                    let users = action.payload.users;
                    
                    return {...channel, users: users}
                } else {
                    return channel;
                }

            })

            if (state.currentChannel) {

                if (state.currentChannel.channel_id === action.payload.channel_id) {

                    state.currentChannel.users = action.payload.users;
                }

            }

        },
        userLeavesChannel: (state, action) => {

            state.channels = state.channels.map(channel => {
                if (channel.channel_id === action.payload.channel_id) {

                    return {
                        ...channel,
                        users: channel.users ? channel.users.filter(user => user !== action.payload.user_id) : []
                    }

                } else {

                    return channel;
               
                }
            })

            if (state.currentChannel) {
                if (state.currentChannel.channel_id === action.payload.channel_id) {

                    let users = state.currentChannel.users || [];

                    users = users.filter(user => user !== action.payload.user_id);

                    state.currentChannel.users = users;
                }
            }

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
            if (action.payload._id) {
                state.channels = state.channels.filter(channel => channel._id !== action.payload._id);
            }
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