import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMusicWidgetVolume, setMusicWidgetVolume } from "../../util/LocalData";

import { socket } from "./ServerBar/ServerBar";

export const fetchServerDetails = createAsyncThunk(
    'serverSlice/fetchServerDetails',
    async (_, {rejectWithValue, getState}) => {
        if (socket === null) return rejectWithValue({error: true, errorMessage: "connection error"});

        const { server_id } = getState().serverSlice;

        const { username, user_image, user_banner, display_name } = getState().accountSettingsSlice;
        
        const server = await socket.request('joined server', {server_id: server_id})
        .then(response => {
            if (response.success) {

                return {...response.server, username: username, user_image: user_image, user_banner: user_banner, display_name: display_name}
            
            } else if (response.error) {
                return rejectWithValue({error: true, errorMessage: response.errorMessage})
            } else {
                return rejectWithValue({error: true, errorMessage: "unexpected error has occurred"});
            }
        })
        .catch(error => {
            return rejectWithValue({error: true, errorMessage: "unexpected error has occurred"});
        })

        return server;
    }
)

export const createChannel = createAsyncThunk(
    'serverSlice/createChannel',
    async ({channel_name, persist_social}, {rejectWithValue, getState}) => {
        const { server_id } = getState().serverSlice;

        const data = {
            channel_name: channel_name,
            persist_social: persist_social,
            server_id: server_id
        }

        const channel = await socket.request('create channel', data).then(response => {
            return {success: true, channel: {...response, users: [], active: false}}
        })
        .catch(error => {
            return rejectWithValue({error: true, errorMessage: error});
        })
        
        return channel;
    }
)

export const fetchPersistedMusicVolume = createAsyncThunk(
    'serverSlice/fetchPersistedMusicVolume',
    async (_) => {

        const  volume = await fetchMusicWidgetVolume();

        return volume;

    }
)

export const handleLeavingServer = createAsyncThunk(
    'serverSlice/handleLeavingServer',
    async (_, { rejectWithValue }) => {
        try {
            await socket.request("left server")
            .then(res => {
                return res;
            })
            .catch(error => {
                return rejectWithValue(error.errorMessage);
            })
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.errorMessage);
        }
    }
)

