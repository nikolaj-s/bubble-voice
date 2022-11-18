import { createSlice } from "@reduxjs/toolkit";


const contextMenuSlice = createSlice({
    name: 'contextMenuSlice',
    initialState: {
        cordinates: {x: 0, y: 0},
        contextMenuActive: false,
        saveImage: false,
        saveVideo: false,
        // channel ctx state
        joinChannel: false,
        leaveChannel: false,
        editChannel: false,
        selectedChannel: "",
        selectedChannelName: "",
        viewSocial: false,
        // stream management state
        stream_volume: false,
        stop_streaming: false,
        // user management state
        banUser: false,
        assignPermissions: false,
        selectedUser: "",
        isOwner: false,
        kickUser: false,
        pokeUser: false,
        changeVolume: false,
        _id: "",
        move: false,
        flipWebCam: false,
        // copy && paste
        copy: false,
        paste: false,
        // audio level
        audio: false,
        // widgets
        deleteWidget: false,
        // channel specific settings
        channelSpecificSettings: false,
        // message state
        deleteMessage: false,
        selectedMessage: "",
    },
    reducers: {
        setContextMenuOptions: (state, action) => {
            state[action.payload.state] = action.payload.value;
        },
        setCtxCordinates: (state, action) => {
            state.cordinates = action.payload;
        },
        toggleContextMenu: (state, action) => {
            state.contextMenuActive = action.payload;
        },
        handleStreamState: (state, action) => {
            state.stream_volume = action.payload.stream_volume;
            state.stop_streaming = action.payload.stop_streaming;
            state._id = action.payload.member_id;
        },
        clearCtxState: (state, action) => {
            state.saveImage = false;
            state.joinChannel = false;
            state.leaveChannel = false;
            state.editChannel = false;
            state.selectedChannel = "";
            state.selectedChannelName = "";
            state.saveVideo = false;
            state.banUser = false;
            state.assignPermissions = false;
            state.selectedUser = "";
            state.isOwner = false;
            state.copy = false;
            state.paste = false;
            state.audio = false;
            state.deleteWidget = false;
            state.kickUser = false;
            state.pokeUser = false;
            state.changeVolume = false;
            state._id = "";
            state.channelSpecificSettings = false;
            state.move = false;
            state.viewSocial = false;
            state.flipWebCam = false;
            state.stream_volume = false;
            state.stop_streaming = false;
            state.deleteMessage = false;
            state.selectedMessage = "";
            state.copy = false;
        },
        handleChannelCtxState: (state, action) => {
            state.joinChannel = action.payload.join;
            state.leaveChannel = action.payload.leave;
            state.editChannel = action.payload.edit;
            state.selectedChannel = action.payload.channel;
            state.selectedChannelName = action.payload.name;
            state.viewSocial = action.payload.social;
        },
        handleUserManagementCtx: (state, action) => {
            state.banUser = action.payload.ban;
            state.assignPermissions = action.payload.perms;
            state.selectedUser = action.payload.user;
            state.isOwner = action.payload.isOwner;
            state.pokeUser = action.payload.poke;
            state.changeVolume = action.payload.volume;
            state._id = action.payload.member_id;
            state.move = action.payload.move;
            state.flipWebCam = true;
        },
        handleCopyPasteCtxState: (state, action) => {
            state.paste = true;
        }
    }
})

// selectors
export const selectDeleteMesssageState = state => state.contextMenuSlice.deleteMessage;

export const selectSelectedMessage = state => state.contextMenuSlice.selectedMessage;

export const selectContextMenuCordinates = state => state.contextMenuSlice.cordinates;

export const selectContextMenuActive = state => state.contextMenuSlice.contextMenuActive;

export const selectSaveImageState = state => state.contextMenuSlice.saveImage;

export const selectSaveVideoState = state => state.contextMenuSlice.saveVideo;

export const selectJoinChannelCtxState = state => state.contextMenuSlice.joinChannel;

export const selectLeaveChannelCtxState = state => state.contextMenuSlice.leaveChannel;

export const selectEditChannelCtxState = state => state.contextMenuSlice.editChannel;

export const selectCtxSelectedChannel = state => state.contextMenuSlice.selectedChannel;

export const selectCtxSelectedChannelName = state => state.contextMenuSlice.selectedChannelName;

export const selectBanUserCtxState = state => state.contextMenuSlice.banUser;

export const selectAssignPermissionsCtxState = state => state.contextMenuSlice.assignPermissions;

export const selectSelectedUserCtxState = state => state.contextMenuSlice.selectedUser;

export const selectIsOwnerCtxState = state => state.contextMenuSlice.isOwner;

export const selectPasteCtxState = state => state.contextMenuSlice.paste;

export const selectCtxAudioState = state => state.contextMenuSlice.audio;

export const selectDeleteWidget = state => state.contextMenuSlice.deleteWidget;

export const selectKickUser = state => state.contextMenuSlice.kickUser;

export const selectPokeUser = state => state.contextMenuSlice.pokeUser;

export const selectChangingUsersVolumeState = state => state.contextMenuSlice.changeVolume;

export const selectMemberId = state => state.contextMenuSlice._id;

export const selectChannelSpecificStateSettings = state => state.contextMenuSlice.channelSpecificSettings;

export const selectMoveUserState = state => state.contextMenuSlice.move;

export const selectViewSocialState = state => state.contextMenuSlice.viewSocial;

export const selectFlipWebCamState = state => state.contextMenuSlice.flipWebCam;

export const selectStopStreamingState = state => state.contextMenuSlice.stop_streaming;

export const selectStreamVolumeState = state => state.contextMenuSlice.stream_volume;

export const selectCopyState = state => state.contextMenuSlice.copy;

// actions
export const { handleStreamState, handleCopyPasteCtxState, handleUserManagementCtx, handleChannelCtxState, clearCtxState, setContextMenuOptions, setCtxCordinates, toggleContextMenu } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;