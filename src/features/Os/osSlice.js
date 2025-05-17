import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Unknown',
  platform: 'unknown'
};

const osSlice = createSlice({
  name: 'osSlice',
  initialState,
  reducers: {
    setOS: (state, action) => {
      state.name = action.payload.name;
      state.platform = action.payload.platform;
    }
  }
});

export const { setOS } = osSlice.actions;

export default osSlice.reducer;
