import { createSlice } from "@reduxjs/toolkit";


const expandedImageSlice = createSlice({
    name: "expandedImageSlice",
    initialState: {
        expandedImage: false,
        expandedImageData: false,
        images: []
    },
    reducers: {
        setImages: (state, action) => {

            state.images = action.payload;

        },
        setExpandedImage: (state, action) => {
            state.expandedImage = action.payload.image;
            state.expandedImageData = action.payload.data;
        },
        clearExpandedImage: (state, action) => {
            state.expandedImage = false;
            state.expandedImageData = null;
            state.images = [];
        }
    }
})

export const {setExpandedImage, clearExpandedImage, setImages} = expandedImageSlice.actions;

export default expandedImageSlice.reducer;