const serverSlice = createSlice({
    name: "serverSlice",
    initialState: {
        server_id: "",
        loading: true,
        serverName: "",
        serverBanner: "",
        top_pos: 0,
        channels: [],
        serverGroups: [],
        server: {},
        members: [],
        // creating channel state
        channelCreationLoading: false,
        channelCreationError: false,
        channelCreationErrorMessage: "",
        newChannel: {},
        // current channel
        current_channel_id: null,
        loadingChannel: false,
        // editing current channel id
        editing_channel_id: null,
        // member
        user: {},
        // server error
        error: false,
        errorMessage: "",
        // settings
        serverSettingsOpen: false,
        // local push to talk state
        pushToTalkActive: false,
        //social
        selectedChannelSocial: "", 
        // music
        musicQueue: [],
        musicPlaying: false,
        musicError: false,
        musicErrorMessage: "",
        musicVolume: 1,
        // joining channel status
        joiningChannel: false,
        reconnecting: false
    },
    reducers: {
        toggleReconnectingState: (state, action) => {
            state.reconnecting = !state.reconnecting;
        },
        setTopPos: (state, action) => {
            state.top_pos = action.payload;
        },
        setServerName: (state, action) => {
            state.serverName = action.payload;
        },
        updateServerBanner: (state, action) => {
            state.serverBanner = action.payload;
        },
        setServerId: (state, action) => {
            state.server_id = action.payload;
        },
        addNewChannel: (state, action) => {
            const channel = action.payload;
            channel["users"] = [];
            channel["widgets"] = [];
            channel["active"] = false;
            state.channels.push(channel);
        },
        clearServerState: (state, action) => {
            // state.server_id = "";
            state.loading = true;
            state.channels = [];
            state.serverGroups = [];
            state.server = {};
            state.members = [];
            state.current_channel_id = null;
            state.editing_channel_id = null;
            state.joiningChannel = false;
            state.selectedChannelSocial = "";
        },
        setUserImages: (state, action) => {
            const userIndex = state.members.findIndex(member => member.user_name === action.payload.username)
            
            if (userIndex === -1) return;
        },
        throwServerError: (state, action) => {
            
            state.error = true;

            state.errorMessage = action.payload.errorMessage;
            
        },
        closeServerErrorMessage: (state, action) => {
            state.error = false;
            state.errorMessage = "";
        },
        userJoinsChannel: (state, action) => {

            const userIndex = state.members.findIndex(member => member.username === action.payload.username);
            
            state.members[userIndex].user_image = action.payload.user_image;

            state.members[userIndex].user_banner = action.payload.user_banner;

            state.members[userIndex].display_name = action.payload.display_name;
            console.log(action.payload)
            const channelIndex = state.channels.findIndex(channel => channel._id === action.payload.channel._id);

            // prevent duplicating ---> check if user exists in channel

            const existing = state.channels[channelIndex].users.findIndex(user => user.username === action.payload.username);

            if (existing !== -1) return;

            state.channels[channelIndex].users.push(state.members[userIndex]);
        },
        userLeavesChannel: (state, action) => {
            const channelIndex = state.channels.findIndex(channel => channel._id === action.payload.id);

            state.channels[channelIndex].users = state.channels[channelIndex].users.filter(user => user.username !== action.payload.username)
        },
        joinChannel: (state, action) => {

            if (state.current_channel_id === action.payload.channel._id) return;

            const userIndex = state.members.findIndex(member => member.username === action.payload.username);
            
            const channelIndex = state.channels.findIndex(channel => channel._id === action.payload.channel._id);

            if (state.current_channel_id) {

                const currentChannelIndex = state.channels.findIndex(channel => channel._id === state.current_channel_id);

                state.channels[currentChannelIndex].users = state.channels[currentChannelIndex].users.filter(user => user.username !== action.payload.username);
                
                state.channels[currentChannelIndex].active = false;
            
            }

            state.channels[channelIndex].users.push(state.members[userIndex]);

            state.channels[channelIndex].active = true;

            state.current_channel_id = action.payload.channel._id;

            const url = window.location.hash.split('#')[1]

            if (window.location.hash.includes('/channel')) {

                window.location.hash = url.split('/channel/')[0] + '/channel/' + action.payload.channel._id;
            
            } else {
                window.location.hash = `${url}/channel/${action.payload.channel._id}`;
            }

        },
        leaveChannel: (state, action) => {
            if (state.current_channel_id === null) return;

            const currentChannelIndex = state.channels.findIndex(channel => channel._id === state.current_channel_id);

            state.channels[currentChannelIndex].users = state.channels[currentChannelIndex].users.filter(user => user.username !== action.payload.username);
            
            state.channels[currentChannelIndex].active = false;

            state.current_channel_id = null;

        },
        userJoinsServer: (state, action) => {

            const userIndex = state.members.findIndex(user => user.username === action.payload.username);

            if (userIndex === -1) {
                state.members.push(action.payload)
            } else {
                state.members = state.members.map(member => {
                    if (member.username === action.payload.username) {
                        return {
                            ...action.payload
                        }
                    } else {
                        return member;
                    }
                })
            }
            
        },
        updateMember: (state, action) => {
            const memberIndex = state.members.findIndex(member => member.username === action.payload.username);

            if (memberIndex === -1) return;

            state.members[memberIndex].display_name = action.payload.display_name;

            state.members[memberIndex].user_image = action.payload.user_image;

            state.members[memberIndex].user_banner = action.payload.user_banner;

        },
        toggleLoadingChannel: (state, action) => {
            state.loadingChannel = action.payload;
        },
        toggleServerSettingsOpenState: (state, action) => {
            state.serverSettingsOpen = action.payload;
        },
        updateMemberStatus: (state, action) => {

            if (!action.payload.action) return;

            for (let i = 0; i < state.channels.length; i++) {
                const userIndex = state.channels[i].users.findIndex(user => user.username === action.payload.username);

                if (userIndex !== -1) {
                    state.channels[i].users[userIndex] = {...state.channels[i].users[userIndex], ...action.payload.action}
                    break
                } 

                
            }
        },
        newMessage: (state, action) => {

            const channelIndex = state.channels.findIndex(channel => channel._id === action.payload.channel_id)

            state.channels[channelIndex].social.unshift(action.payload);
            
        },
        updateMessage: (state, action) => {
            const channel_index = state.channels.findIndex(channel => channel._id === action.payload.channel_id);

            const memberIndex = state.members.findIndex(member => member.username === action.payload.username);

            const message_index = state.channels[channel_index].social.findIndex(msg => msg.content.local_id === action.payload.content.local_id);

            state.channels[channel_index].social[message_index].content = {...action.payload.content, ...{display_name: state.members[memberIndex].display_name}}
        },
        toggleServerPushToTalkState: (state, action) => {
            state.pushToTalkActive = action.payload;
        },
        setEditingChannelId: (state, action) => {
            state.editing_channel_id = action.payload;
        },
        updateServerGroups: (state, action) => {
            state.serverGroups = action.payload;

            state.members = state.members.map(member => {
                return {...member, server_group: action.payload.findIndex(el => el._id === member.server_group) === -1 ? action.payload[0]._id : member.server_group}
            })
        },
        assignNewServerGroup: (state, action) => {
            const index = state.members.findIndex(member => member.username === action.payload.username);

            if (index === -1) {
                state.error = true;
                state.errorMessage = "Validation Error"
                return;
            }

            state.members[index].server_group = action.payload.server_group;
        },
        addWidgetToChannel: (state, action) => {
            
            const index = state.channels.findIndex(channel => channel._id === action.payload.channel_id);

            state.channels[index].widgets.push(action.payload.widget);
        
        },
        updateChannelWidgets: (state, action) => {

            const channel_id = state.channels.findIndex(channel => channel._id === action.payload.channel_id);

            if (channel_id !== -1) {
                state.channels[channel_id].widgets = action.payload.widgets;
            }

        },
        markWidgetForDeletion: (state, action) => {

            const c_index = state.channels.findIndex(channel => channel._id === state.editing_channel_id);
            
            if (c_index === -1) return;

            state.channels[c_index].widgets = state.channels[c_index].widgets.map(widget => {
                if (widget._id === action.payload.widget) {
                    return {...widget, delete: true};
                } else {
                    return widget;
                }
            })
        },
        updateChannel: (state, action) => {
            
            state.channels = state.channels.map(channel => {
                if (channel._id === action.payload._id) {
                    return {...action.payload, users: channel.users, social: channel.social, widgets: action.payload.widgets}
                } else {
                    return channel;
                }
            })

        },
        deleteChannel: (state, action) => {

            state.channels = state.channels.filter(channel => channel._id !== action.payload);

            if (action.payload === state.current_channel_id) {
                state.current_channel_id = null;
            }
        },
        toggleMusicPlaying: (state, action) => {
            state.musicPlaying = action.payload;
        },
        addSongToQueue: (state, action) => {
            state.musicQueue.push(action.payload);

            if (state.musicQueue.length === 0 && state.musicPlaying) {
                state.musicPlaying = true;
            }
        },
        skipSong: (state, action) => {
            state.musicQueue.shift();

            if (state.musicQueue.length === 0 && state.musicPlaying) {
                state.musicPlaying = false;
            }
        },
        updateMusicState: (state, action) => {
            state.musicQueue = action.payload.queue;
            state.musicPlaying = action.payload.playing;
        },
        throwMusicError: (state, action) => {
            state.musicError = action.payload.error;
            state.musicErrorMessage = action.payload.errorMessage;
        },
        updateMusicVolume: (state, action) => {
            state.musicVolume = action.payload;

            setMusicWidgetVolume(action.payload);
        },
        updateJoiningChannelState: (state, action) => {
            state.joiningChannel = action.payload;
        },
        setChannelSocialId: (state, action) => {
            state.selectedChannelSocial = action.payload;
        }
    },
    extraReducers: {
        [fetchServerDetails.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchServerDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.serverName = action.payload.server_name;
            state.serverBanner = action.payload.server_banner;
            state.members = action.payload.members;
            state.serverGroups = action.payload.server_groups;
            const memberIndex = state.members.findIndex(member => member.username === action.payload.username);

            if (memberIndex !== -1) {
                state.members[memberIndex].user_image = action.payload.user_image;
                state.members[memberIndex].user_banner = action.payload.user_banner;
                state.members[memberIndex].display_name = action.payload.display_name;
                state.user = state.members[memberIndex];
            }

            state.channels = action.payload.channels;
        },
        [fetchServerDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
        },
        [createChannel.pending]: (state, action) => {
            state.channelCreationLoading = true;
        },
        [createChannel.fulfilled]: (state, action) => {
            
            state.channelCreationLoading = false;

            window.location.hash = window.location.hash.split('/create-channel-menu')[0].split('#')[1];
          
            state.channels.push(action.payload.channel)
        },
        [createChannel.rejected]: (state, action) => {
            state.channelCreationLoading = false;
            state.errorMessage = action.payload.errorMessage;
            state.error = true;
            window.location.hash = window.location.hash.split('/create-channel-menu')[0]
        },
        [fetchPersistedMusicVolume.fulfilled]: (state, action) => {
            state.musicVolume = action.payload.volume;
        },
        [handleLeavingServer.fulfilled]: (state, action) => {

            state.current_channel_id = null;
            state.server_id = null;
            state.loading = true;
            state.serverName = "";
            state.serverBanner = "";
            state.channels = [];
            state.serverGroups = [];
            state.server = {};
            state.members = [];
            state.current_channel_id = null;
            state.editing_channel_id = null;
            state.joiningChannel = false;

        },
        [handleLeavingServer.rejected]: (state, action) => {

            state.error = true;

            state.errorMessage = action.payload;

        }
    }   
})

