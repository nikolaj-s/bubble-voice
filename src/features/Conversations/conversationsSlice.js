import { createSlice } from "@reduxjs/toolkit";
import { createConversation } from "./Thunks/createConversation";
import { fetchConversations } from "./Thunks/fetchConversations";
import { deleteConversation } from "./Thunks/deleteConversation";

const conversationsSlice = createSlice({
    name: 'conversationsSlice',
    initialState: {
        loading: false,
        error: false,
        conversations: [],
        isOpen: false,
        unreadConversations: false
    },
    reducers: {
        toggleConversationPanel: (state, action) => {
            state.isOpen = !state.isOpen;
        },
        removeConversation: (state, action) => {
            state.conversations = state.conversations.filter(convo => convo._id !== action.payload.conversation_id)
        },
        updateConversationTimeStamp: (state, action) => {
            state.conversations = state.conversations.map(convo => {
                if (convo._id === action.payload.conversation_id) {
                    return {...convo, updatedAt: action.payload.date}
                } else {
                    return convo;
                }
            })
        },
        toggleUnreadConversations: (state, action) => {
            state.unreadConversations = action.payload;
        }
    },
    extraReducers: (builder) => {
        // fetch conversations
        builder.addCase(fetchConversations.pending, (state) => {
            state.loading = true;
            state.error = false
        })
        .addCase(fetchConversations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchConversations.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.conversations = action.payload;
        })

        // creating or opening a conversation from a user card
        builder.addCase(createConversation.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.isOpen = true;
        })
        .addCase(createConversation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createConversation.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            // ensure no duplicate conversations
            state.conversations = state.conversations.filter(convo => convo._id !== action.payload._id);

            state.conversations.unshift(action.payload);
        })

        // delete conversation
        builder.addCase(deleteConversation.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteConversation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteConversation.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.conversations = state.conversations.filter(convo => convo._id !== action.payload);
        })
    }
})

export const {toggleConversationPanel, removeConversation, updateConversationTimeStamp, toggleUnreadConversations} = conversationsSlice.actions;

export default conversationsSlice.reducer;