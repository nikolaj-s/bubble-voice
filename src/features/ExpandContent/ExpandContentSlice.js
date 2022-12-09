import { createSlice } from "@reduxjs/toolkit";


const ExpandContentSlice = createSlice({
    name: 'ExpandContentSlice',
    initialState: {
        selectedContent: false
    },
    reducers: {
        setExpandedContent: (state, action) => {
            if (state.selectedContent === action.payload) {
                state.selectedContent = false;
            } else {
                state.selectedContent = action.payload;
            }
        }
    }
})

export const selectExpandedContent = state => state.ExpandContentSlice.selectedContent;

export const { setExpandedContent } = ExpandContentSlice.actions;

export default ExpandContentSlice.reducer;