// selectors
export const selectReconnectingState = state => state.serverSlice.reconnecting;

export const selectServerUser = state => state.serverSlice.user;

export const selectCurrentChannelId = state => state.serverSlice.current_channel_id;

export const selectServerName = state => state.serverSlice.serverName;

export const selectServerBanner = state => state.serverSlice.serverBanner;

export const selectServerChannels = state => state.serverSlice.channels;

export const selectServer = state => state.serverSlice.server;

export const selectLoadingServerDetailsState = state => state.serverSlice.loading;

export const selectServerId = state => state.serverSlice.server_id;

export const selectCurrentChannel = state => {
    const index = state.serverSlice.channels.findIndex(channel => channel._id === state.serverSlice.current_channel_id);
    if (index === -1) return {error: true, errorMessage: "channel not found"}

    return state.serverSlice.channels[index];
}

export const selectCurrentlyViewChannelSocial = state => {
    const index = state.serverSlice.channels.findIndex(channel => channel._id === state.serverSlice.selectedChannelSocial);

    if (index === -1) return {error: true, errorMessage: "channel not found"}

    return state.serverSlice.channels[index];
}

export const selectChannelSocialId = state => state.serverSlice.selectedChannelSocial;

export const selectLoadingChannel = state => state.serverSlice.loadingChannel;

