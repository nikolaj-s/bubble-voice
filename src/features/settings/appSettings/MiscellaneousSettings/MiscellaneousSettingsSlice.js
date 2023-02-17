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
        disableGifProfiles: false,
        hideUserStatus: false,
        popOutUserStreams: true,
        autoPlayNativeVideos: true,
        defaultServer: {label: "Default", id: ""},
        roomScale: 1,
        enabledSystemNotifications: true,
        muteSocialVideos: true,
        activity: false
    },
    reducers: {
        pushSytemNotification: (state, action) => {
            
            if (state.enabledSystemNotifications) {
                
                try {

                    const notifier = window.require('node-notifier');

                    notifier.notify({
                        appID: "Bubble",
                        title: `New Message Posted By ${action.payload.content.display_name}`,
                        message: action.payload.content.text,
                        sound: true
                    })
                    
                } catch (error) {
                    console.log(error);
                }
            }

        },
        pushPokeNotification: (state, action) => {

            if (state.enabledSystemNotifications) {
                const notifier = window.require('node-notifier');

                const path = window.require('path');

                notifier.notify({
                    appID: "Bubble",
                    title: `You Have Been Poked`,
                    message: action.payload,
                    sound: true,
                    icon: path.join(__dirname, 'logo.png')
                })
            }

        },
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
                disableGifProfiles: state.disableGifProfiles,
                hideUserStatus: state.hideUserStatus,
                defaultServer: state.defaultServer,
                enabledSystemNotifications: state.enabledSystemNotifications,
                autoPlayNativeVideos: state.autoPlayNativeVideos,
                muteSocialVideos: state.muteSocialVideos,
                activity: state.activity,
                popOutUserStreams: state.popOutUserStreams
            }

            saveLocalData("MISC", "MISCSETTINGS", obj);
        },
        setDefaultServer: (state, action) => {

            state.defaultServer = action.payload;

            const obj = {
                disableMessagePopUp: state.disableMessagePopUp,
                hideChannelBackground: state.hideChannelBackground,
                hideNonVideoParticapents: state.hideNonVideoParticapents,
                disableGifProfiles: state.disableGifProfiles,
                hideUserStatus: state.hideUserStatus,
                defaultServer: state.defaultServer,
                enabledSystemNotifications: state.enabledSystemNotifications
            }

            saveLocalData("MISC", "MISCSETTINGS", obj);
        },
        changeRoomScale: (state, action) => {
            state.roomScale = action.payload;
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

            state.hideUserStatus = saved_data.hideUserStatus;

            if (saved_data.autoPlayNativeVideos === false) state.autoPlayNativeVideos = false;

            if (saved_data.muteSocialVideos === false) state.muteSocialVideos = false;
            
            if (saved_data.defaultServer) state.defaultServer = saved_data.defaultServer;
            
            if (saved_data.enabledSystemNotifications !== (undefined && null)) state.enabledSystemNotifications = saved_data.enabledSystemNotifications;
            
            if (saved_data.activity) state.activity = true;

          //  if (saved_data.popOutUserStreams) state.popOutUserStreams = true;
        }
    }
})

export const selectSystemNotifcations = state => state.MiscellaneousSettingsSlice.enabledSystemNotifications;

export const selectDefaultServer = state => state.MiscellaneousSettingsSlice.defaultServer;

export const selectHideUserStatus = state => state.MiscellaneousSettingsSlice.hideUserStatus;

export const selectMiscSettingsLoading = state => state.MiscellaneousSettingsSlice.loading;

export const selectHardwareAcceleration = state => state.MiscellaneousSettingsSlice.hardwareAcceleration;

export const selectRestartNotice = state => state.MiscellaneousSettingsSlice.restartNotice;

export const selectMiscSettingsError = state => state.MiscellaneousSettingsSlice.error;

export const selectMiscSettingsErrorMessage = state => state.MiscellaneousSettingsSlice.errorMessage;

export const selectMiscSettingsDisableMessagePopUp = state => state.MiscellaneousSettingsSlice.disableMessagePopUp;

export const selectMiscSettingsDisableGifProfiles = state => state.MiscellaneousSettingsSlice.disableGifProfiles;

export const selectMiscSettingsHideChannelBackground = state => state.MiscellaneousSettingsSlice.hideChannelBackground;

export const selectMiscSettingsHideNonVideoParticapents = state => state.MiscellaneousSettingsSlice.hideNonVideoParticapents;

export const selectRoomScale = state => state.MiscellaneousSettingsSlice.roomScale;

export const selectAutoPlayNativeVideos = state => state.MiscellaneousSettingsSlice.autoPlayNativeVideos;

export const selectMuteSocialVideos = state => state.MiscellaneousSettingsSlice.muteSocialVideos;

export const selectActivityStatus = state => state.MiscellaneousSettingsSlice.activity;

export const selectPopOutUserStreams = state => state.MiscellaneousSettingsSlice.popOutUserStreams;

export const {pushPokeNotification, pushSytemNotification, setDefaultServer, changeRoomScale, miscSettingsClearLocalData, miscSettingsToggleHardwareAcceleration, miscSettingsClearError, miscSettingsChannelSpecificStateChange } = MiscellaneousSettingsSlice.actions;


export default MiscellaneousSettingsSlice.reducer;