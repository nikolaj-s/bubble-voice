import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../lib/Validation';

// In-memory guards (module-scope singleton)
const deletionQueue = [];
const deletedIds = new Set();
let isProcessing = false;

// Thunk to process a single deletion
export const processNextMediaDeletion = createAsyncThunk(
  'mediaDeletionSlice/processNext',
  async (_, { dispatch }) => {
    
    if (isProcessing || deletionQueue.length === 0) return;

    isProcessing = true;

    const mediaId = deletionQueue.shift();

    if (!mediaId || deletedIds.has(mediaId)) {
      isProcessing = false;
      setTimeout(() => dispatch(processNextMediaDeletion()), 1000);
      return;
    }

    try {
      await axios.delete(`${API_URL}/media/${mediaId}`);
      deletedIds.add(mediaId);
      console.log(`Deleted media ${mediaId}`);
    } catch (error) {
      console.error(`Failed to delete media ${mediaId}:`, error);
    }

    isProcessing = false;

    // Schedule next in queue after 1000ms
    setTimeout(() => dispatch(processNextMediaDeletion()), 1000);
  }
);

// Public action to enqueue deletion
export const enqueueMediaDeletion = createAsyncThunk(
  'mediaDeletionSlice/enqueue',
  async (mediaId, { dispatch }) => {
    if (!deletedIds.has(mediaId)) {
      deletionQueue.push(mediaId);
      dispatch(processNextMediaDeletion());
    }
  }
);

const mediaDeletionSlice = createSlice({
  name: 'mediaDeletionSlice',
  initialState: {
    pending: [],
    deleted: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enqueueMediaDeletion.fulfilled, (state, action) => {
        // Optionally track in state
        const mediaId = action.meta.arg;
        if (!state.pending.includes(mediaId)) {
          state.pending.push(mediaId);
        }
      })
      .addCase(processNextMediaDeletion.fulfilled, (state) => {
        // Optionally update state here
      });
  }
});

export default mediaDeletionSlice.reducer;
