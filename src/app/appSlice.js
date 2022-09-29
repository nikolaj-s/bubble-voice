
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { getToken, url } from "../util/Validation";

export const fetchReleaseNotes = createAsyncThunk(
    'appSlice/fetchReleaseNotes',
    async (_, {rejectWithValue}) => {
        try {

            const token = await getToken();

            const releaseNotes = await Axios({
                method: "GET",
                url: `${url}/fetch-release-notes`,
                headers: {"TOKEN": token}
            }).then(response => {
                
                return response.data;
                
            })

            if (releaseNotes.error) return rejectWithValue(releaseNotes);

            return releaseNotes;
        } catch (error) {
            console.log(error);
            rejectWithValue({error: true, errorMessage: "fatal error fetching release notes"});
        }
    }
)

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        loadingApp: true,
        userSignedIn: false,
        updateAvailable: false,
        currentVersion: "",
        releaseNotes: [],
        loadingReleaseNotes: true,
        releaseNotesError: false,
        releaseNotesErrorMessage: ""
    },
    reducers: {
        handleUpdateAvailable: (state, action) => {
            state.updateAvailable = action.payload;
        },
        updateCurrentAppVersion: (state, action) => {
            state.currentVersion = action.payload;
        },
        closeReleaseNotesErrorMessage: (state, action) => {
            state.releaseNotesError = false;
            state.releaseNotesErrorMessage = "";
        }
    },
    extraReducers: {
        [fetchReleaseNotes.pending]: (state, action) => {
            state.loadingReleaseNotes = true;
        },
        [fetchReleaseNotes.fulfilled]: (state, action) => {
            state.loadingReleaseNotes = false;
            state.releaseNotesError = false;
            state.releaseNotesErrorMessage = "";
            state.releaseNotes = action.payload.release_notes;
        },
        [fetchReleaseNotes.rejected]: (state, action) => {
            state.loadingReleaseNotes = false;
            state.releaseNotesError = true;
            state.releaseNotesErrorMessage = action.payload.errorMessage;
        }
    }
})

export const selectCurrentRouteState = state => state.appSlice.currentRoute;

export const selectLoadingAppState = state => state.appSlice.loadingApp;

export const selectUpdateAvailableState = state => state.appSlice.updateAvailable;

export const selectCurrentAppVersion = state => state.appSlice.currentVersion;

export const selectLoadingReleaseNotes = state => state.appSlice.loadingReleaseNotes;

export const selectReleaseNotes = state => state.appSlice.releaseNotes;

export const selectReleaseNotesError = state => state.appSlice.releaseNotesError;

export const selectReleaseNotesErrorMessage = state => state.appSlice.releaseNotesErrorMessage;

export const { closeReleaseNotesErrorMessage, updateCurrentAppVersion, handleUpdateAvailable } = appSlice.actions;

export default appSlice.reducer;