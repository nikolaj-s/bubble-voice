// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// components
import { CtxButton } from '../../components/buttons/ctxButton/CtxButton';
import { CtxMenuPlaceHolder } from '../../components/titles/ctxMenuPlaceHolder/CtxMenuPlaceHolder'
import { AssignPermissionGroupMenu } from '../../components/AssignPermissionGroupMenu/AssignPermissionGroupMenu'
import { Loading } from '../../components/LoadingComponents/Loading/Loading';
import { CtxMenuTitle } from '../../components/titles/ctxMenuTitle/CtxMenuTitle';

// state
import { clearCtxState, handleChannelCtxState, handleCopyPasteCtxState, handleStreamState, handleUserManagementCtx, selectAssignPermissionsCtxState, selectBanUserCtxState, selectChangingUsersVolumeState, selectChannelSpecificStateSettings, selectContextMenuActive, selectContextMenuCordinates, selectCtxAudioState, selectCtxSelectedChannel, selectCtxSelectedChannelName, selectDeleteMesssageState, selectDeleteWidget, selectEditChannelCtxState, selectFlipWebCamState, selectIsOwnerCtxState, selectJoinChannelCtxState, selectKickUser, selectLeaveChannelCtxState, selectMemberId, selectMoveUserState, selectPasteCtxState, selectPokeUser, selectSaveImageState, selectSaveVideoState, selectSelectedMessage, selectSelectedUserCtxState, selectStopStreamingState, selectStreamVolumeState, selectViewSocialState, setContextMenuOptions, setCtxCordinates, toggleContextMenu } from './contextMenuSlice';
import { assignNewServerGroup, deleteMessage, markWidgetForDeletion, selectCurrentChannelId, selectServerChannels, selectServerGroups, selectServerMembers, selectUsersPermissions, setChannelSocialId, setEditingChannelId, throwServerError } from '../server/ServerSlice';

// style
import "./ContextMenu.css";

// socket
import { socket } from '../server/ServerBar/ServerBar';
import { Range } from '../../components/inputs/Range/Range';
import { selectUsername } from '../settings/appSettings/accountSettings/accountSettingsSlice';

