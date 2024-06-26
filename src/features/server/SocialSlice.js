import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "./ServerBar/ServerBar";
import { removePinnedMessage, addPinnedMessage } from "./ChannelRoom/ServerDashBoard/ServerDashBoardSlice";
import { newMessage, throwServerError } from "./ServerSlice";
import { addActivityMessage } from "./ChannelRoom/ServerDashBoard/ServerDashBoardSlice";
import { UploadVideo } from "../../util/UploadVideo";
import Axios from 'axios';

export const togglePinMessage = createAsyncThunk(
    'SocialSlice/togglePinMessage',
    async (data, {rejectWithValue, dispatch, getState}) => {
        
            try {

                if (!data._id) return rejectWithValue({errorMessage: "Invalid Message"});

                const pin = await socket.request('toggle pinned message', data)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err)
                    return rejectWithValue({errorMessage: err.errorMessage})
                })
                
                if (pin.message.pinned) {
                    
                    dispatch(addPinnedMessage(pin))
                
                } else {
                    
                    dispatch(removePinnedMessage(pin))
                
                }

                return pin.message;

            } catch (error) {
                console.log(error);
                dispatch(throwServerError({error: true, errorMessage: error.message}))
                return rejectWithValue({error: true, errorMessage: error.message});
            }
    }
)

export const fetchMessages = createAsyncThunk(
    'SocialSlice/fetchMessages',
    async ({channel_id, type}, {rejectWithValue, getState, dispatch}) => {

        try {
            const { messages } = getState().SocialSlice;

            if (!socket) return [];

            const count = messages[channel_id] ? messages[channel_id].length + 25 : 25;

            const data = await socket.request('fetch messages', {channel_id: channel_id, count: count, type: type})
            .then(res => res)
            .catch(error => {
                console.log(error)
                dispatch(throwServerError({error: true, errorMessage: error}));

                return {error: true};
            })

            if (data.error) {
                return rejectWithValue({error: true, channel_id: channel_id})
            }

            return data;
             
        } catch (error) {
            console.log(error)
            dispatch(throwServerError({error: true, errorMessage: error.message}))
            return rejectWithValue({error: true, errorMessage: error.message});
        }

    }
)

export const fetchFilteredMessages = createAsyncThunk(
    'SocialSlice/fetchFilteredMessages',
    async ({channel_id, filter}, {rejectWithValue}) => {
        try {
            if (!channel_id) return [];

            if (!filter) return [];

            const data = await socket.request('fetch filtered messages', {channel_id: channel_id, filter: filter})
            .then(res => res)
            .catch(err => {
                return {error: true, errorMessage: err.errorMessage}
            })

            if (data.error) return rejectWithValue({errorMessage: data.errorMessage});

            console.log(data)

            return data.messages;

        } catch (error) {
            console.log(error);
            return rejectWithValue({errorMessage: "Fatal Error"});
        }
    }
)

export const sendMessage = createAsyncThunk(
    'SocialSlice/sendMessage',
    async ({username, file, channel_id, local_id, text, image_preview, screen_shot = false, emoji, nsfw, textStyle, fall_back_image, media_meta_data, media_video}, {rejectWithValue, getState, dispatch}) => {
        try {

            const message = {
                username: username,
                channel_id: channel_id,
                content: {
                    image: false,
                    text: text,
                    video: false,
                    video_upload: false,
                    link: false,
                    local_id: local_id,
                    loading: true,
                    emoji: emoji,
                    textStyle: textStyle,
                    fall_back_image: fall_back_image,
                    reddit: false,
                    media_meta_data: media_meta_data,
                    media_video: media_video
                },
                valid: true,
                screen_shot: screen_shot,
                file: null,
                nsfw: nsfw
            }

            let redditUrl;

            let redditData = false;

            for (const t of text.split(' ')) {
                if (t.includes('https') && t.includes('reddit.com')) {
                    redditUrl = t.split('?')[0];
                }
            }

            if (redditUrl) {

                const post = await Axios.get(`${redditUrl}.json`).then(res => {
                    try {
                        return res.data[0].data.children[0].data;
                    } catch (e) {
                        return false;
                    } 
                    
                }).catch(e => {return false})

                redditData = post;

            }

            message.content.reddit = redditData;

            if (!file?.type?.includes('image') && file?.size) {

                let data = await UploadVideo(file);
            
                if (data.error) {
                    dispatch(throwServerError({error: true, errorMessage: data.error}));
                    
                    return rejectWithValue(message)
                
                }
             
                message.content.video_upload = {link: data.link, name: data.data.fileName};
                
            } else if (file?.type?.includes('image')) {
                message.file = file;
            }

            const data = await socket.request('message', message)
            .then(res => {
                return res.message;
            })
            .catch(err => {
                console.log(err)
                dispatch(throwServerError({error: true, errorMessage: err}));
                return rejectWithValue(message);
            })
           
            dispatch(newMessage(data));

            if (data.screen_shot) {
                dispatch(addActivityMessage(data));
            }

            return data;

        } catch (error) {
            console.log(error)
            dispatch(throwServerError({error: true, errorMessage: error.message}));
            return rejectWithValue({error: true});
        }
    }
)

