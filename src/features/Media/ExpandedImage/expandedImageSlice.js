import { createSlice } from "@reduxjs/toolkit";


const expandedImageSlice = createSlice({
    name: "expandedImageSlice",
    initialState: {
        expandedImage: false,
        expandedImageData: false
    },
    reducers: {
        setExpandedImage: (state, action) => {
            state.expandedImage = action.payload.image;
            state.expandedImageData = action.payload.data;
        },
        clearExpandedImage: (state, action) => {
            state.expandedImage = false;
            state.expandedImageData = null;
        }
    }
})

export const {setExpandedImage, clearExpandedImage} = expandedImageSlice.actions;

export default expandedImageSlice.reducer;