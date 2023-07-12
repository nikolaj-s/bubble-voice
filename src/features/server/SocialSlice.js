import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "./ServerBar/ServerBar";
import { removePinnedMessage, addPinnedMessage } from "./ChannelRoom/ServerDashBoard/ServerDashBoardSlice";
import { newMessage, throwServerError } from "./ServerSlice";

export const togglePinMessage = createAsyncThunk(
    'SocialSlice/togglePinMessage',
    async (data, {rejectWithValue, dispatch}) => {
        
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
    async ({channel_id}, {rejectWithValue, getState, dispatch}) => {

        try {
            const { messages } = getState().SocialSlice;

            if (!socket) return [];

            const count = messages[channel_id] ? messages[channel_id].length + 15 : 15;

            const data = await socket.request('fetch messages', {channel_id: channel_id, count: count})
            .then(res => res)
            .catch(error => {
                dispatch(throwServerError({error: true, errorMessage: error.errorMessage}))
            })
            
            return data;
           
        } catch (error) {
            console.log(error)
            dispatch(throwServerError({error: true, errorMessage: error.message}))
            return rejectWithValue({error: true, errorMessage: error.message});
        }

    }
)

export const sendMessage = createAsyncThunk(
    'SocialSlice/sendMessage',
    async ({username, file, channel_id, local_id, text, image_preview}, {rejectWithValue, getState, dispatch}) => {
        try {

            const message = {
                username: username,
                channel_id: channel_id,
                content: {
                    image: false,
                    text: text,
                    video: false,
                    link: false,
                    local_id: local_id,
                    loading: true,
                },
                file: file?.size ? file : null,
                valid: true
            }
            console.log(message)
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
        text: ""
    },
    reducers: {
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

            if (!state.messages[action.payload.channel_id]) return;

            const message_index = state.messages[action.payload.channel_id]?.findIndex(m => m._id === action.payload.message_id);

            if (message_index === -1) return;

            state.messages[action.payload.channel_id].splice(message_index, 1);
        },
        messageCleanUp: (state, action) => {
            if (state.messages[action.payload]) {

                state.messages[action.payload] = state.messages[action.payload].slice(0, 15);
            }
        },
        toggleSocialAltLoading: (state, action) => {
            state.altLoading = action.payload;
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
        [fetchMessages.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchMessages.fulfilled]: (state, action) => {
            
            state.loading = false;

            state.messages[action.payload.channel_id] = action.payload.messages;
            
                
        },
        [RequestDeleteMessage.pending]: (state, action) => {
            state.altLoading = true;
        },
        [RequestDeleteMessage.fulfilled]: (state, action) => {
            state.altLoading = false;

            const message_index = state.messages[action.payload.channel_id]?.findIndex(m => m._id === action.payload.message_id);

            if (message_index === -1) return;

            state.messages[action.payload.channel_id].splice(message_index, 1);
        },
        [togglePinMessage.pending]: (state, action) => {
            state.altLoading = true;
        },
        [togglePinMessage.fulfilled]: (state, action) => {

            state.altLoading = false;

            const m_index = state.messages[action.payload.channel_id].findIndex(m => m._id === action.payload._id);

            if (m_index === -1) return;

            state.messages[action.payload.channel_id][m_index].pinned = action.payload.pinned;

        },
        [togglePinMessage.rejected]: (state, action) => {
            state.altLoading = false;
        }
    }
})

export const selectAllMessages = state => state.SocialSlice.messages;

export const selectLoadingMessages = state => state.SocialSlice.loading;

export const selectAltSocialLoading = state => state.SocialSlice.altLoading;

export const { toggleSocialAltLoading, receiveMessage, deleteMessage, clearSocialById, clearMessages, messageCleanUp } = SocialSlice.actions;

export default SocialSlice.reducer;