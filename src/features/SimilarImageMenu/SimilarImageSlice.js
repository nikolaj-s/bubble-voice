import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { throwServerError } from "../server/ServerSlice";
import { FindSimilarImages } from "../../util/FindSimilarImages";

export const findSimilarImages = createAsyncThunk(
    'SimilarImageSlice/findSimilarImages',
    async ({image, withinExpanded}, {rejectWithValue, dispatch, getState}) => {
        try {

            if (!image) {
                dispatch(throwServerError({errorMessage: "Invalid Image Source"}));
                return rejectWithValue(true);
            }

            const data = await FindSimilarImages(image)
            .then(res => {
                return res;
            })
            .catch(err => {
                return {error: true, errorMessage: "Fatal Error"};
            })
            console.log(data)
            if (data.error) {
                dispatch(throwServerError(data));
                return rejectWithValue(true);
            }

            return data.images

        } catch (error) {
            console.log(error);
            dispatch(throwServerError({errorMessage: "ERROR: fatal error finding images"}));
            return rejectWithValue(true);
        }
    }
)

const SimilarImageSlice = createSlice({
    name: "SimilarImageSlice",
    initialState: {
        images: [],
        loading: false,
        menuOpen: false,
        similarImagesSource: "",
        posX: 0,
        posY: 0
    },
    reducers: {
        setSimilarImagesSource: (state, action) => {

        },
        openSimilarImageMenu: (state, action) => {
            state.menuOpen = true;
        },
        closeSimilarImagesMenu: (state, action) => {
            state.menuOpen = false;
        },
        setSimilarImagePosistion: (state, action) => {
            state.posX = action.payload.posX;
            state.posY = action.payload.posY;
        }
    },
    extraReducers: {
        [findSimilarImages.pending]: (state, action) => {
            state.loading = true;

            state.images = [];

            state.similarImagesSource = action.meta.arg.image;
            console.log(action.meta.arg)
            if (action.meta.arg.withinExpanded) {
                state.menuOpen = false;
            } else {
                state.menuOpen = true;
            }
            
        },
        [findSimilarImages.rejected]: (state, action) => {
            state.loading = false;
            state.menuOpen = false;
            state.images = [];
        },
        [findSimilarImages.fulfilled]: (state, action) => {
            state.loading = false;
            state.images = action.payload;
        }
    }
})

export const selectSimilarImageMenuPosX = state => state.SimilarImageSlice.posX;

export const selectSimilarImageMenuPosY = state => state.SimilarImageSlice.posY;

export const selectSimilarImages = state => state.SimilarImageSlice.images;

export const selectLoadingSimilarImages = state => state.SimilarImageSlice.loading;

export const selectSimilarImagesMenuOpen = state => state.SimilarImageSlice.menuOpen;

export const selectSimilarImagesSource = state => state.SimilarImageSlice.similarImagesSource;

export const { closeSimilarImagesMenu, setSimilarImagePosistion, openSimilarImageMenu } = SimilarImageSlice.actions;

export default SimilarImageSlice.reducer;