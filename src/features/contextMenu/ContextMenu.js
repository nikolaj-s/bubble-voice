// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// components
import { CtxButton } from '../../components/buttons/ctxButton/CtxButton';
import { AssignPermissionGroupMenu } from '../../components/AssignPermissionGroupMenu/AssignPermissionGroupMenu'
import { Loading } from '../../components/LoadingComponents/Loading/Loading';
import { CtxMenuTitle } from '../../components/titles/ctxMenuTitle/CtxMenuTitle';

// state
import { clearCtxState, handleChannelCtxState, handleCopyPasteCtxState, handleStreamState, handleUserManagementCtx, selectAssignPermissionsCtxState, selectBanUserCtxState, selectChangingUsersVolumeState, selectChannelSpecificStateSettings, selectContextMenuActive, selectContextMenuCordinates, selectCopyLinkState, selectCopyState, selectCtxAudioState, selectCtxSelectedChannel, selectCtxSelectedChannelName, selectDeleteMesssageState, selectDeleteWidget, selectDisableStream, selectDisableWebCam, selectEditChannelCtxState, selectFlipWebCamState, selectIsOwnerCtxState, selectJoinChannelCtxState, selectKickUser, selectLeaveChannelCtxState, selectMemberId, selectMoveUserState, selectPasteCtxState, selectPokeUser, selectSaveImageState, selectSaveVideoState, selectSeeSimilar, selectSelectedMessage, selectSelectedUserCtxState, selectStopStreamingState, selectStreamVolumeState, selectViewSocialState, setContextMenuOptions, setCtxCordinates, toggleContextMenu } from './contextMenuSlice';
import { assignNewServerGroup, deleteCategory, markWidgetForDeletion, moveUser, selectCurrentChannelId, selectDeletingCategory, selectServerChannels, selectServerGroups, selectServerId, selectServerMembers, selectUsersPermissions, sendDeleteMessageRequest, setChannelSocialId, setEditingChannelId, throwServerError, toggleCreateChannelMenu, toggleMembersWebCamState, triggerRoomRescale, userBanned } from '../server/ServerSlice';
import { addActivityMessage } from '../server/ChannelRoom/ServerDashBoard/ServerDashBoardSlice';

// style
import "./ContextMenu.css";

// socket
import { socket } from '../server/ServerBar/ServerBar';
import { Range } from '../../components/inputs/Range/Range';
import { selectUsername } from '../settings/appSettings/accountSettings/accountSettingsSlice';

// USER PREFS
import { saveUserPrefs, USER_PREFS } from '../../util/LocalData';
import { BoolButton } from '../../components/buttons/BoolButton/BoolButton';
import { miscSettingsChannelSpecificStateChange, selectDisableChannelIcons, selectDisableMediaWidget, selectHideUserStatus, selectMiscSettingsDisableMessagePopUp, selectMiscSettingsHideChannelBackground, selectMiscSettingsHideNonVideoParticapents, selectMuteSocial, selectPopOutUserStreams } from '../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { MoveUser } from '../../components/buttons/MoveUser/MoveUser';
import { selectGlassState, selectPrimaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectSocialSoundEffect, updateSoundEffectsState } from '../settings/soundEffects/soundEffectsSlice';

import { audioCtx } from '../AudioInit/AudioInit';
import { CopyIcon } from '../../components/Icons/CopyIcon/CopyIcon';
import { DeleteIcon } from '../../components/Icons/DeleteIcon/DeleteIcon';
import { SaveIcon } from '../../components/Icons/SaveIcon/SaveIcon';
import { SocialIcon } from '../../components/Icons/SocialIcon/SocialIcon';
import { EditIcon } from '../../components/Icons/EditIcon/EditIcon';
import { BanIcon } from '../../components/Icons/BanIcon/BanIcon';
import { SavesIcon } from '../../components/Icons/SavesIcon/SavesIcon';
import { KickIcon } from '../../components/Icons/KickIcon/KickIcon';
import { PokeIcon } from '../../components/Icons/PokeIcon/PokeIcon';
import { PlayOnWidgetIcon } from '../../components/Icons/PlayOnWidgetIcon/PlayOnWidgetIcon';
import { deleteMedia, saveMedia, selectSavedMedia } from '../SavedMedia/SavedMediaSlice';
import { SavedIcon } from '../../components/Icons/SavedIcon/SavedIcon';
import { selectLoadingNewMedia, setNewMedia, toggleLoadingNewMedia } from '../server/ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice';
import { ImageSearch } from '../../util/ImageSearch';
import { SearchIcon } from '../../components/Icons/SearchIcon/SearchIcon';
import { RequestDeleteMessage } from '../server/SocialSlice';
import { openDirectMessage } from '../Messages/MessagesSlice';

