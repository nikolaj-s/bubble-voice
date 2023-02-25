import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { fetchMusicWidgetVolume, setMusicWidgetVolume } from "../../util/LocalData";

import { addPinnedMessage, removePinnedMessage, setPinnedMessages } from "./ChannelRoom/ServerDashBoard/ServerDashBoardSlice";

import { socket } from "./ServerBar/ServerBar";

export const unBanMember = createAsyncThunk(
    'serverSlice/unBanMember',
    async (id, {rejectWithValue}) => {
        try {

            const data = await socket.request('un ban', {ban_id: id})
            .then(res => {
                return id;
            })
            .catch(error => {
                return rejectWithValue({errorMessage: error});
            })

            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({errorMessage: error.message});
        }
    }
)

export const sendDeleteMessageRequest = createAsyncThunk(
    'serverSlice/sendDeleteMessageRequest',
    async ({channel_id, message_id}, {rejectWithValue, dispatch}) => {
        try {
            
            const data = await socket.request('delete message', {channel_id: channel_id, message_id: message_id})
            .then(result => {
                
                dispatch(removePinnedMessage({message: {_id: result.message_id}}))
                
                return result;
            })
            .catch(error => {
                console.log(error)
                return rejectWithValue({errorMessage: error});
            })

            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message})
        }
    }
)

export const togglePinMessage = createAsyncThunk(
    'serverSlice/togglePinMessage',
    async (data, {rejectWithValue, dispatch}) => {
        try {

            if (!data._id) return rejectWithValue({errorMessage: "Invalid Message"});

            const pin = await socket.request('toggle pinned message', data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return rejectWithValue({errorMessage: err.errorMessage})
            })

            if (pin.message.pinned) {
                
                dispatch(addPinnedMessage(pin))
            
            } else {
                
                dispatch(removePinnedMessage(pin))
            
            }

            return pin;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message});
        }
    }
)

