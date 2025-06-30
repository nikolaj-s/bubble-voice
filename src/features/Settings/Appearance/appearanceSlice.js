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
    setAppearanceSettings: (state, action) => {

      state[action.payload.name] = action.payload.value;
      localStorage.setItem(action.payload.name, JSON.stringify(action.payload.value));

    },
  }
});

export const {
  setAppearanceSettings,
  toggleAppearanceSetting,
} = appearanceSlice.actions;

export default appearanceSlice.reducer;
