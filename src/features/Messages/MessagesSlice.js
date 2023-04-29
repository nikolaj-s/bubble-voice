import { createSlice } from "@reduxjs/toolkit";

const MessagesSlice = createSlice({
    name: "MessagesSlice",
    initialState: {
        direct_messages: [],
        loading: false,
        direct_messages_open: false,
        selected_direct_message: ""
    },
    reducers: {
        closeDirectMessage: (state, action) => {
            state.selected_direct_message = "";
        },
        openDirectMessage: (state, action) => {

            if (action.payload.username === state.selected_direct_message) {
                state.selected_direct_message = "";

            } else {

                const dm_index = state.direct_messages.findIndex(o => o.username === action.payload.username);

                if (dm_index === -1) {

                    state.direct_messages.unshift({username: action.payload.username, messages: []})

                    state.selected_direct_message = action.payload.username;

                    state.direct_messages_open = true;

                } else {

                    state.selected_direct_message = action.payload.username;

                    state.direct_messages_open = true;
                }
            }
            
        },
        sendDirectMessage: (state, action) => {

            const dm_index = state.direct_messages.findIndex(o => o.username === action.payload.username);

            if (dm_index === -1) {
                state.direct_messages.unshift({username: action.payload.username, messages: [action.payload.message]})
            } else {
                state.direct_messages[dm_index].messages.unshift(action.payload.message);
            }

        },
        clearDirectMessages: (state, action) => {
            state.direct_messages = [];
            state.selected_direct_message = "";
        },
        updateDirectmessage: (state, action) => {

            const dm = state.direct_messages.findIndex(m => m.username === action.payload.send_to);

            if (dm === -1) return;

            const message = state.direct_messages[dm].messages.findIndex(m => m.content.local_id === action.payload.content.local_id);

            state.direct_messages[dm].messages[message]._id = action.payload._id;

            state.direct_messages[dm].messages[message].content = {...action.payload.content}

        }
    }

})

export const selectDirectMessages = state => state.MessagesSlice.direct_messages;

export const selectDirectMessagesOpen = state => state.MessagesSlice.direct_messages_open;

export const selectCurrentDirectMessage = state => state.MessagesSlice.selected_direct_message;

export const {openDirectMessage, sendDirectMessage, updateDirectmessage, closeDirectMessage, clearDirectMessages} = MessagesSlice.actions;

export default MessagesSlice.reducer;