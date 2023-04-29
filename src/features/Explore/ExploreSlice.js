import { createSlice } from "@reduxjs/toolkit";


const ExploreSlice = createSlice({
    name: "ExploreSlice",
    initialState: {
        open: false,
        scrollPos: 0
    },
    reducers: {
        toggleExploreTab: (state, action) => {
            state.open = action.payload;
        },
        setExploreScrollPos: (state, action) => {
            state.scrollPos = action.payload;
        }
    }
})

export const selectExploreTabOpen = state => state.ExploreSlice.open;

export const selectExploreScrollPos = state => state.ExploreSlice.scrollPos;

export const {toggleExploreTab, setExploreScrollPos} = ExploreSlice.actions;

export default ExploreSlice.reducer;