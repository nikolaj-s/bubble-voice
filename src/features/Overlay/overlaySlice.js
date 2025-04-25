import { createSlice } from '@reduxjs/toolkit';

const overlaySlice = createSlice({
  name: 'overlaySlice',
  initialState: {
    currentOverlay: null,
    history: [] // { type: 'search', closed: false }
  },
  reducers: {
    setOverlay: (state, action) => {
      const newOverlay = action.payload;
      if (state.currentOverlay) {
        state.history.push({ type: state.currentOverlay, closed: false });
      }
      state.currentOverlay = newOverlay;
    },

    closeOverlay: (state) => {
      if (!state.currentOverlay) return;

      const lastOverlay = state.currentOverlay;
      state.history.push({ type: lastOverlay, closed: true });

      // Special behavior: restore "search" if we just closed "expandImage"
      if (
        (lastOverlay === 'expandImage' || lastOverlay === 'expandVideo') &&
        state.history.length > 0
      ) {
        const previous = [...state.history][state.history.length - 2]
          
        if ((previous?.type === 'search' || previous?.type === 'serverRecommendations' || previous?.type === 'userProfile') && previous?.closed === false) {
          state.currentOverlay = previous?.type;
          return;
        }
      }

      state.currentOverlay = null;
    },

    clearOverlayHistory: (state) => {
      state.history = [];
    }
  }
});

export const { setOverlay, closeOverlay, clearOverlayHistory } = overlaySlice.actions;

export default overlaySlice.reducer;
