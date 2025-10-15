import { createSlice } from "@reduxjs/toolkit";
import { fetchConversationMessages } from "./Thunks/fetchConversationMessages";
import { getFormattedDate } from "../../lib/services/helperFunctions";
import { sendConversationMessage } from "./Thunks/sendConversationMessage";
import { deleteConversationMessage } from "./Thunks/deleteConversationMessage";

const conversationSlice = createSlice({
    name: "conversationSlice",
    initialState: {
        loading: false,
        error: false,
        messages: [],
        selectedConversation: null,
        sending: false,
        noMoreMessages: false,
        conversationReply: null,
        text: ""
    },
    reducers: {
        setConversationText: (state, action) => {
            state.text = action.payload;
        },
        setConversationReply: (state, action) => {
            state.conversationReply = action.payload;
        },
        setCurrentConversation: (state, action) => {
            state.messages = [];
            state.selectedConversation = action.payload;
        },
        addConversationMessage: (state, action) => {

            if (action.payload.conversation_id !== state.selectedConversation?._id) return;
            
            if (state.messages.some(m => m._id === action.payload._id)) return;

            const msg = {
                ...action.payload,
                ...getFormattedDate(action.payload.date)
            }

            state.messages.unshift(msg);

        },
        updateConversationMessage: (state, action) => {

            state.messages.map(message => {
                if (message._id === action.payload._id) {
                    return {...message, ...action.payload}
                } else {
                    return message;
                }
            })

        },
        removeConversationMessage: (state, action) => {
            state.messages = state.messages.filter(m => m._id !== action.payload._id);
        }
    },
    extraReducers: (builder) => {
        // fetch conversation messages
        builder.addCase(fetchConversationMessages.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchConversationMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchConversationMessages.fulfilled, (state, action) => {
            const {conversation_id, messages: newMessages, no_more_messages, last_message_id} = action.payload;

            const formatted = newMessages.map(m => {
                const {formattedDate, formattedTime} = getFormattedDate(m.date);

                return {...m, formattedDate, formattedTime}
            })

            if (last_message_id) {

                const ids = new Set(state.messages.map(m => m._id));

                const toAdd = formatted.filter(m => !ids.has(m._id));

                state.messages.push(...toAdd);

            } else {
                state.messages = formatted;
            }

            state.noMoreMessages = no_more_messages;
            state.loading = false;
            state.error = false;

        })

        // send conversation message
        builder.addCase(sendConversationMessage.pending, (state) => {
            state.sending = true;
            state.error = false;
            state.conversationReply = null;
        })
        .addCase(sendConversationMessage.rejected, (state, action) => {
            state.sending = false;
            state.error = action.payload;
        })
        .addCase(sendConversationMessage.fulfilled, (state, action) => {
            state.sending = false;
            const message = {
                ...action.payload,
                ...getFormattedDate(action.payload.date)
            }

            state.messages.unshift(message);
        })

        // delete conversation message
        builder.addCase(deleteConversationMessage.pending, (state) => {
            state.error = false;
        })
        .addCase(deleteConversationMessage.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(deleteConversationMessage.fulfilled, (state, action) => {
            state.error = false;
            state.messages = state.messages.filter(m => m._id !== action.payload._id);
        })
    }
})

export const {setCurrentConversation, addConversationMessage, updateConversationMessage, setConversationReply, removeConversationMessage, setConversationText} = conversationSlice.actions;

export default conversationSlice.reducer;