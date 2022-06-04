import { createSlice } from "@reduxjs/toolkit";


const contentScreenSlice = createSlice({
    name: "contentScreenSlice",
    initialState: {
        headerTitle: "",
    },
    reducers: {
        toggleServerSelectedState: (state, action) => {
            state.serverSelected = action.payload;
        },
        setHeaderTitle: (state, action) => {
            state.headerTitle = action.payload;
        }
    }
})


// selectors
export const selectHeaderTitle = state => state.contentScreenSlice.headerTitle;

// actions

export const {setHeaderTitle, toggleServerSelectedState} = contentScreenSlice.actions;

export default contentScreenSlice.reducer;