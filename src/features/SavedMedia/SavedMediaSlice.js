
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSavedLocalData, saveLocalData } from "../../util/LocalData";

export const fetchSavedMedia = createAsyncThunk(
    'SavedMediaSlice/fetchSavedMedia',
    async (_, {rejectWithValue}) => {
        try {

            const data = await fetchSavedLocalData("SAVED", "MEDIA");

            if (data.error) return [];

            return data;

        } catch (err) {
            console.log(err);
            rejectWithValue({error: true, errorMessage: err.message})
        }
    }
)

const SavedMediaSlice = createSlice({
    name: "SavedMediaSlice",
    initialState: {
        saves: [],
        open: false
    },
    reducers: {
        saveMedia: (state, action) => {

            const index = state.saves.findIndex(m => m.media === action.payload.media);

            if (index === -1) {
                state.saves.unshift(action.payload);
            } else {
                state.saves = state.saves.filter(save => save.media !== action.payload.media);
            }

            saveLocalData("SAVED", "MEDIA", state.saves);
        },
        deleteMedia: (state, action) => {

            state.saves = state.saves.filter(save => save.media !== action.payload.media);



        },
        toggleMediaPanel: (state, action) => {
            state.open = action.payload;
        }
    },
    extraReducers: {
        [fetchSavedMedia.fulfilled]: (state, action) => {
            state.saves = action.payload;
        }
    }
})

export const selectSavedMediaOpenState = state => state.SavedMediaSlice.open;

export const selectSavedMedia = state => state.SavedMediaSlice.saves;

export const { saveMedia, deleteMedia, toggleMediaPanel } = SavedMediaSlice.actions;

export default SavedMediaSlice.reducer;