export const checkConnection = createAsyncThunk(
    'serverSlice/checkConnection',
    async (_, {rejectWithValue}) => {
        try {

            const start = Date.now();
           
            const ping = await socket.request('check connection')
            .then(res => {
                return Date.now() - start;
            }).catch(error => {
                return rejectWithValue({error: true})
            })

            return ping;

        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchServerDetails = createAsyncThunk(
    'serverSlice/fetchServerDetails',
    async (_, {rejectWithValue, getState, dispatch}) => {
        if (socket === null) return rejectWithValue({error: true, errorMessage: "connection error"});

        const { server_id } = getState().serverSlice;

        const { currentStatus } = getState().UserStatusSlice;
        
        const { username, user_image, user_banner, display_name } = getState().accountSettingsSlice;
        
        const server = await socket.request('joined server', {server_id: server_id, status: currentStatus})
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
            console.log(error)
            return rejectWithValue({error: true, errorMessage: error});
        })

        dispatch(setPinnedMessages(server.pinned));

        return server;
    }
)

export const createChannel = createAsyncThunk(
    'serverSlice/createChannel',
    async ({channel_name, persist_social, locked_channel, auth_users, text_only}, {rejectWithValue, getState}) => {
        const { server_id } = getState().serverSlice;

        if (!channel_name || channel_name.length < 3) return rejectWithValue({error: true, errorMessage: "Invalid Channel Name"});

        if (channel_name.length > 128) return rejectWithValue({error: true, errorMessage: 'Channel name cannot be longer than 128 characters'});

        const data = {
            channel_name: channel_name,
            persist_social: persist_social,
            locked_channel: locked_channel,
            auth_users: auth_users,
            server_id: server_id,
            text_only: text_only
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

            
            let res = await socket.request("left server")
            .then(res => {
                return res;
            })
            .catch(error => {
                return rejectWithValue(error.errorMessage);
            })
            
            socket?.disconnect();

            return res;
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
        serverOwner: "",
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
        inactiveChannel: {_id: "", label: "No Inactive Channel"},
        // current channel
        current_channel_id: null,
        loadingChannel: false,
        // editing current channel id
        editing_channel_id: null,
        // member
        user: {},
        banList: [],
        ban_loading_state: false,
        // server error
        error: false,
        errorMessage: "",
        // settings
        serverSettingsOpen: false,
        // local push to talk state
        pushToTalkActive: false,
        pushToTalkTimeOut: null,
        //social
        selectedChannelSocial: "", 
        searchedImages: [],
        // joining channel status
        joiningChannel: false,
        reconnecting: false,
        // ping
        ping: 0,
        pinningMessage: false,
        // hide notice
        hideSetDefaultServer: false,
        // popular searches
        popular_searches: [],
        create_channel_menu_open: false

    },
    reducers: {
        clearSearchData: (state, action) => {
            state.popular_searches = [];
        },
        toggleCreateChannelMenu: (state, action) => {
            state.create_channel_menu_open = action.payload;
        },
        deleteMessage: (state, action) => {

            if (!action.payload.message_id && !action.payload.channel_id) return;

            const index = state.channels.findIndex(c => c._id === action.payload.channel_id);

            if (index === -1) return;

            state.channels[index].social = state.channels[index].social.filter(m => m._id !== action.payload.message_id);

        },
        reOrderChannels: (state, action) => {

            const sortOrder = action.payload;

            state.channels.sort((a, b) => {
                return sortOrder.indexOf(a._id) - sortOrder.indexOf(b._id);
            })

        },
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

            state.channels[currentChannelIndex].users = state.channels[currentChannelIndex].users.filter(user => user.username !== action.payload.username)
            
            state.channels[currentChannelIndex].active = false;

            state.current_channel_id = null;

        },
        userJoinsServer: (state, action) => {

            const userIndex = state.members.findIndex(user => user.username === action.payload.username);

            const user = {...action.payload, status: 'online'}

            if (userIndex === -1) {
                state.members.push(user)
            } else {
                state.members = state.members.map(member => {
                    if (member.username === action.payload.username) {
                        return {
                            ...user
                        }
                    } else {
                        return member;
                    }
                })
            }
            
        },
        updateMemberActiveStatus: (state, action) => {
            const index = state.members.findIndex(u => u._id === action.payload.user_id);

            if (index === -1) return;

            state.members[index].status = action.payload.status;
        },
        userLeavesServer: (state, action) => {
            const userIndex = state.members.findIndex(user => user._id === action.payload);
            
            if (userIndex === -1) return;

            state.members[userIndex].status = 'offline';
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

            if (channelIndex === -1) return;

            if (state.channels[channelIndex].auth === false) return console.log('No Auth');

            // verify if message with existing id exists to prevent dupe messages being posted from an issue with duplicate socket instances failing to clean up
            const index = state.channels[channelIndex].social.findIndex(m => m._id === action.payload._id);

            if (index !== -1) return;

            const message = action.payload;

            state.channels[channelIndex].social.unshift(message);
            
        },
        updateMessage: (state, action) => {
            const channel_index = state.channels.findIndex(channel => channel._id === action.payload.channel_id);

            const memberIndex = state.members.findIndex(member => member.username === action.payload.username);

            const message_index = state.channels[channel_index].social.findIndex(msg => msg.content.local_id === action.payload.content.local_id);

            if (channel_index === -1) return;

            if (message_index === -1) return;

            const message = action.payload;

            state.channels[channel_index].social[message_index]._id = message._id;

            state.channels[channel_index].social[message_index].content = {...message.content, ...{display_name: state.members[memberIndex].display_name}}
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

                    let auth = action.payload.auth_users.findIndex(i => i === state.user._id) !== -1;

                    return {...action.payload, users: channel.users, social: action.payload.social, widgets: action.payload.widgets, auth: auth}
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
        updateJoiningChannelState: (state, action) => {
            state.joiningChannel = action.payload;
        },
        setChannelSocialId: (state, action) => {
            state.selectedChannelSocial = action.payload;
        },
        clearServerPing: (state, action) => {
            state.ping = 0;
        },
        socketToggleMessagePin: (state, action) => {

            const c_index = state.channels.findIndex(action.payload.channel_id);

            if (c_index === -1) return;

            const m_index = state.channels[c_index].social.findIndex(m => m._id === action.payload._id);

            if (m_index === -1) return;

            state.channels[c_index].social[m_index].pinned = action.payload.pinned;
        },
        toggleMembersWebCamState: (state, action) => {
            if (state.current_channel_id) {

                const c_index = state.channels.findIndex(c => c._id === state.current_channel_id);

                if (c_index === -1) return;

                const m_index = state.channels[c_index].users.findIndex(m => m._id === action.payload.id);

                if (m_index === -1) return;

                state.channels[c_index].users[m_index].disabled_web_cam_state = action.payload.value;

            }
        },
        toggleHideDefaultServerNotice: (state, action) => {
            state.hideSetDefaultServer = action.payload;
        },
        userBanned: (state, action) => {
            state.members = state.members.filter(m => m.username !== action.payload.username);

            state.banList.push(action.payload);

        },
        saveSongToWidget: (state, action) => {

            const c_index = state.channels.findIndex(c => c._id === action.payload.channel_id);

            if (c_index === -1) return;

            const w_index = state.channels[c_index].widgets.findIndex(w => w.type === 'music');

            if (w_index === -1) return;

            state.channels[c_index].widgets[w_index].content.liked_songs.push(action.payload.song);

        },
        removeSongFromWidget: (state, action) => {

            const c_index = state.channels.findIndex(c => c._id === action.payload.channel_id);

            if (c_index === -1) return;

            const w_index = state.channels[c_index].widgets.findIndex(w => w.type === 'music');

            if (w_index === -1) return;

            state.channels[c_index].widgets[w_index].content.liked_songs = state.channels[c_index].widgets[w_index].content.liked_songs.filter(s => s._id !== action.payload.song._id)

        },
        updateInactiveChannel: (state, action) => {
            const c_index = state.channels.findIndex(c => c._id === action.payload);

            if (c_index === -1) return;

            state.inactiveChannel = {id: action.payload, label: state.channels[c_index].channel_name};
        },
        updateMemberFile: (state, action) => {

            state.members = state.members.map(m => {
                if (m._id === action.payload._id) {
                    return {...action.payload, status: m.status}
                } else {
                    return m;
                }
            })

            const c_index = state.channels.findIndex(c => {
                const u_index = c.users.findIndex(u => u._id === action.payload._id);

                if (u_index !== -1) {
                    return true;
                } else {
                    return false;
                }
            
            })

            if (c_index !== -1) {
                state.channels[c_index].users = state.channels[c_index].users.map(u => {
                    if (u._id === action.payload._id) {
                        return {...action.payload, active: u.active, microphone: u.microphone, muted: u.muted, webcam: u.webcam, screenshare: u.screenshare};
                    } else {
                        return u;
                    }
                })
            }

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
            state.serverOwner = action.payload.server_owner;
            state.banList = action.payload.ban_list;
            state.user = action.payload.user;
            state.popular_searches = action.payload.recent_searches;

            const memberIndex = state.members.findIndex(member => member.username === action.payload.username);

            if (memberIndex !== -1) {
                state.members[memberIndex].user_image = action.payload.user_image;
                state.members[memberIndex].user_banner = action.payload.user_banner;
                state.members[memberIndex].display_name = action.payload.display_name;
                state.user = state.members[memberIndex];
            }

            state.channels = action.payload.channels;

            const c_index = action.payload.channels.findIndex(c => c._id === action.payload.inactive_channel);
          
            state.inactiveChannel = {id: action.payload.inactive_channel, label: state.channels[c_index]?.channel_name ? state.channels[c_index]?.channel_name : "No Inactive Channel"};
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

            state.create_channel_menu_open = false;
            
            state.channels.push(action.payload.channel)
        },
        [createChannel.rejected]: (state, action) => {
            state.channelCreationLoading = false;
            state.errorMessage = action.payload.errorMessage;
            state.error = true;
        },
        [fetchPersistedMusicVolume.fulfilled]: (state, action) => {
            state.musicVolume = action.payload.volume;
        },
        [handleLeavingServer.fulfilled]: (state, action) => {
            console.log('left server')
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
            console.log('error')
            state.error = true;

            state.errorMessage = action.payload;

        },
        [checkConnection.fulfilled]: (state, action) => {
            state.ping = action.payload;
        },
        [togglePinMessage.pending]: (state, action) => {
            state.pinningMessage = true;
        },
        [togglePinMessage.rejected]: (state, action) => {
            state.error = true;

            state.errorMessage = action.payload.errorMessage;

            state.pinningMessage = false;
        },
        [togglePinMessage.fulfilled]: (state, action) => {
            try {
                state.pinningMessage = false;

                state.error = false;

                state.errorMessage = "";

                const c_index = state.channels.findIndex(c => c._id === action.payload.message.channel_id);

                if (c_index === -1) return;

                const m_index = state.channels[c_index].social.findIndex(m => m._id === action.payload.message._id);

                if (m_index === -1) return;

                state.channels[c_index].social[m_index].pinned = action.payload.message.pinned;
            } catch (error) {
                state.error = true;
                state.pinningMessage = false;
                state.errorMessage = "Error Pinning Message"
            }
        },
        [sendDeleteMessageRequest.pending]: (state, action) => {
            state.pinningMessage = true;
        },
        [sendDeleteMessageRequest.fulfilled]: (state, action) => {
            state.pinningMessage = false;

            if (!action.payload.message_id && !action.payload.channel_id) return;

            const index = state.channels.findIndex(c => c._id === action.payload.channel_id);

            if (index === -1) return;

            state.channels[index].social = state.channels[index].social.filter(m => m._id !== action.payload.message_id);

        },
        [sendDeleteMessageRequest.rejected]: (state, action) => {
            state.pinningMessage = false;
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
        },
        [unBanMember.pending]: (state, action) => {
            state.ban_loading_state = true;
        },
        [unBanMember.rejected]: (state, action) => {
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
            state.ban_loading_state = false;
        },
        [unBanMember.fulfilled]: (state, action) => {
            state.error = false;
            state.errorMessage = false;
            state.ban_loading_state = false;

            state.banList = state.banList.filter(ban => ban._id !== action.payload)
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

export const selectInactiveChannels = state => {
    let arr = [{id: "", label: "No Inactive Channel"}];

    for (const c of state.serverSlice.channels) {
        if (c.disable_streams) {
            arr.push({id: c._id, label: c.channel_name});
        }
    }

    return arr;
}

export const selectPushToTalkActive = state => state.serverSlice.pushToTalkActive;

export const selectEditingChannelId = state => state.serverSlice.editing_channel_id;

export const selectChannelToEdit = state => {
    const index = state.serverSlice.channels.findIndex(channel => channel._id === state.serverSlice.editing_channel_id);

    return index === -1 ? index : state.serverSlice.channels[index];
}

export const selectServerErrorState = state => state.serverSlice.error;

export const selectServerErrorMessage = state => state.serverSlice.errorMessage;

export const selectJoiningChannelState = state => state.serverSlice.joiningChannel;

export const selectTopAnimationPoint = state => state.serverSlice.top_pos;

export const selectServerPing = state => state.serverSlice.ping;

export const selectPinningMessage = state => state.serverSlice.pinningMessage;

export const selectHideDefaultNotce = state => state.serverSlice.hideSetDefaultServer;

export const selectPopularSearches = state => state.serverSlice.popular_searches;

export const selectCreateChannelMenuState = state => state.serverSlice.create_channel_menu_open;

export const selectBanList = state => state.serverSlice.banList;

export const selectBanLoadingState = state => state.serverSlice.ban_loading_state;

export const selectMusicSavedState = state => {
    const index = state.serverSlice.channels.findIndex(c => c._id === state.serverSlice.current_channel_id);

    if (index === -1) return [];

    const w_index = state.serverSlice.channels[index].widgets.findIndex(w => w.type === 'music');

    if (w_index === -1) return [];

    return state.serverSlice.channels[index].widgets[w_index].content.liked_songs;
    
}

export const selectInactiveChannel = state => state.serverSlice.inactiveChannel; 

export const selectServerOwner = state => state.serverSlice.serverOwner;

// actions

export const {updateMemberFile, clearSearchData, updateInactiveChannel, removeSongFromWidget, saveSongToWidget, userBanned, toggleCreateChannelMenu, toggleHideDefaultServerNotice, toggleMembersWebCamState, socketToggleMessagePin, updateMemberActiveStatus, clearServerPing, userLeavesServer, deleteMessage, reOrderChannels, toggleReconnectingState, setChannelSocialId, setTopPos, updateJoiningChannelState, clearServerState, updateChannelWidgets, updateMusicVolume, throwMusicError, updateMusicState, skipSong, addSongToQueue, toggleMusicPlaying, deleteChannel, updateChannel, markWidgetForDeletion, addWidgetToChannel, assignNewServerGroup, updateServerGroups, updateServerBanner, closeServerErrorMessage, setEditingChannelId, toggleServerPushToTalkState, updateMessage, newMessage, updateMemberStatus, toggleServerSettingsOpenState, toggleLoadingChannel, setServerName, setServerId, addNewChannel, throwServerError, joinChannel, leaveChannel, userJoinsServer, userLeavesChannel, userJoinsChannel, updateMember } = serverSlice.actions;

export default serverSlice.reducer;
