import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "./Thunks/fetchMessages";
import { sendMessage } from "./Thunks/sendMessage";
import { deleteMessage } from "./Thunks/deleteMessage";
import { getFormattedDate } from "../../../lib/services/helperFunctions";
import { pinMessage } from "./Thunks/pinMessage";

const initialState = {
    page: 0,
    messages: [],
    loading: false,
    error: false,
    loadingMore: false,
    sending: false,
    noMoreMessages: false,
    deleting: false,
    currentTextChannel: null,
    textChannelPos: {},
    replyTo: null
}

const textChannelSlice = createSlice({
    name: "textChannelSlice",
    initialState,
    reducers: {
        setReplyTo: (state, action) => {
            state.replyTo = action.payload;
        },
        addMessage: (state, action) => {
            console.log(action.payload)
            if (action.payload.message_id) {

                if (state.messages.find(msg => msg.message_id === action.payload.message_id)) return;

                const message = {
                    ...action.payload,
                    ...getFormattedDate(action.payload.date)
                }

                state.messages.unshift(message);
            }
        },
        removeMessage: (state, action) => {
            
            if (action.payload.message_id) {
                state.messages = state.messages.filter(message => message.message_id !== action.payload.message_id);
            }
        },
        setCurrentTextChannel: (state, action) => {
            state.currentTextChannel = action.payload;
        },
        clearTextChannelState: (state) => {
            state.currentTextChannel = null;
            state.messages = [];
            state.sending = false;
            state.noMoreMessages = false;
            state.deleting = false;
            state.loading = false;
            state.loadingMore = false;
        },
        setTextChannelPos: (state, action) => {
            if (!action.payload.channel_id) return;

            state.textChannelPos[action.payload.channel_id] = action.payload;
        },
        updateMessage: (state, action) => {
            if (!action.payload.message_id) return;

            state.messages = state.messages.map(message => {
                if (message.message_id === action.payload.message_id) {
                    return {...message, ...action.payload};
                } else {
                    return message;
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.pending, (state, action) => {
            const params = action.meta.arg || {};

            if (params.last_message_id) {
                state.loadingMore = true;
            } else {
                state.loading = true;
            }

            state.error = false;
        })
        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.loading = false;
            state.loadingMore = false;
            state.error = action.payload;
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.loadingMore = false;
        
            // Format new messages
            const newMessages = action.payload.messages.map(message => {
                const { formattedDate, formattedTime } = getFormattedDate(message.date);
                return {
                    ...message,
                    formattedDate,
                    formattedTime
                };
            });
        
            // Merge new messages with existing messages and remove duplicates using a Map
            const messagesMap = new Map([
                ...state.messages.map(msg => [msg.message_id, msg]),
                ...newMessages.map(msg => [msg.message_id, msg])
            ]);
        
            // Convert the Map back to an array
            state.messages = Array.from(messagesMap.values());
            state.noMoreMessages = action.payload.no_more_messages;
        });
        
        builder.addCase(sendMessage.pending, (state, action) => {
            const params = action.meta.arg;

            const message = {user_id: params.user_id, text: params.text, image: !!params.image, reply_to: params.reply_to};

            state.sending = message;

            state.error = false;

            state.replyTo = null;
        })
        builder.addCase(sendMessage.rejected, (state, action) => {

            state.sending = false;

            state.error = action.payload;

        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {

            state.sending = false;
            
        })
        builder.addCase(deleteMessage.pending, (state) => {
            state.deleting = true;
            state.error = false;
        })
        builder.addCase(deleteMessage.rejected, (state, action) => {
            state.deleting = false;
            state.error = action.payload;
        })

        // pinning messages
        builder.addCase(pinMessage.pending, (state) => {
            state.error = false;
        })
        builder.addCase(pinMessage.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})

export const {
    addMessage, 
    removeMessage, 
    clearTextChannelState, 
    setCurrentTextChannel, 
    setTextChannelPos,
    updateMessage,
    setReplyTo
} = textChannelSlice.actions;

export default textChannelSlice.reducer;