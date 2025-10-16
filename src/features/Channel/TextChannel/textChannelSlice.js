// src/features/textChannel/textChannelSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "./Thunks/fetchMessages";
import { sendMessage }   from "./Thunks/sendMessage";
import { deleteMessage } from "./Thunks/deleteMessage";
import { pinMessage }    from "./Thunks/pinMessage";
import { getFormattedDate } from "../../../lib/services/helperFunctions";
import { setCachedMessages } from "../../../lib/indexedDBCache";

const initialState = {
  page: 0,
  messages: [],
  loading: true,
  error: false,
  loadingMore: false,
  sending: false,
  noMoreMessages: false,
  deleting: false,
  currentTextChannel: null,
  textChannelPos: {},
  replyTo: null,
  text: "",
  targetNotFound: false
};

const textChannelSlice = createSlice({
  name: "textChannelSlice",
  initialState,
  reducers: {
    // load from cache on pending
    loadMessagesFromCache(state, { payload }) {
      const { channel_id, messages } = payload;
      console.log('setting cached messages')
      state.messages = messages.map(msg => ({
        ...msg,
        ...getFormattedDate(msg.date)
      }));
      state.loading = false;
      state.loadingMore = false;
      state.noMoreMessages = false;
    },
    addMessage(state, { payload }) {
        if (!payload.message_id) return;
        // avoid dupes
        if (state.messages.some(m => m.message_id === payload.message_id)) return;
        const msg = {
            ...payload,
            ...getFormattedDate(payload.date)
        };
        state.messages.unshift(msg);
            // sync to IndexedDB
        setCachedMessages({
            channel_id: state.currentTextChannel,
            messages: state.messages,
            cachedAt: Date.now()
        }).catch(() => { /* ignore */ });
    },
    removeMessage(state, { payload }) {
        if (!payload.message_id) return;
        state.messages = state.messages.filter(m => m.message_id !== payload.message_id);
        // sync to IndexedDB
        setCachedMessages({
            channel_id: state.currentTextChannel,
            messages: state.messages,
            cachedAt: Date.now()
        }).catch(() => { /* ignore */ });
    },
    setCurrentTextChannel(state, { payload }) {
      state.currentTextChannel = payload;
    },
    clearTextChannelState(state) {
      Object.assign(state, initialState);
    },
    setTextChannelPos(state, { payload }) {
      if (!payload.channel_id) return;
      state.textChannelPos[payload.channel_id] = payload;
      // sync to IndexedDB
        setCachedMessages({
            channel_id: state.currentTextChannel,
            messages: state.messages,
            cachedAt: Date.now()
        }).catch(() => { /* ignore */ });
    },
    updateMessage(state, { payload }) {
        if (!payload._id) return;
        state.messages = state.messages.map(m =>
            m._id === payload._id
            ? { ...m, ...payload, media_ref: payload.media_ref }
            : m
        );
        // sync to IndexedDB
        setCachedMessages({
          channel_id: state.currentTextChannel,
          messages: state.messages,
          cachedAt: Date.now()
        }).catch(() => { /* ignore */ });
    },
    setReplyTo(state, { payload }) {
      state.replyTo = payload;
    },
    setTextForTextChannel(state, { payload }) {
      if (typeof payload === 'string') {
        state.text = payload;
      }
    },
    clearMessagesByUser(state, { payload }) {
        state.messages = state.messages.filter(m => m.user_id !== payload.user_id);
        // sync to IndexedDB
        setCachedMessages({
            channel_id: state.currentTextChannel,
            messages: state.messages,
            cachedAt: Date.now()
        }).catch(() => { /* ignore */ });
        
    }
  },
  extraReducers: builder => {
    builder
      // — pending —
      .addCase(fetchMessages.pending, (state, action) => {
        const { last_message_id } = action.meta.arg;
        state.loading     = !last_message_id;
        state.loadingMore = !!last_message_id;
        state.error       = false;
      })

      // — fulfilled —
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const {
          channel_id,
          messages: serverMsgs,
          no_more_messages,
          last_message_id
        } = action.payload;

        // format dates
        const formatted = serverMsgs.map(m => {
          const { formattedDate, formattedTime } = getFormattedDate(m.date);
          return { ...m, formattedDate, formattedTime };
        });

        if (last_message_id) {
          // pagination: append only new ones
          const ids = new Set(state.messages.map(m => m.message_id));
          const toAdd = formatted.filter(m => !ids.has(m.message_id));
          state.messages.push(...toAdd);
        } else {
          // initial load: replace entirely
          state.messages = formatted;
        }

        state.noMoreMessages = no_more_messages;
        state.loading       = false;
        state.loadingMore   = false;

        // sync back to cache
         // sync to IndexedDB
        setCachedMessages({
          channel_id: state.currentTextChannel,
          messages: state.messages,
          cachedAt: Date.now()
        }).catch((e) => { /* ignore */console.log(e) });
        
      })

      // — rejected —
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading     = false;
        state.loadingMore = false;
        state.error       = action.payload;
      })

      // — sendMessage —
      .addCase(sendMessage.pending, (state, action) => {
        state.sending = true;
        state.error   = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        // you likely dispatch addMessage() from the component or websocket
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error   = action.payload;
      })

      // — deleteMessage —
      .addCase(deleteMessage.pending, (state) => {
        state.deleting = true;
        state.error    = false;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.deleting = false;
        // dispatch removeMessage() to sync UI + cache
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.deleting = false;
        state.error    = action.payload;
      })

      // — pinMessage (no cache changes) —
      .addCase(pinMessage.pending, (state) => {
        state.error = false;
      })
      .addCase(pinMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const {
  loadMessagesFromCache,
  addMessage,
  removeMessage,
  setCurrentTextChannel,
  clearTextChannelState,
  setTextChannelPos,
  updateMessage,
  setReplyTo,
  setTextForTextChannel,
  clearMessagesByUser
} = textChannelSlice.actions;

export default textChannelSlice.reducer;
