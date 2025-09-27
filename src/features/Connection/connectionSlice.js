// store/connectionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'connecting', // 'connected' | 'disconnected' | 'reconnected'
  connectionInfo: {}
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
       
    },
    setConnectionInfo: (state, action) => {
      state.connectionInfo = action.payload;
    }
  },
});

export const { setConnectionState, setConnectionInfo } = connectionSlice.actions;

export default connectionSlice.reducer;