export const ContextMenu = () => {

    const dispatch = useDispatch();

    // local state
    const [origin, setOrigin] = React.useState(false);

    const [selectedImage, setSelectedImage] = React.useState({});

    const [selectedVideo, setSelectedVideo] = React.useState();

    const [streamAudioLevel, setStreamAudioLevel] = React.useState(1);

    const [selectedInput, setSelectedInput] = React.useState();

    const [loading, toggleLoading] = React.useState(false);

    const [selectedWidget, setSelectedWidget] = React.useState();

    const [userVolumeLevel, setUserVolumeLevel] = React.useState(1);

    const [flippedWebCamState, setFlippedWebCamState] = React.useState(false);

    const [disabledWebCamLocalState, toggleDisabledWebCamLocalState] = React.useState(false);

    const [disableStreamLocalState, toggleDisableStreamLocalState] = React.useState(false);

    const [addToMusicWidget, toggleAddToMusicWidget] = React.useState(false);

    const [unSave, toggleUnSave] = React.useState(false);

    const [mediaWidgetState, setMediaWidgetState] = React.useState(false);

    const [hidingChannelIcons, toggleHidingChannelIcons] = React.useState(false);

    const [handleCreateChannelState, toggleHandleCreateChannelState] = React.useState(false);

    const [deleteCategoryState, toggleDeleteCategoryState] = React.useState(false);

    const [selectedCategory, setSelectedCategory] = React.useState(false);

    const [showHideUserStatus, toggleShowHideUserStatus] = React.useState(false);

    const disableMediaWidget = useSelector(selectDisableMediaWidget);

    const loadingNewMedia = useSelector(selectLoadingNewMedia);

    const primaryColor = useSelector(selectPrimaryColor)

    const textColor = useSelector(selectTextColor)

    const ctxCordinates = useSelector(selectContextMenuCordinates);

    const ctxActive = useSelector(selectContextMenuActive);

    const saveImage = useSelector(selectSaveImageState);

    const saveVideo = useSelector(selectSaveVideoState);

    const permissions = useSelector(selectUsersPermissions);

    const permissionGroups = useSelector(selectServerGroups);

    const members = useSelector(selectServerMembers);

    const channels = useSelector(selectServerChannels);
    // channel state
    const viewSocial = useSelector(selectViewSocialState);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const joinChannelState = useSelector(selectJoinChannelCtxState);

    const leaveChannelState = useSelector(selectLeaveChannelCtxState);

    const editChannelState = useSelector(selectEditChannelCtxState);

    const selectedChannel = useSelector(selectCtxSelectedChannel);

    const savedMedia = useSelector(selectSavedMedia);

    const selectedChannelName = useSelector(selectCtxSelectedChannelName);

    const channelSpecificSettingsState = useSelector(selectChannelSpecificStateSettings);

    const disableMessagePopup = useSelector(selectMiscSettingsDisableMessagePopUp);

    const hideChannelBackground = useSelector(selectMiscSettingsHideChannelBackground);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);

    const socialSoundEffect = useSelector(selectSocialSoundEffect);

    const hideUserStatus = useSelector(selectHideUserStatus);

    const seeSimilarImage = useSelector(selectSeeSimilar);

    const serverId = useSelector(selectServerId);

    const popOutUserStreams = useSelector(selectPopOutUserStreams);

    const hideCustomChannelIcons = useSelector(selectDisableChannelIcons);

    const deletingCategory = useSelector(selectDeletingCategory);

    const muteSocial = useSelector(selectMuteSocial);

    // stream management
    const changeStreamVolumeState = useSelector(selectStreamVolumeState);

    const stopStreamingState = useSelector(selectStopStreamingState);

    // user management
    const canBanUser = useSelector(selectBanUserCtxState);

    const selectedUserToManage = useSelector(selectSelectedUserCtxState);

    const assignPermissions = useSelector(selectAssignPermissionsCtxState);

    const isOwnerCtxState = useSelector(selectIsOwnerCtxState);

    const kickUser = useSelector(selectKickUser);

    const pokeUser = useSelector(selectPokeUser);

    const memberId = useSelector(selectMemberId);

    const changeUserVolume = useSelector(selectChangingUsersVolumeState);

    const moveUserState = useSelector(selectMoveUserState);

    const flipWebCamState = useSelector(selectFlipWebCamState);

    const disableWebCameState = useSelector(selectDisableWebCam);

    const disableStreamState = useSelector(selectDisableStream);

    // message
    const deleteMessageState = useSelector(selectDeleteMesssageState);

    const selectedMessage = useSelector(selectSelectedMessage);

    // copy paste state
    const pasteCtxState = useSelector(selectPasteCtxState);

    const copyCtxState = useSelector(selectCopyState);

    const copyLinkState = useSelector(selectCopyLinkState);

    // audio
    const [audioLevel, setAudioLevel] = React.useState(0);

    const audio = useSelector(selectCtxAudioState);

    // widgets
    const deleteWidget = useSelector(selectDeleteWidget);

    // user
    const username = useSelector(selectUsername);

    const glassState = useSelector(selectGlassState);

    React.useEffect(() => {

        const index = savedMedia.findIndex(media => media.media === (selectedImage?.src || selectedVideo?.src));

        if (index !== -1) toggleUnSave(true);

    }, [savedMedia, selectedImage, selectedVideo])

    const handleCtxMenu = React.useCallback((e) => {
        e.preventDefault();
        
        dispatch(clearCtxState());

        toggleAddToMusicWidget(false);

        dispatch(toggleContextMenu(false));

        toggleUnSave(false);

        setMediaWidgetState(false);

        toggleShowHideUserStatus(false);
        
        const path = e.path || (e.composedPath && e.composedPath());
        
        for (const p of path) {
            
            if (p.localName === 'a') {
                dispatch(toggleContextMenu(true));

                dispatch(setContextMenuOptions({state: 'copyLink', value: p.href}))

                if (currentChannelId && p.href.includes('youtu')) {
                    const channel = channels.find(c => c._id === currentChannelId);

                    if (channel) {
                        const has_music_widget = channel.widgets.findIndex(w => w.type === 'music');

                        if (has_music_widget !== -1) {
                            toggleAddToMusicWidget(true);
                        }
                    }
                }
            }

            if (p.className === 'channel-list-outer-container') {
                if (permissions.user_can_manage_channels) {
                    toggleHandleCreateChannelState(true);
                    dispatch(toggleContextMenu(true));
                }
            }

            if (p.className === 'user-status-bar') {
                toggleShowHideUserStatus(true);
                dispatch(toggleContextMenu(true));
            }

            if (p.className === 'music-widget-outer-container' || p.className === 'music-player-overlay-wrapper') {
                dispatch(toggleContextMenu(true));

                setMediaWidgetState(true);
            }
            if (p.className === 'channel-list-button-wrapper') {

                toggleContextMenu(true);

                toggleHidingChannelIcons(true);

                if (permissions?.user_can_manage_channels) {

                    toggleHandleCreateChannelState(true);
                
                }

            }

            if (p.localName === 'img' && p.className !== 'user-image') {

                dispatch(toggleContextMenu(true));

                dispatch(setContextMenuOptions({state: "saveImage", value: true}));

                setSelectedImage(p);

                if (!p.src.includes('cloudinary')) {
                    dispatch(setContextMenuOptions({state: 'copyLink', value: p.src}));
                }

                if (p.id.includes('&tags')) {

                    if (p.id.split('&tags')[1].length < 5) return;

                    dispatch(setContextMenuOptions({state: 'seeSimilar', value: p.id.split('&tags=')[1]}))
                }
            }

            if (p.className?.includes('category')) {
                
                if (permissions.user_can_manage_channels) {
                    dispatch(toggleContextMenu(true));
                    toggleDeleteCategoryState(true);
                    setSelectedCategory(p.id);
                    toggleHandleCreateChannelState(true);
                }
            }

            if (p.className?.split(' ')[0] === 'user-status-container') {

                const memberId = p.className.split(' ')[1].split('-')[0];

                const status = p.className.split(' ')[2].split('-')[1];

                const user = members.find(m => m._id === memberId);

                const isOwner = permissionGroups.findIndex(group => group._id === user.server_group && group.server_group_name === 'Owner')

                if (!user || user.username === username) return;

                dispatch(handleUserManagementCtx({
                    ban: isOwner !== -1 ? false : permissions.user_can_ban_user,
                    perms: isOwner !== -1 ? false : permissions.user_can_manage_server_groups,
                    user: `${user.username}-servergroup-${user.server_group}`,
                    isOwner: isOwner !== -1,
                    poke: (status === 'undefined' || status === 'offline') ? false : true,
                    volume: true,
                    member_id: user._id,
                    move: false
                }))

                const L_USER = USER_PREFS.get(user._id);

                if (L_USER?.volume) {
                    setUserVolumeLevel(L_USER?.volume);
                } else {
                    setUserVolumeLevel(1);
                }

                if (L_USER?.flip_web_cam) {
                    setFlippedWebCamState(L_USER.flip_web_cam);
                } else {
                    setFlippedWebCamState(false);
                }

                if (L_USER?.disabled_web_cam) {
                    toggleDisabledWebCamLocalState(L_USER.disabled_web_cam);
                } else {
                    toggleDisabledWebCamLocalState(false);
                }

                if (L_USER?.disable_stream) {
                    toggleDisableStreamLocalState(L_USER.disable_stream);
                } else {
                    toggleDisableStreamLocalState(false);
                }

                dispatch(toggleContextMenu(true));

            }

            if (p.localName === 'video' && p.className !== 'stream' && p.className !== 'streaming-video-player' && !p.className.includes('stream') && !p.className.includes('videoplayer')) {

                dispatch(toggleContextMenu(true));

                dispatch(setContextMenuOptions({state: 'saveVideo', value: true}))

                setSelectedVideo(p)

                setAudioLevel(p?.volume);

                dispatch(setContextMenuOptions({state: 'copyLink', value: p.src}));
            
            }
            
            if (p.className === 'streaming-video-player-container') {
                try {
                    const id = p.children[2].classList[1];
                    console.log(p.children)
                    if (id) {
                        if (id !== `${username}-streaming-player`) {
                            const L_stream_vol = USER_PREFS.get(id);
                            
                            if (L_stream_vol) {

                                setStreamAudioLevel(L_stream_vol?.stream_volume ? L_stream_vol.stream_volume : 1);

                                toggleDisableStreamLocalState(L_stream_vol?.disable_stream)
                            
                            } else {

                                toggleDisableStreamLocalState(false);

                                setStreamAudioLevel(1);
                            
                            }
                        }

                        dispatch(handleStreamState({
                            stream_volume: id !== `${username}-streaming-player`,
                            disable_stream: id !== `${username}-streaming-player`,
                            stop_streaming: id !== `${username}-streaming-player`,
                            member_id: id === `${username}-streaming-player` ? false : id
                        }))
                    }

                    dispatch(toggleContextMenu(true));
                } catch (error) {
                    console.log(error);
                }  

            }

            if (p.id?.includes('channel-button')) {
                
                const id = p.id.split('-')[2];

                dispatch(toggleContextMenu(true))

                const channel = channels.find(c => c._id === id);
                
                dispatch(handleChannelCtxState({
                    join: channel.text_only ? false : currentChannelId !== id,
                    leave: channel.text_only ? false : currentChannelId === id,
                    edit: permissions.user_can_manage_channels,
                    channel: id,
                    name: p.outerText,
                    social: permissions.user_can_post_channel_social
                }))

            }
            if (p.className === 'manage-member-card') {
                const isOwner = permissionGroups.findIndex(group => group._id === p.id.split('servergroup-')[1] && group.server_group_name === 'Owner')

                if (isOwner !== -1) return;

                dispatch(toggleContextMenu(true));

                dispatch(handleUserManagementCtx({
                    ban: isOwner !== -1 ? false : permissions.user_can_ban_user,
                    perms: isOwner !== -1 ? false : permissions.user_can_manage_server_groups,
                    user: p.id,
                    isOwner: isOwner !== -1
                }))
            }
            if (p?.className?.includes('message-container') && !p?.className.includes('server') || (p?.className?.includes('message--inner-container') && !p?.className.includes('server'))) {
                dispatch(toggleContextMenu(true));
                
                if (!p.className.includes('direct-message-container'))  dispatch(setContextMenuOptions({state: "deleteMessage", value: permissions.user_can_manage_channels}));

                dispatch(setContextMenuOptions({state: 'selectedMessage', value: p.id}));
                
                for (const l_child of p.children[1].className === 'message-inner-container' ? p.children[1].children : p.children) {
                    
                    if (l_child.className === 'message-content-wrapper') {
                        for (const s_child of l_child.children) {
                            if (s_child.className === 'message-image-container') {
                        
                                dispatch(setContextMenuOptions({state: "saveImage", value: true}))
                                
                                setSelectedImage(l_child.children[0].children[0].children[0])
                            }
        
                            if (s_child.className === 'message-outer-video-container') {
                                
                                dispatch(setContextMenuOptions({state: 'saveVideo', value: true}))
                                
                                setSelectedVideo(l_child.children[0].children[0].children[0]);
                            
                            }
                        }
                    }
                    
                    if (l_child.className === 'message-image-container') {
                        
                        dispatch(setContextMenuOptions({state: "saveImage", value: true}))
                
                        setSelectedImage(l_child.children[0].children[0])
                    }

                    if (l_child.className === 'message-outer-video-container') {
                        
                        dispatch(setContextMenuOptions({state: 'saveVideo', value: true}))

                        setSelectedVideo(l_child.children[0].children[0]);
                    
                    }

                    if (l_child.localName === 'a') {

                        dispatch(setContextMenuOptions({state: 'copyLink', value: l_child.href}));

                        if (currentChannelId && l_child.href.includes('youtu')) {
                            const channel = channels.find(c => c._id === currentChannelId);

                            if (channel) {
                                const has_music_widget = channel.widgets.findIndex(w => w.type === 'music');

                                if (has_music_widget !== -1) {
                                    toggleAddToMusicWidget(true);
                                }
                            }
                        }
                    
                    }
                }
            
            }
            if ((p.className === 'text-input' && p.localName === 'input') || p.localName === 'textarea') {
                dispatch(toggleContextMenu(true));

                setSelectedInput(p);

                dispatch(handleCopyPasteCtxState());
            }

            if (p.className?.includes('editing-single-widget')) {
                dispatch(toggleContextMenu(true))

                setSelectedWidget(p.id);

                dispatch(setContextMenuOptions({state: 'deleteWidget', value: true}));

            }

            // handle context for users in channels
            if (p.className?.includes('channel-user-placeholder') || p.className?.includes('active-user-container')) {
                
                const id = p.id.split('-')[0]

                let channel_id = p.id.split('channel-id-')[1]

                // handle selecting channel id on users stream
                if (channel_id === undefined) {

                    channel_id = currentChannelId;

                }

                if (!id) return;

                const user = members.find(user => user._id === id);

                dispatch(toggleContextMenu(true));

                const isOwner = permissionGroups.findIndex(group => group._id === user.server_group && group.server_group_name === 'Owner')
                
                if (user.username === username) {

                    dispatch(setContextMenuOptions({state: 'leaveChannel', value: true}));

                } else {

                    dispatch(setContextMenuOptions({state: 'kickUser', value: isOwner !== -1 ? false : permissions.user_can_kick_user}));
                    
                    dispatch(handleUserManagementCtx({
                        ban: isOwner !== -1 ? false : permissions.user_can_ban_user,
                        perms: isOwner !== -1 ? false : permissions.user_can_manage_server_groups,
                        user: `${user.username}-servergroup-${user.server_group}-channel-id-${channel_id}`,
                        isOwner: isOwner !== -1,
                        poke: true,
                        volume: true,
                        member_id: user._id,
                        move: permissions.user_can_kick_user
                    }))

                    const L_USER = USER_PREFS.get(id);

                    if (L_USER?.volume) {
                        setUserVolumeLevel(L_USER?.volume);
                    } else {
                        setUserVolumeLevel(1);
                    }

                    if (L_USER?.flip_web_cam) {
                        setFlippedWebCamState(L_USER.flip_web_cam);
                    } else {
                        setFlippedWebCamState(false);
                    }

                    if (L_USER?.disabled_web_cam) {
                        toggleDisabledWebCamLocalState(L_USER.disabled_web_cam);
                    } else {
                        toggleDisabledWebCamLocalState(false);
                    }

                    if (L_USER?.disable_stream) {
                        toggleDisableStreamLocalState(L_USER.disable_stream);
                    } else {
                        toggleDisableStreamLocalState(false);
                    }
                }

            }
            
            if (path[0].id === 'live-chat-wrapper' || path[0].id === 'user-streams-wrapper') {
                dispatch(toggleContextMenu(true))

                dispatch(setContextMenuOptions({state: "channelSpecificSettings", value: true}));
            }
            
            
        }  

        if (window.getSelection().toString().length !== 0) {

            dispatch(toggleContextMenu(true));

            dispatch(setContextMenuOptions({state: 'copy', value: window.getSelection().toString()}))
        }
            
        dispatch(setCtxCordinates({x: (e.view.innerWidth - e.pageX) < 400 ? (e.pageX - 200) : e.pageX, y: e.pageY}))

        setOrigin((e.view.innerHeight - e.pageY) < 300 ? true : false)
    // eslint-disable-next-line
    }, [ctxCordinates, ctxActive, permissions, currentChannelId, channels, members])

    const closeCtxMenu = () => {

        dispatch(toggleContextMenu(false));
        dispatch(clearCtxState());
        setSelectedImage({});
        setSelectedVideo({});
        toggleHandleCreateChannelState(false);
        toggleHidingChannelIcons(false);
        setSelectedCategory("");
        toggleDeleteCategoryState(false);
    }

    React.useEffect(() => {
      
        document.addEventListener("contextmenu", handleCtxMenu);

        document.addEventListener('click', closeCtxMenu);
        return () => {
            document.removeEventListener("contextmenu", handleCtxMenu);

            document.removeEventListener("click", closeCtxMenu);
        }
    // eslint-disable-next-line
    }, [permissions, currentChannelId, channels, members])

    // ctx menu actions
    const handleSave = (image) => {

        const src = image ? selectedImage.src : selectedVideo.src;
        console.log(src)
        try {
            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("download", {url: src});
        } catch (error) {
            window.open(src)
        }
       
    }

    const handleJoinChannel = () => {
        document.getElementById(`channel-button-${selectedChannel}`).click();
    }

    const handleLeaveChannel = () => {
        document.getElementById("disconnect-from-channel-button").click();
    }

    const handleEditChannel = () => {
      window.location.hash = window.location.hash + `/server-settings/channels/${selectedChannelName}`

      dispatch(setEditingChannelId(selectedChannel));
    }

    const assignNewPermissionGroup = async (id, user) => {
        
        toggleLoading(true);

        await socket.request('assign server group', {username: user, server_group: id})
        .then(data => {
            dispatch(assignNewServerGroup({username: user, server_group: id}))
            toggleLoading(false);
            closeCtxMenu();
        })
        .catch(error => {
            console.log(error)
            toggleLoading(false)
            closeCtxMenu();
            dispatch(throwServerError({errorMessage: error}));
        })
    }

    const paste = () => {
        
        navigator.clipboard.readText()
        .then(data => {
            selectedInput.value = selectedInput.value + " " + data;

            selectedInput.dispatchEvent(new Event('input', {bubbles: true}));

            selectedInput.focus();
        })

        closeCtxMenu();
    }

    const handleDeleteWidget = () => {

        dispatch(markWidgetForDeletion({widget: selectedWidget}))

        setSelectedWidget();

        closeCtxMenu();

    }

    const handleVolumeChange = (value) => {
        
        setAudioLevel(value);

        selectedVideo.volume = value;
    
    }

    const handleUserVolumeChange = () => {

        let value = userVolumeLevel;

        let obj = {};
        
        const currentUserPrefs = USER_PREFS.get(memberId);
        
        if (currentUserPrefs) {
            obj = {...currentUserPrefs, volume: value}
        } else {
            obj = {volume: value}
        }

        USER_PREFS.set(memberId, obj);

        saveUserPrefs();

        console.log(audioCtx)

        try {

            let el = document.getElementsByClassName(`audio-source-for-user-${memberId}`)[0]
            
            el.volume = value > 1 ? 1 : value;

            el.muted = !el.muted;

            el.muted = !el.muted;

        } catch (error) {
            console.log(error)
        }
    }

    const handleStreamVolumeChange = (value) => {
        try {
            
            setStreamAudioLevel(value);

            let obj = {};

            const currentUserPrefs = USER_PREFS.get(memberId);
            console.log(memberId)
            if (currentUserPrefs) {
                obj = {...currentUserPrefs, stream_volume: value}
            } else {
                obj = {stream_volume: value}
            }

            USER_PREFS.set(memberId, obj);

            saveUserPrefs();

            try {

                let el = document.getElementsByClassName(`${memberId}-stream-audio`)[0];

                el.volume = value > 1 ? 1 : value;

                el.muted = !el.muted;

                el.muted = !el.muted;

            } catch (error) {
                console.log(error)
            }

        } catch (error) {

        }
    }

    const handleFlipWebCamPref = (value) => {
        try {

            let obj = {};

            const currentUserPrefs = USER_PREFS.get(memberId);

            if (currentUserPrefs) {
                obj = {...currentUserPrefs, flip_web_cam: !flippedWebCamState}
            } else {
                obj = {flip_web_cam: !flippedWebCamState}
            }

            

            USER_PREFS.set(memberId, obj);

            saveUserPrefs();
            
            const el = document.getElementById(memberId)

            const video = el.querySelector('video');

            setFlippedWebCamState(!flippedWebCamState);

            if (video) {

                if (video.style.getPropertyValue('transform') === 'scaleX(-1)') {
                    video.style.transform = null;
                } else {
                    video.style.transform = 'scaleX(-1)'
                }
            
            }

        } catch (error) {
          //  dispatch(throwServerError({errorMessage: "error flipping users webcam"}))
        }
    }

    const handleDisableWebCam = async () => {
        try {

            let obj;

            const currentUserPrefs = USER_PREFS.get(memberId);

            if (currentUserPrefs) {
                obj = {...currentUserPrefs, disabled_web_cam: !disabledWebCamLocalState}
            } else {
                obj = {disabled_web_cam: !disabledWebCamLocalState}
            }
            
            USER_PREFS.set(memberId, obj);

            saveUserPrefs();

            const web_cam_el = document.getElementsByClassName(`${memberId}-camera-stream`);

            if (web_cam_el.length > 0) {
                const consumer_id = web_cam_el[0].id;

                if (!disabledWebCamLocalState === true) {

                    web_cam_el[0].style.opacity = 0;

                    await socket.request('pauseConsumer', {consumerId: consumer_id})
                    .catch(error => {
                        dispatch(throwServerError({errorMessage: error.errorMessage}));
                    }) 
                } else {

                    web_cam_el[0].style.opacity = 1;

                    await socket.request('resumeConsumer', {consumerId: consumer_id})
                    .catch(error => {
                        dispatch(throwServerError({errorMessage: error.errorMessage}));
                    }) 
                }

                dispatch(triggerRoomRescale());
            }

            dispatch(toggleMembersWebCamState({id: memberId, value: !disabledWebCamLocalState}));

        } catch (error) {
            dispatch(throwServerError({errorMessage: error.message}))
        }
    }

    const handleDisableStream = async () => {
        try {

            let obj;

            const currentUserPrefs = USER_PREFS.get(memberId);

            if (currentUserPrefs) {
                obj = {...currentUserPrefs, disable_stream: !disableStreamLocalState}
            } else {
                obj = {disable_stream: !disableStreamLocalState}
            }

            USER_PREFS.set(memberId, obj);

            saveUserPrefs();

            const stream = document.getElementsByClassName(`${memberId}-screen-share-stream`);

            const stream_audio = document.getElementsByClassName(`${memberId}-stream-audio`)
            console.log(stream_audio)
            if (stream.length > 0) {

                const consumerId = stream[0].id;

                if (!disableStreamLocalState === true) {
                    await socket.request('pauseConsumer', {consumerId: consumerId})
                    .catch(error => {
                        dispatch(throwServerError({errorMessage: error.errorMessage}));
                    })

                    document.getElementById(`${consumerId}container`).style.display = 'none'

                    
                } else {
                    await socket.request('resumeConsumer', {consumerId: consumerId})
                    .catch(error => {
                        dispatch(throwServerError({errorMessage: error.errorMessage}));
                    })

                    document.getElementById(`${consumerId}container`).style.display = 'flex'
                }

                dispatch(triggerRoomRescale());

            }

            if (stream_audio.length > 0) {

                const consumerId = stream_audio[0].id;

                if (!disableStreamLocalState === true) {
                    await socket.request('pauseConsumer', {consumerId: consumerId})
                    .catch(error => {
                        dispatch(throwServerError({errorMessage: error.errorMessage}));
                    })

                } else {
                    await socket.request('resumeConsumer', {consumerId: consumerId})
                    .catch(error => {
                        dispatch(throwServerError({errorMessage: error.errorMessage}));
                    })
                }

            }

        } catch (error) {
            dispatch(throwServerError({errorMessage: error.message}));
        }
    }

    const handlePokeUser = async () => {
        
        if (memberId) {

            await socket.request('poke', {member_id: memberId})
            .catch(error => {
                dispatch(throwServerError({errorMessage: error}));
            })

        }
    }

    const handleMoveUser = async (arg) => {
        const selected_username = selectedUserToManage.split('-')[0];
        console.log(selected_username)
        const channel_id = selectedUserToManage.split('channel-id-')[1];
        
        if (selected_username && arg) {
            dispatch(moveUser({username: selected_username, channel_id: channel_id, arg: arg}))
        }
    }

    const handleKickUser = async () => {
        try {

            const selected_user = selectedUserToManage.split('-')[0];

            const channel_id = selectedUserToManage.split('channel-id-')[1];

            if (selected_user && channel_id) {

                await socket.request('kick', {channel_id: channel_id, username: selected_user})
                .then(data => {
                    dispatch(addActivityMessage(data))
                })
                .catch(error => {
                    dispatch(throwServerError({errorMessage: error}));
                })

            }
        } catch (error) { 
            console.log(error);
        }
    }

    const handleChannelSpecificStateChange = (state) => {
        dispatch(miscSettingsChannelSpecificStateChange(state));
    }

    const viewSocialFeed = (channeloverideID) => {
        if (channeloverideID) {
            dispatch(setChannelSocialId(channeloverideID));
        } else {
            dispatch(setChannelSocialId(selectedChannel));
        }
        
    }

    const handleToggleSocialSoundEffect = () => {
        dispatch(updateSoundEffectsState({type: "socialSoundEffect", state: !socialSoundEffect}))
    }

    const handleStopStreaming = () => {
        try {
            document.getElementById('screen-share-toggle-button').click()
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleDeleteMessage = async () => {
        try {
            const channel_id = selectedMessage.split('/')[1];

            const message_id = selectedMessage.split('/')[0];

            if (!message_id && !channel_id) return dispatch(throwServerError({errorMessage: "Cannot Delete This Message"}));

            dispatch(RequestDeleteMessage({channel_id: channel_id, message_id: message_id}));

        } catch (error) {
            console.log(error);
            dispatch(throwServerError({errorMessage: error.message}))
        }
    }

    const handleCopy = () => {
        try {

            const { clipboard } = window.require('electron');

            clipboard.writeText(copyCtxState);

        } catch (error) {
            console.log(error);
        }
    }

    const handleCopyLink = () => {
        try {

            const { clipboard } = window.require('electron');

            clipboard.writeText(copyLinkState);

        } catch (error) {
            return;
        }
    }

    const handleBanUser = async () => {
        try {

            const user_to_ban = selectedUserToManage.split('-')[0];

            if (!user_to_ban) return;

            await socket.request('ban', {username: user_to_ban})
            .then(res => {
                
                dispatch(userBanned(res.banData))
            })
            .catch(error => {
                console.log(error)
                dispatch(throwServerError({errorMessage: error}));
            })

        } catch (error) {
            console.log(error)
            dispatch(throwServerError({errorMessage: error.message}));
        }
    }

    const handlePlayOnMusicWidget = async () => {
        console.log(copyLinkState)
        if (copyLinkState.length > 1) {
            await socket.request('add song to queue', {query: copyLinkState})
            .then(response => {

                return;
            
            })
            .catch(error => {
                dispatch(throwServerError({error: true, errorMessage: error}))
            })
            }
        
    }

    const addToSaves = () => {

        let obj;

        if (saveImage) {

            obj = {media: selectedImage.src, type: 'image'}

        } else {

            obj = {media: selectedVideo.src, type: 'video'}

        }

        if (unSave) {
            dispatch(deleteMedia(obj));
        } else {
            dispatch(saveMedia(obj));
        }
        
    }

    const handleFindSimilarImages = async () => {
        try {
            if (loadingNewMedia) return;

            let el = document.getElementsByClassName('server-media-container')[0]

            let searchPanel = document.getElementsByClassName('message-image-search-results-container')[0]

            if (el) el.scrollTop = 0;

            if (searchPanel) searchPanel.scrollTop = 0;
            
            dispatch(toggleLoadingNewMedia(true));

            const images = await ImageSearch(seeSimilarImage, serverId);

            dispatch(toggleLoadingNewMedia(false));

            if (images.error) return dispatch(throwServerError({error: true, errorMessage: images.errorMessage}));

            dispatch(setNewMedia(images.media));
        } catch (err) {
            dispatch(throwServerError({error: true, errorMessage: "Fatal error finding a similar image"}))
        }
    }

    const handleMessageUser = () => {

        if (!selectedUserToManage) return;

        const m_username = selectedUserToManage.split('-')[0];

        const m_info = members.findIndex(u => u.username === m_username);

        if (m_info === -1) return;

        dispatch(openDirectMessage(members[m_info]));

    }

    const openCreateChannelMenu = () => {
        dispatch(toggleCreateChannelMenu(true));
    }

    const handleDeleteCategory = () => {

        if (!selectedCategory) return;

        if (deletingCategory) return;

        dispatch(deleteCategory({category_id: selectedCategory}));

        setSelectedCategory("");
    }

    return (
        <>
        {ctxActive ? 
        <motion.div
        style={{
            top: ctxCordinates.y,
            left: ctxCordinates.x,
            translateY: origin ? '-100%' : (ctxCordinates.y - 300) < 0 ? '0%' : '-50%',
            backgroundColor: glassState ? `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0.5)` : primaryColor,
            backdropFilter: glassState ? 'blur(5px)' : null
        }}
        className='ctx-menu-container'>
            {saveImage ? <CtxButton action={() => {handleSave(true)}} name={"Download Image"} icon={<SaveIcon />} /> : null}
            {seeSimilarImage ? <CtxButton action={handleFindSimilarImages} name={"Find Similar"} icon={<SearchIcon />}  /> : null}
            {saveVideo ? <CtxButton action={() => {handleSave(false)}} name={"Download Video"} icon={<SaveIcon />} /> : null}
            {saveImage || saveVideo ? <CtxButton action={() => {addToSaves()}} name={unSave ? "Unsave" : "Save"} icon={unSave ? <SavedIcon /> : <SavesIcon />} /> : null}
            {pasteCtxState ? <CtxButton name={"Paste"} action={paste} /> : null}
            {copyCtxState ? <CtxButton name={"Copy"} action={handleCopy} icon={<CopyIcon />} /> : null}
            {copyLinkState ? <CtxButton name="Copy Link" action={handleCopyLink} icon={<CopyIcon />} /> : null}
            {joinChannelState ? <CtxButton action={handleJoinChannel} name={"Join Channel"} /> : null}
            {leaveChannelState ? <CtxButton action={handleLeaveChannel} name={'Leave Channel'} /> : null}
            {editChannelState ? <CtxButton action={handleEditChannel} name={"Edit Channel"} icon={<EditIcon />} /> : null}
            {viewSocial ? <CtxButton action={() => {viewSocialFeed(null)}}  name={"Open"} icon={<SocialIcon color={textColor} />} /> : null}
            {assignPermissions ? <AssignPermissionGroupMenu rightPos={ctxCordinates.x} action={assignNewPermissionGroup} permission_groups={permissionGroups} current_permission_group={selectedUserToManage.split('-channel')[0]}  /> : null}
            {audio ? 
            <>
            <CtxMenuTitle title={"Change Volume"} />
            <Range action={handleVolumeChange} fill={false} value={audioLevel} max={1} min={0} step={0.01} />
            </>
             : null}
            {changeUserVolume ? 
            <>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <CtxMenuTitle title={"Change User Volume"} />
                <p style={{color: textColor, fontSize: '0.8rem', margin: "0 5px 0 0"}} >{Math.floor(userVolumeLevel * 100)}%</p>
            </div>
            <Range invert={true} save={handleUserVolumeChange} action={(value) => setUserVolumeLevel(value)} step={0.01} value={userVolumeLevel} fill={false} max={2} min={0} /> 
            </>
            : null}
            {changeStreamVolumeState ? <CtxMenuTitle title={"Change Stream Volume"} /> : null}
            {changeStreamVolumeState ? <Range invert={true} value={streamAudioLevel} action={handleStreamVolumeChange} fill={false} max={3.4} min={0} step={0.01} /> : null}
            {flipWebCamState ? <BoolButton name={"Flip Web Cam"} state={flippedWebCamState} action={handleFlipWebCamPref} /> : null}
            {disableWebCameState ? <BoolButton name={"Disable Webcam"} state={disabledWebCamLocalState} action={handleDisableWebCam} /> : null}
            {disableStreamState ? <BoolButton name={"Disable Stream"} state={disableStreamLocalState} action={handleDisableStream} /> : null}
            {deleteWidget ? <CtxButton action={handleDeleteWidget} name={"Delete Widget"} icon={<DeleteIcon />} /> : null}
            {moveUserState ? <MoveUser top={ctxCordinates.y} left={ctxCordinates.x} move={handleMoveUser} /> : null}
            {kickUser ? <CtxButton name="Kick" action={handleKickUser} icon={<KickIcon />} /> : null}
            {pokeUser ? <CtxButton name="Poke" action={handlePokeUser} icon={<PokeIcon />} /> : null}
            {pokeUser ? <CtxButton action={handleMessageUser} name="Message" icon={<SocialIcon />} /> : null}
            {canBanUser ? <CtxButton action={handleBanUser} name={"Ban"} icon={<BanIcon />}/> : null}
            {channelSpecificSettingsState ? <CtxMenuTitle title={"Room Preferences"} /> : null}
            {channelSpecificSettingsState ? <BoolButton action={() => {handleChannelSpecificStateChange("hideChannelBackground")}} state={hideChannelBackground} name={"Hide Channel Background"} /> : null}
            {channelSpecificSettingsState ? <BoolButton action={() => {handleChannelSpecificStateChange("hideNonVideoParticapents")}} state={hideNonVideoParticapents} name={"Hide Non Video Participants"} /> : null}
            {channelSpecificSettingsState ? <BoolButton name={"Mute Social"} action={() => {handleChannelSpecificStateChange("muteSocial")}} state={muteSocial} /> : null}
            {channelSpecificSettingsState || showHideUserStatus ? <BoolButton action={() => {handleChannelSpecificStateChange("hideUserStatus")}} state={hideUserStatus} name={"Hide User Status"} /> : null}
            {channelSpecificSettingsState || mediaWidgetState ? <BoolButton action={() => {handleChannelSpecificStateChange('disableMediaWidget')}} state={disableMediaWidget} name={"Hide Media Widget"} /> : null}
            {channelSpecificSettingsState ? <div
            style={{
                width: '100%',
                height: 2,
                backgroundColor: textColor,
                margin: "4px 0px",
                opacity: 0.5
            }}
            /> : null}
            {channelSpecificSettingsState && permissions?.user_can_view_channel_content ? <CtxButton icon={<SocialIcon />} name={"Open Social"} action={() => {viewSocialFeed(currentChannelId)}} /> : null}
            {handleCreateChannelState ? <CtxButton name="Create Channel / Category" action={openCreateChannelMenu} /> : null}
            {hidingChannelIcons ? <CtxButton action={() => {handleChannelSpecificStateChange('disableChannelIcons')}} name={`${hideCustomChannelIcons ? "Show" : "Hide"} Custom Channel Icons`} /> : null}
            {addToMusicWidget ? <CtxButton action={handlePlayOnMusicWidget} name="Play On Music Widget" icon={<PlayOnWidgetIcon />}/> : null}
            {stopStreamingState ? <CtxButton action={handleStopStreaming} name={"Stop Streaming"} /> : null}
            {deleteMessageState ? <CtxButton action={handleDeleteMessage} name={"Delete Message"} icon={<DeleteIcon />} /> : null}
            {deleteCategoryState ? <CtxButton action={handleDeleteCategory} icon={<DeleteIcon />} name={"Delete Category"} /> : null}
            <Loading loading={loading} />
        </motion.div>
        : null}
        </>
    )
}
