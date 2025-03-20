

import { createSlice } from '@reduxjs/toolkit';

// Helper function to check and load saved keybinds from localStorage
const loadSavedKeybinds = () => {
  const savedKeybinds = localStorage.getItem('keybinds');
  return savedKeybinds ? JSON.parse(savedKeybinds) : {};
};

const initialState = {
  keybinds: loadSavedKeybinds(),
};

// Redux Slice to manage the keybinds state
const keybindsSlice = createSlice({
  name: 'keybindsSlice',
  initialState,
  reducers: {
    setKeybind: (state, action) => {
      const { actionType, keybind } = action.payload;

      state.keybinds[actionType] = keybind;

      // Save the updated keybinds to localStorage
      localStorage.setItem('keybinds', JSON.stringify(state.keybinds));
      
    },
    loadSavedKeybinds: (state) => {
      state.keybinds = loadSavedKeybinds();
    },
  },
});

export const { setKeybind } = keybindsSlice.actions;

export default keybindsSlice.reducer;
