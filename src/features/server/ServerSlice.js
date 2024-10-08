import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { fetchMusicWidgetVolume } from "../../util/LocalData";

import { socket } from "./ServerBar/ServerBar";
import { addActivityMessage, setActivityFeed, SetMediaOfTheDay, setPinnedSubReddits } from "./ChannelRoom/ServerDashBoard/ServerDashBoardSlice";
import { setVideos } from "./ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice";

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

export const navigateToServer = createAsyncThunk(
    'serverSlice/navigateToServer',
    async ({server_to_join_id}, {rejectWithValue, getState, dispatch}) => {
        try {

            const { server_id } = getState().serverSlice;

            if (window.location.hash.includes('channel')) {
                document.getElementById('disconnect-from-channel-button').click();
            }

            if (server_id) {
                await socket.request("left server")
                .then(res => {
                    return res;
                })
                .catch(error => {
                    return rejectWithValue({error: error.errorMessage});
                })
            }

            return server_to_join_id;
        
        } catch (error) {
            rejectWithValue({error: "Fatal Error Joining Server"});
        }
    }
)

export const fetchServerDetails = createAsyncThunk(
    'serverSlice/fetchServerDetails',
    async ({channel_id}, {rejectWithValue, getState, dispatch}) => {
        if (socket === null) return rejectWithValue({error: true, errorMessage: "connection error"});

        const { server_id } = getState().serverSlice;
        
        if (!server_id) return;

        dispatch(setActivityFeed([]));

        const { currentStatus } = getState().UserStatusSlice;
        
        const { username, user_image, user_banner, display_name } = getState().accountSettingsSlice;
        
        const server = await socket.request('joined server', {server_id: server_id, status: currentStatus})
        .then(response => {
            if (response.success) {

                return {...response.server, username: username, user_image: user_image, user_banner: user_banner, display_name: display_name, channel_id: channel_id}
            
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

        dispatch(SetMediaOfTheDay({media: server.image_of_the_day}));

        dispatch(setPinnedSubReddits(server?.pinned_sub_reddits));

        if (server?.recent_videos) {
            dispatch(setVideos(server?.recent_videos));
        }

        return server;
    }
)

export const createCategory = createAsyncThunk(
    'serverSlice/createCategory',
    async ({category_name}, {rejectWithValue}) => {

        if (category_name.length < 1) return rejectWithValue({errorMessage: "Invalid Category Name"});

        const data = {
            category_name: category_name
        }

        const category = await socket.request('create category', data)
        .then(res => {
            return res;
        })
        .catch(err => {
            return {error: true, errorMessage: err.message}
        })

        if (category.error) return rejectWithValue({error: true, errorMessage: category.errorMessage});

        return category;

    }
)

export const deleteCategory = createAsyncThunk(
    'serverSlice/deleteCategory',
    async ({category_id}, {rejectWithValue}) => {

        if (!category_id) return rejectWithValue({error: true, errorMessage: "An Error Has Occured"});

        const data = {
            category_id: category_id
        }

        const category = await socket.request('delete category', data)
        .then(res => {
            return res;
        })
        .catch(err => {
            return {error: true, errorMessage: err.message}
        })

        if (category.error) return rejectWithValue({error: true, errorMessage: category.errorMessage});

        return category;
    }
)

export const createChannel = createAsyncThunk(
    'serverSlice/createChannel',
    async ({channel_name, persist_social, locked_channel, auth_users, text_only, type, mediaState}, {rejectWithValue, getState, dispatch}) => {
        const { server_id } = getState().serverSlice;

        if (!channel_name || channel_name.length < 3) return rejectWithValue({error: true, errorMessage: "Invalid Channel Name"});

        if (channel_name.length > 128) return rejectWithValue({error: true, errorMessage: 'Channel name cannot be longer than 128 characters'});

        const data = {
            channel_name: channel_name,
            persist_social: persist_social,
            locked_channel: locked_channel,
            auth_users: auth_users,
            server_id: server_id,
            text_only: text_only,
            type: type,
            media_state: mediaState
        }

        const channel = await socket.request('create channel', data).then(response => {
            if (response.status_msg) {
                dispatch(addActivityMessage(response.status_msg))
            }
            return {success: true, channel: {...response.channel, users: [], active: false}}
        })
        .catch(error => {
            return rejectWithValue({error: true, errorMessage: error});
        })
        
        return channel;
    }
)

export const moveUser = createAsyncThunk(
    'serverSlice',
    async ({username, channel_id, arg}, {rejectWithValue}) => {

        const data = await socket.request('move user', {channel_id: channel_id, username: username, to_move: arg})
        .catch(error => {
      
            return {error: true, errorMessage: error};
        })

        if (data.error) return rejectWithValue({error: true, errorMessage: data.errorMessage});

        return;

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
            
         //   socket?.disconnect();

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
        imageOfTheDay: {},
        activityFeed: [],
        serverBannerAmbiance: '',
        welcomeMessage: "",
        bannedKeywords: [],
        mediaChannels: [],
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
        triggerRoomRescale: false,
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
        create_channel_menu_open: false,
        connection_lost: false,
        roomColor: "",
        kicked: false,
        kickedMessage: "",
        categories: [],
        deletingCategory: false,
        disableSafeSearch: false

    },
    reducers: {
        handleDisableSafeSearch: (state, action) => {
            state.disableSafeSearch = action.payload;
        },
        updateUserChannelStatus: (state, action) => {

            const user_index = state.members.findIndex(u => u.username === action.payload.user);
            console.log(action.payload)
            if (user_index !== -1) {
                state.members[user_index].channel_status = action.payload.channel;
            }

        },
        setWelcomeMessage: (state, action) => {

            if (action.payload.length > 128) return;

            state.welcomeMessage = action.payload;
        },
        updateBannedKeywords: (state, action) => {
            state.bannedKeywords = action.payload;
        },
        setKickedState: (state, action) => {
            state.kicked = action.payload.kicked;
            state.kickedMessage = action.payload.kickedMessage;
        },
        triggerRoomRescale: (state, action) => {
            state.triggerRoomRescale = !state.triggerRoomRescale;
        },
        setRoomColor: (state, action) => {
            state.roomColor = action.payload;
        },
        toggleConnectionLostState: (state, action) => {
            state.connection_lost = action.payload;
        },
        setServerbannerAmbiance: (state, action) => {
            state.serverBannerAmbiance = action.payload;
        },
        clearSearchData: (state, action) => {
            state.popular_searches = [];
            state.imageOfTheDay = {};
        },
        toggleCreateChannelMenu: (state, action) => {
            state.create_channel_menu_open = action.payload;
        },
        deleteMessage: (state, action) => {
            console.log(action.payload)
            if (!action.payload.message_id && !action.payload.channel_id) return;
            
            const index = state.channels.findIndex(c => c._id === action.payload.channel_id);

            if (index === -1) return;

            state.channels[index].social = state.channels[index].social.filter(m => m._id !== action.payload.message_id);

        },
        reOrderChannels: (state, action) => {

            const sortOrder = action.payload.new_order;

            state.channels = state.channels.sort((a, b) => {
                return sortOrder.indexOf(a._id) - sortOrder.indexOf(b._id);
            })

            const index = state.channels.findIndex(c => c._id === action.payload.channel_id);

            if (index !== -1) {
                state.channels[index].category = action.payload.category;
            }

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

            channel["auth"] = channel.locked_channel ? channel.auth_users.findIndex(id => id === state.user._id) !== -1 : true;

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
            state.activityFeed = [];
            state.imageOfTheDay = {};

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

            for (let i = 0; i < state.channels.length; i++) {
                state.channels[i].users = state.channels[i].users.filter(user => user.username !== action.payload.username);
            }

            const existing = state.channels[channelIndex].users.findIndex(user => user.username === action.payload.username);

            if (existing !== -1) return;

            state.channels[channelIndex].users.push(state.members[userIndex]);
        },
        userLeavesChannel: (state, action) => {
            const channelIndex = state.channels.findIndex(channel => channel._id === action.payload.id);

            state.channels[channelIndex].users = state.channels[channelIndex].users.filter(user => user.username !== action.payload.username)

            if (state.channels[channelIndex].users.length === 0) {
                state.channels[channelIndex].status = false;
            }
        },
        joinChannel: (state, action) => {

            if (state.current_channel_id === action.payload.channel._id) return;

            const userIndex = state.members.findIndex(member => member.username === action.payload.username);
            
            const channelIndex = state.channels.findIndex(channel => channel._id === action.payload.channel._id);

            // clear all channels
            for (let i = 0; i < state.channels.length; i++) {
                state.channels[i].users = state.channels[i].users.filter(user => user.username !== action.payload.username);
                
                state.channels[i].active = false;
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

            if (state.channels[currentChannelIndex].users.length === 0) {
                state.channels[currentChannelIndex].status = false;
            }

            state.current_channel_id = null;

        },
        userJoinsServer: (state, action) => {

            const userIndex = state.members.findIndex(user => user.username === action.payload.username);

            const user = {...action.payload}

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

            state.members[index].status_icon = action.payload.icon;
        },
        userLeavesServer: (state, action) => {
            const userIndex = state.members.findIndex(user => user._id === action.payload.member_id);
            
            if (userIndex === -1) return;

            state.members[userIndex].status = 'offline';

            state.members[userIndex].last_online = action.payload.last_online;

            for (let i = 0; i < state.channels.length - 1; i++) {

                state.channels[i].users = state.channels[i].users.filter(user => user._id !== action.payload.member_id)
            

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

            const channelIndex = state.channels.findIndex(channel => channel._id === action.payload.channel_id);

            if (channelIndex === -1) return;

            state.channels[channelIndex].last_message_id = action.payload._id;


            
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

                    return {...action.payload, users: channel.users, social: action.payload.social, widgets: action.payload.widgets, auth: action.payload.locked_channel ? auth : true}
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
            if (state.selectedChannelSocial === action.payload) {
                state.selectedChannelSocial = "";
            } else {
                state.selectedChannelSocial = action.payload;
            }
            
        },
        clearServerPing: (state, action) => {
            state.ping = 0;
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

            if (c_index === -1) {
                state.inactiveChannel = {id: "", label: "No Inactive Channel"};

                return;
            }

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

        },
        updateChannelStatus: (state, action) => {
            const l_index = state.channels.findIndex(c => c._id === action.payload.channel_id);

            if (l_index === -1) return;

            state.channels[l_index].status = action.payload.status;
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload.category);
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter(c => c._id !== action.payload.category_id);

            state.channels = state.channels.map(c => {
                if (c.category === action.payload.category_id) {
                    return {...c, category: 'channels'}
                } else {
                    return c;
                }
            })
        },
        reOrderCategories: (state, action) => {
            const sortOrder = action.payload.new_order;

            state.categories = state.categories.sort((a, b) => {
                return sortOrder.indexOf(a._id) - sortOrder.indexOf(b._id);
            })
        }
    },
    extraReducers: {
        [moveUser.rejected]: (state, action) => {
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
        },
        [navigateToServer.pending]: (state, action) => {
            state.loading = true;
        },
        [navigateToServer.fulfilled]: (state, action) => {
            state.loading = false;
            
            state.server_id = action.payload;

        },
        [navigateToServer.rejected]: (state, action) => {
            state.error = true;
            state.loading = false;
            state.connection_lost = false;
            state.errorMessage = action.payload.error;
        },
        [fetchServerDetails.pending]: (state, action) => {
            state.loading = true;
            state.activityFeed = [];
            state.imageOfTheDay = {}
        },
        [fetchServerDetails.fulfilled]: (state, action) => {

            if (!action.payload) {
                state.error = true;
                state.errorMessage = 'Fatal Error Fetching Server Details';
                return;
            }

            state.loading = false;
            state.serverName = action.payload.server_name;
            state.serverBanner = action.payload.server_banner;
            state.members = action.payload.members;
            state.serverGroups = action.payload.server_groups;
            state.serverOwner = action.payload.server_owner;
            state.banList = action.payload.ban_list;
            state.user = action.payload.user;
            state.popular_searches = action.payload.recent_searches;
            state.connection_lost = false;
            state.imageOfTheDay = action.payload.image_of_the_day;
            state.welcomeMessage = action.payload.welcome_message;
            state.activityFeed = action.payload.activity_feed;
            state.bannedKeywords = action.payload.banned_keywords;
            state.categories = action.payload.categories;
            state.disableSafeSearch = action.payload.disable_safe_search;

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

            if (action.payload.channel_id) {
                setTimeout(() => {
                    document.getElementById('channel-button-' + action.payload.channel_id)?.click();
                }, 100)
               
            }
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

            const channel = {...action.payload.channel, auth: true}
            
            state.channels.push(channel)
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
        },
        [createCategory.pending]: (state, action) => {
            state.channelCreationLoading = true;
        },
        [createCategory.rejected]: (state, action) => {
            state.channelCreationLoading = false;
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.channelCreationLoading = false;
            state.categories.push(action.payload.category);
            state.create_channel_menu_open = false;
        },
        [deleteCategory.pending]: (state, action) => {
            state.deletingCategory = true;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.deletingCategory = false;
            state.categories = state.categories.filter(c => c._id !== action.payload.category_id);

            state.channels = state.channels.map(c => {
                if (c.category === action.payload.category_id) {
                    return {...c, category: 'channels'}
                } else {
                    return c;
                }
            })
        },
        [deleteCategory.rejected]: (state, action) => {
            state.deleteCategory = false;
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
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

export const selectServerBannerAmbiance = state => state.serverSlice.serverBannerAmbiance;

export const selectConnectionLost = state => state.serverSlice.connection_lost;

export const selectRoomColor = state => state.serverSlice.roomColor;

export const selectTriggerRoomRescale = state => state.serverSlice.triggerRoomRescale;

export const selectKickedState = state => state.serverSlice.kicked;

export const selectKickedMessage = state => state.serverSlice.kickedMessage;

export const selectImageOfTheDay = state => state.serverSlice.imageOfTheDay;

export const selectActivityFeed = state => state.serverSlice.activityFeed; 

export const selectServerWelcomeMessage = state => state.serverSlice.welcomeMessage;

export const selectBannedKeywords = state => state.serverSlice.bannedKeywords;

export const selectMediaChannels = state => state.serverSlice.mediaChannels;

export const selectCategories = state => state.serverSlice.categories;

export const selectDeletingCategory = state => state.serverSlice.deletingCategory;

export const selectDisableSafeSearch = state => state.serverSlice.disableSafeSearch;

// actions

export const {handleDisableSafeSearch, updateUserChannelStatus, reOrderCategories, removeCategory, addCategory, updateBannedKeywords, setWelcomeMessage, setKickedState, updateChannelStatus, triggerRoomRescale, setRoomColor, toggleConnectionLostState, setServerbannerAmbiance, updateMemberFile, clearSearchData, updateInactiveChannel, removeSongFromWidget, saveSongToWidget, userBanned, toggleCreateChannelMenu, toggleHideDefaultServerNotice, toggleMembersWebCamState, socketToggleMessagePin, updateMemberActiveStatus, clearServerPing, userLeavesServer, deleteMessage, reOrderChannels, toggleReconnectingState, setChannelSocialId, setTopPos, updateJoiningChannelState, clearServerState, updateChannelWidgets, updateMusicVolume, throwMusicError, updateMusicState, skipSong, addSongToQueue, toggleMusicPlaying, deleteChannel, updateChannel, markWidgetForDeletion, addWidgetToChannel, assignNewServerGroup, updateServerGroups, updateServerBanner, closeServerErrorMessage, setEditingChannelId, toggleServerPushToTalkState, newMessage, updateMemberStatus, toggleServerSettingsOpenState, toggleLoadingChannel, setServerName, setServerId, addNewChannel, throwServerError, joinChannel, leaveChannel, userJoinsServer, userLeavesChannel, userJoinsChannel, updateMember } = serverSlice.actions;

export default serverSlice.reducer;
