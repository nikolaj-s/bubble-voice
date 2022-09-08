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
        // user management state
        banUser: false,
        assignPermissions: false,
        selectedUser: "",
        isOwner: false,
        kickUser: false,
        pokeUser: false,
        changeVolume: false,
        _id: "",
        // copy && paste
        copy: false,
        paste: false,
        // audio level
        audio: false,
        // widgets
        deleteWidget: false,
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
        },
        handleChannelCtxState: (state, action) => {
            state.joinChannel = action.payload.join;
            state.leaveChannel = action.payload.leave;
            state.editChannel = action.payload.edit;
            state.selectedChannel = action.payload.channel;
            state.selectedChannelName = action.payload.name;
        },
        handleUserManagementCtx: (state, action) => {
            state.banUser = action.payload.ban;
            state.assignPermissions = action.payload.perms;
            state.selectedUser = action.payload.user;
            state.isOwner = action.payload.isOwner;
            state.pokeUser = action.payload.poke;
            state.changeVolume = action.payload.volume;
            state._id = action.payload.member_id;
        },
        handleCopyPasteCtxState: (state, action) => {
            state.paste = true;
        }
    }
})

// selectors
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

// actions
export const { handleCopyPasteCtxState, handleUserManagementCtx, handleChannelCtxState, clearCtxState, setContextMenuOptions, setCtxCordinates, toggleContextMenu } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;