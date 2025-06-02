import { createSlice} from '@reduxjs/toolkit';
import { fetchMediaHistory } from './Thunks/fetchMediaHistory';

const mediaHistorySlice = createSlice({
  name: 'mediaHistory',
  initialState: {
    // channel_id: { history: [...], page, limit, loading, error }
    historyByChannel: {},
  },
  reducers: {
    clearChannelHistory(state, action) {
      const channel_id = action.payload;
      delete state.historyByChannel[channel_id];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaHistory.pending, (state, action) => {
        const { channel_id } = action.meta.arg;
        if (!state.historyByChannel[channel_id]) {
          state.historyByChannel[channel_id] = { history: [], page: 1, limit: 20, loading: true, error: null };
        } else {
          state.historyByChannel[channel_id].loading = true;
          state.historyByChannel[channel_id].error = null;
        }
      })
      .addCase(fetchMediaHistory.fulfilled, (state, action) => {
        const { channel_id, history, page, limit, no_more } = action.payload;
        const existing = state.historyByChannel[channel_id]?.history || [];

        // Use Map to deduplicate, preserving the first occurrence
        const merged = [...existing, ...history];
        const deduped = Array.from(
          new Map(merged.map(item => [item.history_id, item])).values()
        );

        state.historyByChannel[channel_id] = {
          ...state.historyByChannel[channel_id],
          history: deduped,
          page,
          limit,
          no_more,
          loading: false,
          error: null
        };
      })
      .addCase(fetchMediaHistory.rejected, (state, action) => {
        const { channel_id } = action.meta.arg;
        state.historyByChannel[channel_id] = {
          ...state.historyByChannel[channel_id],
          loading: false,
          error: action.payload || "Failed to fetch media history"
        };
      });
  },
});

export const { clearChannelHistory } = mediaHistorySlice.actions;

export default mediaHistorySlice.reducer;