export const RequestDeleteMessage = createAsyncThunk(
    'SocialSlice/deleteMessage',
    async ({channel_id, message_id}, {rejectWithValue, dispatch}) => {
        try {

            const data = await socket.request('delete message', {channel_id: channel_id, message_id: message_id})
            .then(result => {
                
                dispatch(newMessage(result));

                dispatch(removePinnedMessage({message: {_id: result.message_id}}))
                
                return result;
            })
            .catch(error => {
                console.log(error);

                dispatch(throwServerError({errorMessage: error}));

                return rejectWithValue({errorMessage: error});
            })

            return data;

        } catch (error) {
            dispatch(throwServerError({error: true, errorMessage: error.message}))
            return rejectWithValue({error: true});
        }
    }
)

const SocialSlice = createSlice({
    name: "SocialSlice",
    initialState: {
        loading: false,
        altLoading: false,
        messages: {},
        current_social: "",
        current_channel: "",
        image_preview: "",
        text: "",
        scrollPositions: {},
        showingNsfwNotice: false,
        filterState: {},
        filterMenuOpen: false,
        loadingFilteredMessages: false,
        filteredMessageResults: [],
    },
    reducers: {
        toggleFilterMenu: (state, action) => {
            state.filterMenuOpen = action.payload;
        },
        setFilterState: (state, action) => {
            state.filterState = action.payload;
        },
        setScrollPosition: (state, action) => {
            state.scrollPositions[action.payload.channel_id] = action.payload.position;
        },
        toggleNsfwNotice: (state, action) => {
            console.log(action.payload)
            state.showingNsfwNotice = action.payload;
        },
        setCurrentChannel: (state, action) => {
            state.current_channel = action.payload;
        },
        setCurrentSocial: (state, action) => {
            state.current_social = action.payload;
        },
        clearSocialById: (state, action) => {
            state.messages[action.payload] = [];
        },
        receiveMessage: (state, action) => {
            if (state.messages[action.payload.channel_id]) {
                
                const index = state.messages[action.payload.channel_id].findIndex(m => m._id === action.payload._id);

                if (index !== -1) return;

                state.messages[action.payload.channel_id].unshift(action.payload);
            
            } else {

                state.messages[action.payload.channel_id] = [action.payload]
            
            }

        },
        pinMessage: (state, action) => {

            if (!state.messages[action.payload.channel_id]) return;

            const m_index = state.messages[action.payload.channel_id].findIndex(m => m._id === action.payload._id);

            if (m_index === -1) return;

            state.messages[action.payload.channel_id][m_index].pinned = action.payload.pinned;
        },
        clearMessages: (state, action) => {
            state.messages = {};
        },
        toggleLoadingMessage: (state, action) => {
            state.loading = action.payload;
        },
        deleteMessage: (state, action) => {

            const deletingFromFilterMenu = state.filteredMessageResults.findIndex(m => m._id === action.payload.message_id);

            if (deletingFromFilterMenu !== -1) {
                state.filteredMessageResults.splice(deletingFromFilterMenu, 1);
            }

            if (!state.messages[action.payload.channel_id]) return;

            const message_index = state.messages[action.payload.channel_id]?.findIndex(m => m._id === action.payload.message_id);

            if (message_index === -1) return;

            state.messages[action.payload.channel_id].splice(message_index, 1);
        },
        messageCleanUp: (state, action) => {
            if (state.messages[action.payload]) {

            //    state.messages[action.payload] = state.messages[action.payload].slice(0, 40);
            
            }
        },
        toggleSocialAltLoading: (state, action) => {
            state.altLoading = action.payload;
        },
        clearFilteredResults: (state, action) => {
            state.filteredMessageResults = [];
        }
    },
    extraReducers: {
        [sendMessage.pending]: (state, action) => {
            
            const selected_social = state.messages[action.meta.arg.channel_id];

            if (!selected_social) state.messages[action.meta.arg.channel_id] = [];

            const data = {
                username: action.meta.arg.username,
                channel_id: action.meta.arg.channel_id,
                content: {
                    image: action.meta.arg.image_preview,
                    text: action.meta.arg.text,
                    loading: true,
                    link: false,
                    video: false,
                },
                local_id: action.meta.arg.local_id
            }
            
            state.messages[action.meta.arg.channel_id].unshift(data);

        },
        [sendMessage.fulfilled]: (state, action) => {
            
            const message_index = state.messages[action.payload.channel_id].findIndex(m => m.local_id === action.payload.content.local_id)
        
            state.messages[action.payload.channel_id][message_index] = action.payload;

        },
        [sendMessage.rejected]: (state, action) => {
            if (state.messages[action.payload.channel_id]) {
                const message_index = state.messages[action.payload.channel_id].findIndex(m => m.local_id === action.payload.content.local_id);

                if (message_index === -1) return;

                state.messages[action.payload.channel_id].splice(message_index, 1);
            }
            
        },
        [fetchMessages.rejected]: (state, action) => {
            state.loading = false;

            state.current_social = "";

            state.messages[action.payload.channel_id] = [];
        },
        [fetchMessages.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchMessages.fulfilled]: (state, action) => {
            
            

            if (action.payload.messages.length < 16) {
                state.showingNsfwNotice = action.payload.nsfw_notice;
            }

            state.messages[action.payload.channel_id] = action.payload.messages;

            state.loading = false;
            
        },
        [RequestDeleteMessage.pending]: (state, action) => {
            state.altLoading = true;
            state.loadingFilteredMessages = true;
        },
        [RequestDeleteMessage.fulfilled]: (state, action) => {
            state.altLoading = false;

            state.loadingFilteredMessages = false;

            const deletingFromFilterMenu = state.filteredMessageResults.findIndex(m => m._id === action.payload.message_id);

            if (deletingFromFilterMenu !== -1) {
                state.filteredMessageResults.splice(deletingFromFilterMenu, 1);
            }

            if (!state.messages[action.payload.channel_id]) return;

            const message_index = state.messages[action.payload.channel_id]?.findIndex(m => m._id === action.payload.message_id);

            if (message_index === -1) return;

            state.messages[action.payload.channel_id]?.splice(message_index, 1);
        },
        [RequestDeleteMessage.rejected]: (state, action) => {
            state.altLoading = false;
            state.loadingFilteredMessages = false;
        },
        [togglePinMessage.pending]: (state, action) => {
            state.altLoading = true;
        },
        [togglePinMessage.fulfilled]: (state, action) => {

            state.altLoading = false;

            const m_index = state.messages[action.payload.channel_id]?.findIndex(m => m._id === action.payload._id);

            if (m_index === -1 || !m_index) return;

            state.messages[action.payload.channel_id][m_index].pinned = action.payload.pinned;

        },
        [togglePinMessage.rejected]: (state, action) => {
            state.altLoading = false;
        },
        [fetchFilteredMessages.pending]: (state, action) => {
            state.loadingFilteredMessages = true;
            state.filteredMessageResults = [];
        },
        [fetchFilteredMessages.rejected]: (state, action) => {
            state.loadingFilteredMessages = false;
            state.filteredMessageResults = [];
        },
        [fetchFilteredMessages.fulfilled]: (state, action) => {
            state.loadingFilteredMessages = false;
            state.filteredMessageResults = action.payload;
        }
    }
})

export const selectAllMessages = state => state.SocialSlice.messages;

export const selectLoadingMessages = state => state.SocialSlice.loading;

export const selectAltSocialLoading = state => state.SocialSlice.altLoading;

export const selectNsfwNoticeState = state => state.SocialSlice.showingNsfwNotice;

export const selectScrollPosition = state => state.SocialSlice.scrollPositions;

export const selectFilterState = state => state.SocialSlice.filterState;

export const selectFilterMenuOpen = state => state.SocialSlice.filterMenuOpen;

export const selectLoadingFilteredMessages = state => state.SocialSlice.loadingFilteredMessages;

export const selectFilteredMessageResults = state => state.SocialSlice.filteredMessageResults;

export const {clearFilteredResults, toggleFilterMenu, setScrollPosition, toggleNsfwNotice, toggleSocialAltLoading, receiveMessage, deleteMessage, clearSocialById, clearMessages, messageCleanUp } = SocialSlice.actions;

export default SocialSlice.reducer;