import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearLocalData, fetchHardWareAcceleration, fetchSavedLocalData, saveHardwareAcceleration, saveLocalData } from "../../../../util/LocalData";

export const fetchMiscellaneousSettings = createAsyncThunk(
    'fetchMiscellaneousSettings/MiscellaneousSettingsSLice',
    async (_, { rejectWithValue}) => {
        try {

            const data = await fetchSavedLocalData("MISC", "MISCSETTINGS");

            if (data.error) {
                return rejectWithValue({error: true});
            }

            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true})
        }
    }
)

export const fetchSavedHardwareAcceleration = createAsyncThunk(
    'fetchSavedHardwareAcceleration/MiscellaneousSettingsSlice',
    async (_, {rejectWithValue}) => {
        try {

            const data = await fetchHardWareAcceleration();

            if (data.error) return rejectWithValue({error: true});

            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true})
        }
    }
)

const MiscellaneousSettingsSlice = createSlice({
    name: 'MiscellaneousSettingsSlice',
    initialState: {
        loading: false,
        hardwareAcceleration: false,
        error: false,
        errorMessage: "",
        restartNotice: false,
        // channel specific settings
        disableMessagePopUp: false,
        hideChannelBackground: false,
        hideNonVideoParticapents: false,
        disableGifProfiles: false
    },
    reducers: {
        miscSettingsClearLocalData: (state, action) => {
            state.loading = true;

            clearLocalData();

            state.loading = false;
        },
        miscSettingsToggleHardwareAcceleration: (state, action) => {
            
            saveHardwareAcceleration(!state.hardwareAcceleration);

            state.restartNotice = true;

            state.hardwareAcceleration = !state.hardwareAcceleration;
        }, 
        miscSettingsClearError: (state, action) => {
            state.error = false;
            state.errorMessage = "";
        },
        miscSettingsChannelSpecificStateChange: (state, action) => {
            state[action.payload] = !state[action.payload];

            const obj = {
                disableMessagePopUp: state.disableMessagePopUp,
                hideChannelBackground: state.hideChannelBackground,
                hideNonVideoParticapents: state.hideNonVideoParticapents,
                disableGifProfiles: state.disableGifProfiles
            }

            saveLocalData("MISC", "MISCSETTINGS", obj);
        }
    },
    extraReducers: {
        [fetchSavedHardwareAcceleration.fulfilled]: (state, action) => {
            state.hardwareAcceleration = action.payload.toggled;
        },
        [fetchSavedHardwareAcceleration.rejected]: (state, action) => {
            return;
        },
        [fetchMiscellaneousSettings.rejected]: (state, action) => {
            // use defaults if no prior saved data
            return;
        },
        [fetchMiscellaneousSettings.fulfilled]: (state, action) => {

            const saved_data = action.payload;

            if (!saved_data) return;

            state.disableMessagePopUp = saved_data.disableMessagePopUp;

            state.disableGifProfiles = saved_data.disableGifProfiles;

            state.hideChannelBackground = saved_data.hideChannelBackground;

            state.hideNonVideoParticapents = saved_data.hideNonVideoParticapents;

        }
    }
})

export const selectMiscSettingsLoading = state => state.MiscellaneousSettingsSlice.loading;

export const selectHardwareAcceleration = state => state.MiscellaneousSettingsSlice.hardwareAcceleration;

export const selectRestartNotice = state => state.MiscellaneousSettingsSlice.restartNotice;

export const selectMiscSettingsError = state => state.MiscellaneousSettingsSlice.error;

export const selectMiscSettingsErrorMessage = state => state.MiscellaneousSettingsSlice.errorMessage;

export const selectMiscSettingsDisableMessagePopUp = state => state.MiscellaneousSettingsSlice.disableMessagePopUp;

export const selectMiscSettingsDisableGifProfiles = state => state.MiscellaneousSettingsSlice.disableGifProfiles;

export const selectMiscSettingsHideChannelBackground = state => state.MiscellaneousSettingsSlice.hideChannelBackground;

export const selectMiscSettingsHideNonVideoParticapents = state => state.MiscellaneousSettingsSlice.hideNonVideoParticapents;

export const { miscSettingsClearLocalData, miscSettingsToggleHardwareAcceleration, miscSettingsClearError, miscSettingsChannelSpecificStateChange } = MiscellaneousSettingsSlice.actions;


export default MiscellaneousSettingsSlice.reducer;