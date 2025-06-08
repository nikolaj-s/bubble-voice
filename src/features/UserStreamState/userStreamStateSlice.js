import { createSlice } from '@reduxjs/toolkit';

// Util for getting initial state from localStorage
const getInitialState = () => {
  try {
    const data = localStorage.getItem('userStreamStates');
    if (data) return {streams: JSON.parse(data)};
  } catch {}
  return {streams: {}, loading: false};
};

const userStreamStateSlice = createSlice({
  name: 'userStreamStateSlice',
  initialState: getInitialState(),
  reducers: {
    setStreamDisabled: (state, action) => {
      // { key, disabled }
      const { key, disabled } = action.payload;
      state.streams[key] = { disabled };
    },
    toggleStreamDisabled: (state, action) => {
      const key = action.payload;
      state.streams[key] = { disabled: !state[key]?.disabled };
    },
    clearStreamStates: (state) => {
      Object.keys(state).forEach(k => delete state[k]);
    },
    setStreamLoadingState: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const {
  setStreamDisabled,
  toggleStreamDisabled,
  clearStreamStates,
  setStreamLoadingState
} = userStreamStateSlice.actions;

export default userStreamStateSlice.reducer;

// Selector helper
export const selectStreamDisabled = (state, key) =>
  !!state.userStreamStateSlice.streams[key]?.disabled;
