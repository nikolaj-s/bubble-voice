import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  x: null,
  y: null,
};

const mousePositionSlice = createSlice({
  name: 'mousePositionSlice',
  initialState,
  reducers: {
    setClickPosition(state, action) {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { setClickPosition } = mousePositionSlice.actions;
export default mousePositionSlice.reducer;
