import { createSlice } from "@reduxjs/toolkit";


const ExpandContentSlice = createSlice({
    name: 'ExpandContentSlice',
    initialState: {
        selectedContent: false
    },
    reducers: {
        setExpandedContent: (state, action) => {
            state.selectedContent = action.payload;
        }
    }
})

export const selectExpandedContent = state => state.ExpandContentSlice.selectedContent;

export const { setExpandedContent } = ExpandContentSlice.actions;

export default ExpandContentSlice.reducer;