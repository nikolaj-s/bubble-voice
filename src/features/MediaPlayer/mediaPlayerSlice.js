import { createSlice } from "@reduxjs/toolkit";

import { addMediaToPlayer } from "./Thunks/addMediaToPlayer";

const initialState = {
  currentTime: 0,
  currentlyPlaying: null, // { id, title, url, type, duration, etc. }
  isPlaying: false,
  isMuted: false,
  volume: 1,
  queue: [],
  currentChannel: null, // e.g. channel id if this is per channel
  savedMedia: [],
  loading: false,
  error: false,
  isPlayerOpen: false,
  hasAudio: true,
  hideMediaPlayer: false,
  enabled: false,
  color: null
};

const mediaPlayerSlice = createSlice({
  name: "mediaPlayerSlice",
  initialState,
  reducers: {
    addMediaToQueue: (state, action) => {

        if (state.currentlyPlaying) {
            state.queue.push(action.payload);
        } else {
            state.currentlyPlaying = action.payload;
            state.currentTime = 0;
            state.isPlaying = true;
        }

    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    reorderQueue: (state, action) => {
      const newOrder = action.payload.newOrder;

      if (!newOrder) return;

      const map = new Map(state.queue.map(item => [item._id, item]));

      const ordered = newOrder.map(id => map.get(id)).filter(Boolean);
      const remaining = state.queue.filter(item => !newOrder.includes(item._id));

      state.queue = [...ordered, ...remaining];
    },
     addMultipleToQueue: (state, action) => {
      state.queue = [...state.queue, ...action.payload];
    },
    removeMediaFromQueue: (state, action) => {
      state.queue = state.queue.filter(media => media.id !== action.payload);
    },
    clearQueue: (state) => {
      state.queue = [];
      state.currentlyPlaying = null;
      state.isPlaying = false;
    },
    playNextInQueue: (state) => {

        const nextMedia = state.queue.shift();

        if (nextMedia) {
            
            state.currentlyPlaying = nextMedia;
            state.isPlaying = true;
            state.currentTime = 0;

        } else {

            state.currentlyPlaying = null;
            state.isPlaying = false;
            state.currentTime = 0;
            
        }
    },
    skipToPreviousMedia: (state, action) => {
      const { previousMedia } = action.payload; // optional: store last played?
      if (previousMedia) {
        state.currentlyPlaying = previousMedia;
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
    setCurrentlyPlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
      state.currentTime = 0;
    },
    toggleMediaPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    incrementCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    resetCurrentTime: (state) => {
      state.currentTime = 0;
    },
    setMediaPlayerVolume: (state, action) => {
      state.volume = action.payload;
    },
    toggleMediaPlayerMuted: (state, action) => {
      state.isMuted = !state.isMuted;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    setMediaPlayerLoadingState: (state, action) => {
      state.loading = action.payload;
    },
    setErrorState: (state, action) => {
      state.error = action.payload;
    },
    toggleIsMediaPlayerOpen: (state, action) => {
      state.isPlayerOpen = action.payload;
    },
    setMediaHasAudio: (state, action) => {
      state.hasAudio = action.payload;
    },
    toggleHideMediaPlayer: (state, action) => {
      state.hideMediaPlayer = !state.hideMediaPlayer
    },
    enableMediaPlayer: (state, action) => {
      state.enabled = action.payload;
    },
    resetMediaPlayer: () => initialState
  },
  extraReducers: (builder) => {
    // adding media to player to play
    builder.addCase(addMediaToPlayer.pending, (state) => {
        state.loading = false;
        state.error = false;
    })
    builder.addCase(addMediaToPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    builder.addCase(addMediaToPlayer.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
    })
  }
});

export const {
  addMediaToQueue,
  addMultipleToQueue,
  removeMediaFromQueue,
  clearQueue,
  playNextInQueue,
  skipToPreviousMedia,
  setCurrentlyPlaying,
  toggleMediaPlaying,
  incrementCurrentTime,
  resetCurrentTime,
  setMediaPlayerVolume,
  toggleMediaPlayerMuted,
  setCurrentChannel,
  setMediaPlayerLoadingState,
  setErrorState,
  resetMediaPlayer,
  toggleIsMediaPlayerOpen,
  setMediaHasAudio,
  toggleHideMediaPlayer,
  enableMediaPlayer,
  reorderQueue,
  setColor
} = mediaPlayerSlice.actions;

export default mediaPlayerSlice.reducer;
