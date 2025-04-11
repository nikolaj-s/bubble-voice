// store/connectionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'connecting', // 'connected' | 'disconnected' | 'reconnected'
};

const connectionSlice = createSlice({
  name: 'connectionSlice',
  initialState,
  reducers: {
    setConnectionState: (state, action) => {
        if (state.status === 'disconnected' && action.payload === 'connected') {
          state.status = 'reconnected'
        } else {
          state.status = action.payload;
        }
       
    }
  },
});

export const { setConnectionState } = connectionSlice.actions;

export default connectionSlice.reducer;
