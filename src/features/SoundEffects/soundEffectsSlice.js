import { createSlice } from '@reduxjs/toolkit';

export const SOUND_EFFECTS = {
  newMessage: 'https://bubble-media.net/sounds/new-message-pop.mp3',
  controlChange: 'https://bubble-media.net/sounds/new-notification-pop.mp3',
  channelConnected: 'https://bubble-media.net/sounds/channel-disconnected.mp3',
  channelDisconnected: 'https://bubble-media.net/sounds/channel-connected.mp3'
  // add more: yourKey: 'https://…/your-sound.mp3',
};

const initialVolume = (() => {
  const stored = parseFloat(localStorage.getItem('soundEffectVolume'));
  return Number.isFinite(stored) ? stored : 0.5;
})();

const initialState = {
  soundKey:    null,     // e.g. 'newMessage'
  lastPlayed:  0,        // timestamp for re-playing same key
  volume:      initialVolume,
};

const soundEffectSlice = createSlice({
  name: 'soundEffectsSlice',
  initialState,
  reducers: {
    playSoundEffect(state, action) {
      state.soundKey    = action.payload;
      state.lastPlayed  = Date.now();
    },
    stopSoundEffect(state) {
      state.soundKey    = null;
      state.lastPlayed  = 0;
    },
    setSoundEffectVolume(state, action) {
      state.volume = action.payload;
      localStorage.setItem('soundEffectVolume', String(action.payload));
    },
  },
});

export const {
  playSoundEffect,
  stopSoundEffect,
  setSoundEffectVolume,
} = soundEffectSlice.actions;

export default soundEffectSlice.reducer;
