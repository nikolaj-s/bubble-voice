import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearLocalData, fetchHardWareAcceleration, fetchSavedLocalData, saveHardwareAcceleration, saveLocalData } from "../../../../util/LocalData";
import { BuildSystemNotification } from "../../../../util/BuildSytemNotification";

export const fetchMiscellaneousSettings = createAsyncThunk(
    'fetchMiscellaneousSettings/MiscellaneousSettingsSLice',
    async (_, { rejectWithValue}) => {
        try {

            const data = await fetchSavedLocalData("MISC", "MISCSETTINGS");

            if (data?.error || !data) {
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

            if (data?.error || !data) return rejectWithValue({error: true});

            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true})
        }
    }
)

export const pushSytemNotification = createAsyncThunk(
    'pushSytemNotification/MiscellaneousSettingsSlice',
    async (data, {rejectWithValue, getState}) => {
        try {
            if (data.type === 'status' && data?.content?.text.includes('offline')) return;

            const {disableSystemNotifications, disableNsfwBlur} = getState().MiscellaneousSettingsSlice;

            if (disableSystemNotifications) return;

            const { members, current_channel_id, selectedChannelSocial, channels } = getState().serverSlice;

            if (data.channel_id && (data.channel_id === current_channel_id || data.channel_id === selectedChannelSocial)) return;

            const {textColor, secondaryColor, glassColor} = getState().appearanceSettingsSlice;

            const ipcRenderer = window.require('electron').ipcRenderer;
            
            const member = members.find(u => u.username === data.username);

            const channel = channels.find(c => c._id === data.channel_id);
            
            if (channel?.auth === false && data.channel_id) return;

            if (member) {

                let msg = {...data, display_name: member.display_name, user_image: member.user_image, textColor: textColor, secondaryColor: secondaryColor, shape: member.profile_picture_shape, channel_name: channel?.channel_name, user_color: member.color, glassColor: glassColor, disableNsfwBlur: disableNsfwBlur}
                
                let notif = BuildSystemNotification(msg);
                console.log(notif)
                ipcRenderer.send('push notification', notif);
            }
        } catch (error) {
            console.log(error)
            return;
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
        popOutUserStreams: false,
        autoPlayNativeVideos: true,
        defaultServer: {label: "Default", id: ""},
        roomScale: 1,
        enabledSystemNotifications: true,
        muteSocialVideos: true,
        activity: false,
        disableTransparancyEffects: false,
        disableMediaWidget: false,
        disableBeingPoked: false,
        videoVolume: 0.5,
        showFullResPreviews: false,
        disableChannelIcons: false,
        disableSystemNotifications: false,
        hideLinksOnMedia: false,
        hideProfileImagesOnMessages: false,
        maximizeMediaSize: false,
        focused: true,
        hideCustomChannelIcons: false,
        webVersion: false,
        disableNsfwWarning: false,
        disableNsfwBlur: false
    },
    reducers: {
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
                ...state
            }

            saveLocalData("MISC", "MISCSETTINGS", obj);
        },
        setVideoVolume: (state, action) => {
            state.videoVolume = action.payload;
        },
        setDefaultServer: (state, action) => {

            state.defaultServer = action.payload;

            const obj = {
                ...state
            }

            saveLocalData("MISC", "MISCSETTINGS", obj);
        },
        changeRoomScale: (state, action) => {
            state.roomScale = action.payload;
        },
        toggleAppFocus: (state, action) => {
            state.focused = action.payload;
        },
        toggleWebVersion: (state, action) => {
            state.webVersion = action.payload;
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

            if (saved_data.disableMediaWidget) state.disableMediaWidget = true;
            
            if (saved_data.defaultServer) state.defaultServer = saved_data.defaultServer;
            
            if (saved_data.enabledSystemNotifications !== (undefined && null)) state.enabledSystemNotifications = saved_data.enabledSystemNotifications;
            
            if (saved_data.activity) state.activity = true;

            if (saved_data.disableTransparancyEffects) state.disableTransparancyEffects = true;

            if (saved_data.showFullResPreviews) state.showFullResPreviews = true;

            if (saved_data.hideCustomChannelIcons) state.hideCustomChannelIcons = true;

            if (saved_data.disableChannelIcons) state.disableChannelIcons = true;

            if (saved_data.disableSystemNotifications) state.disableSystemNotifications = true;
            
            if (saved_data.popOutUserStreams) state.popOutUserStreams = true;

            if (saved_data.hideProfileImagesOnMessages) state.hideProfileImagesOnMessages = true;

            if (saved_data.maximizeMediaSize) state.maximizeMediaSize = true;

            if (saved_data.hideLinksOnMedia) state.hideLinksOnMedia = true;

            if (saved_data.disableNsfwWarning) state.disableNsfwWarning = true;

            if (saved_data.disableNsfwBlur) state.disableNsfwBlur = true;
        }
    }
})

export const selectSystemNotifcations = state => state.MiscellaneousSettingsSlice.disableSystemNotifications;

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

export const selectDisableTransparancyEffects = state => state.MiscellaneousSettingsSlice.disableTransparancyEffects;

export const selectDisableMediaWidget = state => state.MiscellaneousSettingsSlice.disableMediaWidget;

export const selectVideoVolume = state => state.MiscellaneousSettingsSlice.videoVolume;

export const selectShowFullResPreviews = state => state.MiscellaneousSettingsSlice.showFullResPreviews;

export const selectDisableChannelIcons = state => state.MiscellaneousSettingsSlice.disableChannelIcons;

export const selectHideLinksOnMedia = state => state.MiscellaneousSettingsSlice.hideLinksOnMedia;

export const selectMaximizeMedia = state => state.MiscellaneousSettingsSlice.maximizeMediaSize;

export const selectHideProfileImagesOnMessages = state => state.MiscellaneousSettingsSlice.hideProfileImagesOnMessages;

export const selectAppFocusedState = state => state.MiscellaneousSettingsSlice.focused;

export const selectHideCustomChannelIcons = state => state.MiscellaneousSettingsSlice.hideCustomChannelIcons;

export const selectWebVersion = state => state.MiscellaneousSettingsSlice.webVersion;

export const selectDisableNsfwWarning = state => state.MiscellaneousSettingsSlice.disableNsfwWarning;

export const selectDisableNsfwBlur = state => state.MiscellaneousSettingsSlice.disableNsfwBlur;

export const { toggleWebVersion,toggleAppFocus, setVideoVolume, pushPokeNotification, setDefaultServer, changeRoomScale, miscSettingsClearLocalData, miscSettingsToggleHardwareAcceleration, miscSettingsClearError, miscSettingsChannelSpecificStateChange } = MiscellaneousSettingsSlice.actions;

export default MiscellaneousSettingsSlice.reducer;