import { initialState } from "./State/appearanceState";
import { createSlice } from "@reduxjs/toolkit";

const appearanceSlice = createSlice({
  name: "appearanceSlice",
  initialState,
  reducers: {
    toggleAppearanceSetting: (state, action) => {
      state[action.payload] = !state[action.payload];
      localStorage.setItem(action.payload, JSON.stringify(state[action.payload]));
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    }
  }
});

export const {
  toggleAppearanceSetting,
  setTheme
} = appearanceSlice.actions;

export default appearanceSlice.reducer;