// USER PREFS
import { saveUserPrefs, USER_PREFS } from '../../util/LocalData';
import { BoolButton } from '../../components/buttons/BoolButton/BoolButton';
import { miscSettingsChannelSpecificStateChange, selectMiscSettingsDisableMessagePopUp, selectMiscSettingsHideChannelBackground, selectMiscSettingsHideNonVideoParticapents } from '../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { MoveUser } from '../../components/buttons/MoveUser/MoveUser';
import { selectPrimaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectSocialSoundEffect, updateSoundEffectsState } from '../settings/soundEffects/soundEffectsSlice';

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

    const primaryColor = useSelector(selectPrimaryColor)

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

    const selectedChannelName = useSelector(selectCtxSelectedChannelName);

    const channelSpecificSettingsState = useSelector(selectChannelSpecificStateSettings);

    const disableMessagePopup = useSelector(selectMiscSettingsDisableMessagePopUp);

    const hideChannelBackground = useSelector(selectMiscSettingsHideChannelBackground);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);

    const socialSoundEffect = useSelector(selectSocialSoundEffect);

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

    // message
    const deleteMessageState = useSelector(selectDeleteMesssageState);

    const selectedMessage = useSelector(selectSelectedMessage);

    // copy paste state
    const pasteCtxState = useSelector(selectPasteCtxState);

    // audio
    const [audioLevel, setAudioLevel] = React.useState(0);

    const audio = useSelector(selectCtxAudioState);

    // widgets
    const deleteWidget = useSelector(selectDeleteWidget);

    // user
    const username = useSelector(selectUsername);

    const handleCtxMenu = React.useCallback((e) => {
        e.preventDefault();
        dispatch(clearCtxState());
        dispatch(toggleContextMenu(false));

        
        for (const p of e.path) {
            
            if (p.localName === 'img') {
                dispatch(toggleContextMenu(true))
                dispatch(setContextMenuOptions({state: "saveImage", value: true}))
                setSelectedImage(p)
            }
            if (p.localName === 'video' && p.className !== 'stream' && p.className !== 'streaming-video-player' && !p.className.includes('stream') && !p.className.includes('videoplayer')) {

                dispatch(toggleContextMenu(true));

                dispatch(setContextMenuOptions({state: 'saveVideo', value: true}))

                setSelectedVideo(p)

                setAudioLevel(p?.volume);
            
            }

            if (p.className === 'streaming-video-player-container' || p.className === 'streaming-video-player') {
                try {
                    const id = p.children[0].classList[1];

                    if (id) {
                        if (id !== `${username}-streaming-player`) {
                            const L_stream_vol = USER_PREFS.get(id);
                            console.log(L_stream_vol)
                            if (L_stream_vol) {

                                setStreamAudioLevel(L_stream_vol?.stream_volume ? L_stream_vol.stream_volume : 1);

                            } else {

                                setStreamAudioLevel(1);
                            
                            }
                        }

                        dispatch(handleStreamState({
                            stream_volume: id !== `${username}-streaming-player`,
                            stop_streaming: id === `${username}-streaming-player`,
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
                
                dispatch(handleChannelCtxState({
                    join: currentChannelId !== id,
                    leave: currentChannelId === id,
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
            if (p.className === 'message-container') {
                dispatch(toggleContextMenu(true));
                
                dispatch(setContextMenuOptions({state: "deleteMessage", value: permissions.user_can_manage_channels}));

                dispatch(setContextMenuOptions({state: 'selectedMessage', value: p.id}));
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

                    const USER_VOLUME = USER_PREFS.get(id);

                    if (USER_VOLUME?.volume) {
                        setUserVolumeLevel(USER_VOLUME?.volume);
                    } else {
                        setUserVolumeLevel(1);
                    }

                    if (USER_VOLUME?.flip_web_cam) {
                        setFlippedWebCamState(USER_VOLUME.flip_web_cam);
                    } else {
                        setFlippedWebCamState(false);
                    }
                }

            }
            if (e.path[0].id === 'live-chat-wrapper' || e.path[0].id === 'user-streams-wrapper') {
                dispatch(toggleContextMenu(true))

                dispatch(setContextMenuOptions({state: "channelSpecificSettings", value: true}));
            }
  
        }  
            
        dispatch(setCtxCordinates({x: (e.view.innerWidth - e.pageX) < 400 ? (e.pageX - 300) : e.pageX, y: e.pageY}))

        setOrigin((e.view.innerHeight - e.pageY) < 300 ? true : false)
    // eslint-disable-next-line
    }, [ctxCordinates, ctxActive, permissions, currentChannelId, channels, members])

    const closeCtxMenu = () => {

        dispatch(toggleContextMenu(false));
        dispatch(clearCtxState());
        setSelectedImage({});
        setSelectedVideo({});
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
            selectedInput.value = data;

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

    const handleUserVolumeChange = (value) => {

        setUserVolumeLevel(value);

        let obj = {};
        
        const currentUserPrefs = USER_PREFS.get(memberId);
        
        if (currentUserPrefs) {
            obj = {...currentUserPrefs, volume: value}
        } else {
            obj = {volume: value}
        }

        USER_PREFS.set(memberId, obj);

        saveUserPrefs();

        try {
            document.getElementsByClassName(`audio-source-for-user-${memberId}`)[0].volume = value;
        } catch (error) {
            
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
                document.getElementsByClassName(`${memberId}-stream-audio`)[0].volume = value;
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
            
            if (video) {

                if (video.style.getPropertyValue('transform') === 'scaleX(-1)') {
                    video.style.transform = null;
                } else {
                    video.style.transform = 'scaleX(-1)'
                }
            
            }

            setFlippedWebCamState(!flippedWebCamState);
        } catch (error) {
            dispatch(throwServerError({errorMessage: "error flipping users webcam"}))
        }
    }

    const handlePokeUser = async () => {
        
        const selected_username = selectedUserToManage.split('-')[0];

        const channel_id = selectedUserToManage.split('channel-id-')[1];
        
        if (selected_username && channel_id) {

            await socket.request('poke', {channel_id: channel_id, username: selected_username})
            .catch(error => {
                dispatch(throwServerError({errorMessage: error}));
            })

        }
    }

    const handleMoveUser = async (arg) => {
        const selected_username = selectedUserToManage.split('-')[0];

        const channel_id = selectedUserToManage.split('channel-id-')[1];
        
        if (selected_username && arg) {
            await socket.request('move user', {channel_id: channel_id, username: selected_username, to_move: arg})
            .catch(error => {
                dispatch(throwServerError({errorMessage: error}));
            })
        }
    }

    const handleKickUser = async () => {
        try {

            const selected_user = selectedUserToManage.split('-')[0];

            const channel_id = selectedUserToManage.split('channel-id-')[1];

            if (selected_user && channel_id) {

                await socket.request('kick', {channel_id: channel_id, username: selected_user})
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

    const viewSocialFeed = () => {
        dispatch(setChannelSocialId(selectedChannel));
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

            await socket.request('delete message', {channel_id: channel_id, message_id: message_id})
            .then(result => {
                
                dispatch(deleteMessage({message_id: result.message_id, channel_id: result.channel_id}));

            })
            .catch(error => {
                console.log(error)
                dispatch(throwServerError({errorMessage: error.errorMessage}));
            })

        } catch (error) {
            console.log(error);
            dispatch(throwServerError({errorMessage: error.message}))
        }
    }

    return (
        <>
        {ctxActive ? 
        <motion.div
        style={{
            top: ctxCordinates.y,
            left: ctxCordinates.x,
            translateY: origin ? '-100%' : (ctxCordinates.y - 300) < 0 ? '0%' : '-50%',
            backgroundColor: primaryColor
        }}
        className='ctx-menu-container'>
            {saveImage ? <CtxButton action={() => {handleSave(true)}} name={"Save Image"} /> : null}
            {saveVideo ? <CtxButton action={() => {handleSave(false)}} name={"Save Video"} /> : null}
            {pasteCtxState ? <CtxButton name={"Paste"} action={paste} /> : null}
            {joinChannelState ? <CtxButton action={handleJoinChannel} name={"Join Channel"} /> : null}
            {leaveChannelState ? <CtxButton action={handleLeaveChannel} name={'Leave Channel'} /> : null}
            {editChannelState ? <CtxButton action={handleEditChannel} name={"Edit Channel"} /> : null}
            {viewSocial ? <CtxButton action={viewSocialFeed} name={"Social"} /> : null}
            {isOwnerCtxState ? <CtxMenuPlaceHolder name={"Server Owner"} /> : null}
            {assignPermissions ? <AssignPermissionGroupMenu action={assignNewPermissionGroup} permission_groups={permissionGroups} current_permission_group={selectedUserToManage.split('-channel')[0]}  /> : null}
            {audio ? 
            <>
            <CtxMenuTitle title={"Change Volume"} />
            <Range action={handleVolumeChange} fill={true} value={audioLevel} max={1} min={0} step={0.01} />
            </>
             : null}
            {changeUserVolume ? 
            <>
            <CtxMenuTitle title={"Change User Volume"} />
            <Range action={handleUserVolumeChange} step={0.005} value={userVolumeLevel} fill={true} /> 
            </>
            : null}
            {flipWebCamState ? <BoolButton name={"Flip Web Cam"} state={flippedWebCamState} action={handleFlipWebCamPref} /> : null}
            {deleteWidget ? <CtxButton action={handleDeleteWidget} name={"Delete Widget"} /> : null}
            {moveUserState ? <MoveUser move={handleMoveUser} /> : null}
            {kickUser ? <CtxButton name="Kick User" action={handleKickUser} /> : null}
            {pokeUser ? <CtxButton name="Poke User" action={handlePokeUser} /> : null}
            {canBanUser ? <CtxButton name={"Ban User"} /> : null}
            {channelSpecificSettingsState ? <CtxMenuTitle title={"Room Preferences"} /> : null}
            {channelSpecificSettingsState ? <BoolButton action={() => {handleChannelSpecificStateChange("hideChannelBackground")}} state={hideChannelBackground} name={"Hide Channel Background"} /> : null}
            {channelSpecificSettingsState ? <BoolButton action={() => {handleChannelSpecificStateChange("hideNonVideoParticapents")}} state={hideNonVideoParticapents} name={"Hide Non Video Participants"} /> : null}
            {channelSpecificSettingsState ? <BoolButton action={() => {handleChannelSpecificStateChange("disableMessagePopUp")}} state={disableMessagePopup} name={"Disable Message Overlay"} /> : null}
            {channelSpecificSettingsState ? <BoolButton action={handleToggleSocialSoundEffect} state={socialSoundEffect} name="Enable Social Sound Effect" /> : null}
            {changeStreamVolumeState ? <CtxMenuTitle title={"Change Stream Volume"} /> : null}
            {changeStreamVolumeState ? <Range value={streamAudioLevel} action={handleStreamVolumeChange} fill={true} max={1} min={0} step={0.01} /> : null}
            {stopStreamingState ? <CtxButton action={handleStopStreaming} name={"Stop Streaming"} /> : null}
            {deleteMessageState ? <CtxButton action={handleDeleteMessage} name={"Delete Message"} /> : null}
            <Loading loading={loading} />
        </motion.div>
        : null}
        </>
    )
}
