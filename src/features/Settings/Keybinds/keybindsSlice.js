

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

      // Remove the keybind from any other actionType that currently uses it
      for (const [existingAction, existingKey] of Object.entries(state.keybinds)) {
        if (existingAction !== actionType && existingKey === keybind) {
          delete state.keybinds[existingAction];
        }
      }

      // Assign the new keybind
      state.keybinds[actionType] = keybind;

      // Save to localStorage
      localStorage.setItem('keybinds', JSON.stringify(state.keybinds));
    },

    loadSavedKeybinds: (state) => {
      state.keybinds = loadSavedKeybinds();
    },
  },
});

export const { setKeybind } = keybindsSlice.actions;

export default keybindsSlice.reducer;
