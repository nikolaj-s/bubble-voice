import { createSlice } from "@reduxjs/toolkit";
import { createChannel } from "./Thunks/createChannel";
import { createCategory } from "./Thunks/createCategory";

const channelsSlice = createSlice({
    name: "channelsSlice",
    initialState: {
        channels: [],
        categories: [],
        currentChannel: null,
        loading: false,
        status: "loading",
        error: false
    },
    reducers: {
        addCategory: (state, action) => {
            const existingCategory = state.categories.find(category => category.category_id === action.payload.category_id);
            if (!existingCategory) {
                state.categories.push(action.payload);
            }
        },
        setCategories: (state, action) => {
            state.categories = Array.isArray(action.payload) ? action.payload : [];
        },
        addChannel: (state, action) => {
            const existingChannel = state.channels.find(channel => channel.channel_id === action.payload.channel_id);
            if (!existingChannel) {
                state.channels.push(action.payload);
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
        reOrderCategories: (state, action) => {
            const sortOrder = action.payload.newOrder;

            state.categories = state.categories.sort((a, b) => {
                return sortOrder.indexOf(a.category_id) - sortOrder.indexOf(b.category_id);
            })
            
        },
        reOrderChannels: (state, action) => {
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
        },
        clearCurrentChannel: (state,action) => {
            state.currentChannel = null;
        },
        setChannelsStatus: (state, action) => {
            state.status = action.payload;
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
        builder.addCase(createCategory.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(createCategory.fulfilled, (state) => {
            state.error = false;
            state.loading = false;
        })
    }
})

export const {
    reOrderCategories, 
    reOrderChannels, 
    setCategories, 
    addCategory, 
    addChannel, 
    setChannels, 
    setCurrentChannel, 
    clearCurrentChannel, 
    userLeavesChannel, 
    userJoinsChannel,
    updateChannelDetails,
    setChannelsStatus
} = channelsSlice.actions;

export default channelsSlice.reducer;