export const selectServerSettingsOpenState = state => state.serverSlice.serverSettingsOpen;

export const selectServerGroups = state => state.serverSlice.serverGroups;

export const selectServerMembers = state => state.serverSlice.members;

export const selectUsersPermissions = state => {

    const m_index = state.serverSlice.members.findIndex(member => member.username === state.serverSlice.user.username);
    
    const index = state.serverSlice.serverGroups.findIndex(group => group._id === state.serverSlice.members[m_index].server_group);
    
    if (index === -1) {
        return;
    }

    return state.serverSlice.serverGroups[index];
}

export const selectChannelSocial = state => {
    const index = state.serverSlice.channels.findIndex(channel => channel._id === state.serverSlice.current_channel_id)

    if (index === -1) {
        return []
    } else {
        return state.serverSlice.channels[index].social;
    }
}

export const selectPushToTalkActive = state => state.serverSlice.pushToTalkActive;

export const selectEditingChannelId = state => state.serverSlice.editing_channel_id;

export const selectChannelToEdit = state => {
    const index = state.serverSlice.channels.findIndex(channel => channel._id === state.serverSlice.editing_channel_id);

    return index === -1 ? index : state.serverSlice.channels[index];
}

export const selectServerErrorState = state => state.serverSlice.error;

export const selectServerErrorMessage = state => state.serverSlice.errorMessage;

export const selectMusicPlayingState = state => state.serverSlice.musicPlaying;

export const selectMusicQueue = state => state.serverSlice.musicQueue;

export const selectMusicError = state => state.serverSlice.musicError;

export const selectMusicErrorMessage = state => state.serverSlice.musicErrorMessage;

export const selectMusicVolume = state => state.serverSlice.musicVolume;

export const selectJoiningChannelState = state => state.serverSlice.joiningChannel;

export const selectTopAnimationPoint = state => state.serverSlice.top_pos;

// actions

export const {toggleReconnectingState, setChannelSocialId, setTopPos, updateJoiningChannelState, clearServerState, updateChannelWidgets, updateMusicVolume, throwMusicError, updateMusicState, skipSong, addSongToQueue, toggleMusicPlaying, deleteChannel, updateChannel, markWidgetForDeletion, addWidgetToChannel, assignNewServerGroup, updateServerGroups, updateServerBanner, closeServerErrorMessage, setEditingChannelId, toggleServerPushToTalkState, updateMessage, newMessage, updateMemberStatus, toggleServerSettingsOpenState, toggleLoadingChannel, setServerName, setServerId, addNewChannel, throwServerError, joinChannel, leaveChannel, userJoinsServer, userLeavesChannel, userJoinsChannel, updateMember } = serverSlice.actions;

export default serverSlice.reducer;
