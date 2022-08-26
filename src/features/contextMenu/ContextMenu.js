// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// components
import { CtxButton } from '../../components/buttons/ctxButton/CtxButton';
import { CtxMenuPlaceHolder } from '../../components/titles/ctxMenuPlaceHolder/CtxMenuPlaceHolder'
import { AssignPermissionGroupMenu } from '../../components/AssignPermissionGroupMenu/AssignPermissionGroupMenu'
import { Loading } from '../../components/LoadingComponents/Loading/Loading';

// state
import { clearCtxState, handleChannelCtxState, handleCopyPasteCtxState, handleUserManagementCtx, selectAssignPermissionsCtxState, selectBanUserCtxState, selectChangingUsersVolumeState, selectContextMenuActive, selectContextMenuCordinates, selectCtxAudioState, selectCtxSelectedChannel, selectCtxSelectedChannelName, selectDeleteWidget, selectEditChannelCtxState, selectIsOwnerCtxState, selectJoinChannelCtxState, selectKickUser, selectLeaveChannelCtxState, selectPasteCtxState, selectPokeUser, selectSaveImageState, selectSaveVideoState, selectSelectedUserCtxState, setContextMenuOptions, setCtxCordinates, toggleContextMenu } from './contextMenuSlice';
import { assignNewServerGroup, markWidgetForDeletion, selectCurrentChannelId, selectServerChannels, selectServerGroups, selectServerMembers, selectUsersPermissions, setEditingChannelId, setSocialInput, throwServerError } from '../server/ServerSlice';

// style
import "./ContextMenu.css";

// socket
import { socket } from '../server/ServerBar/ServerBar';
import { Range } from '../../components/inputs/Range/Range';
import { selectUsername } from '../settings/appSettings/accountSettings/accountSettingsSlice';

// USER PREFS
import { saveUserPrefs, USER_PREFS } from '../../util/LocalData';

export const ContextMenu = () => {

    const dispatch = useDispatch();

    // local state
    const [origin, setOrigin] = React.useState(false);

    const [selectedImage, setSelectedImage] = React.useState({});

    const [selectedVideo, setSelectedVideo] = React.useState();

    const [selectedAudio, setSelectAudio] = React.useState();

    const [selectedInput, setSelectedInput] = React.useState();

    const [loading, toggleLoading] = React.useState(false);

    const [selectedWidget, setSelectedWidget] = React.useState();

    const [userVolumeLevel, setUserVolumeLevel] = React.useState(1);

    const ctxCordinates = useSelector(selectContextMenuCordinates);

    const ctxActive = useSelector(selectContextMenuActive);

    const saveImage = useSelector(selectSaveImageState);

    const saveVideo = useSelector(selectSaveVideoState);

    const permissions = useSelector(selectUsersPermissions);

    const permissionGroups = useSelector(selectServerGroups);

    const members = useSelector(selectServerMembers);

    const channels = useSelector(selectServerChannels);
    // channel state
    const currentChannelId = useSelector(selectCurrentChannelId);

    const joinChannelState = useSelector(selectJoinChannelCtxState);

    const leaveChannelState = useSelector(selectLeaveChannelCtxState);

    const editChannelState = useSelector(selectEditChannelCtxState);

    const selectedChannel = useSelector(selectCtxSelectedChannel);

    const selectedChannelName = useSelector(selectCtxSelectedChannelName);

    // user management
    const canBanUser = useSelector(selectBanUserCtxState);

    const selectedUserToManage = useSelector(selectSelectedUserCtxState);

    const assignPermissions = useSelector(selectAssignPermissionsCtxState);

    const isOwnerCtxState = useSelector(selectIsOwnerCtxState);

    const kickUser = useSelector(selectKickUser);

    const pokeUser = useSelector(selectPokeUser);

    const changeUserVolume = useSelector(selectChangingUsersVolumeState);

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
            if (p.localName === 'video' && p.className !== 'videoplayer' && p.className !== 'streaming-video-player') {

                dispatch(toggleContextMenu(true));

                dispatch(setContextMenuOptions({state: 'saveVideo', value: true}))

                setSelectedVideo(p)

                setAudioLevel(p?.volume);
            
            }
            if (p.id?.includes('channel-button')) {
                
                const id = p.id.split('-')[2];

                dispatch(toggleContextMenu(true))

                dispatch(handleChannelCtxState({
                    join: currentChannelId !== id,
                    leave: currentChannelId === id,
                    edit: permissions.user_can_manage_channels,
                    channel: id,
                    name: p.outerText
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
            if (p.className === 'text-input' && p.localName === 'input') {
                dispatch(toggleContextMenu(true));

                setSelectedInput(p);

                dispatch(handleCopyPasteCtxState());
            }

            if (p.localName === 'video' || p.localName === 'audio') {
                if (p.className === 'videoplayer') return;

                dispatch(setContextMenuOptions({state: 'audio', value: true}))
            }

            if (p.className?.includes('editing-single-widget')) {
                dispatch(toggleContextMenu(true))

                setSelectedWidget(p.id);

                dispatch(setContextMenuOptions({state: 'deleteWidget', value: true}));

            }

            // handle context for users in channels
            if (p.className?.includes('channel-user-placeholder') || p.className?.includes('active-user-container')) {
                
                const id = p.id.split('-')[0]

                const channel_id = p.id.split('channel-id-')[1]
                
                if (!id) return;

                dispatch(toggleContextMenu(true));

                const isOwner = permissionGroups.findIndex(group => group._id === p.id.split('-')[1] && group.server_group_name === 'Owner')
                
                if (id === username) {

                    dispatch(setContextMenuOptions({state: 'leaveChannel', value: true}));

                } else {

                    dispatch(setContextMenuOptions({state: 'kickUser', value: isOwner !== -1 ? false : permissions.user_can_kick_user}));

                    const user = members.findIndex(user => user.username === id);
                    
                    dispatch(handleUserManagementCtx({
                        ban: isOwner !== -1 ? false : permissions.user_can_ban_user,
                        perms: isOwner !== -1 ? false : permissions.user_can_manage_server_groups,
                        user: `${id}-servergroup-${members[user].server_group}-channel-id-${channel_id}`,
                        isOwner: isOwner !== -1,
                        poke: true,
                        volume: true,
                    }))

                    const USER_VOLUME = USER_PREFS.get(id);

                    if (USER_VOLUME?.volume) {
                        setUserVolumeLevel(USER_VOLUME?.volume);
                    } else {
                        setUserVolumeLevel(1);
                    }
                }

            }
  
        }  
            
        dispatch(setCtxCordinates({x: (e.view.innerWidth - e.pageX) < 400 ? (e.pageX - 300) : e.pageX, y: e.pageY}))

        setOrigin((e.view.innerHeight - e.pageY) < 400 ? true : false)
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
        console.log(value)
        setUserVolumeLevel(value);

        let obj = {};

        const userscurrentchannel = selectedUserToManage.split('channel-id-')[1];

        const usertochangevolume = selectedUserToManage.split('-')[0]

        if (userscurrentchannel === currentChannelId) {

            document.getElementsByClassName(`audio-source-for-user-${usertochangevolume}`)[0].volume = value;

        }
        
        const currentUserPrefs = USER_PREFS.get(usertochangevolume);

        if (currentUserPrefs) {
            obj = {...currentUserPrefs, volume: value}
        } else {
            obj = {volume: value}
        }

        USER_PREFS.set(usertochangevolume, obj);

        saveUserPrefs();
    }

    const handlePokeUser = () => {
        console.log(selectedChannel)
        console.log(selectedUserToManage)
    }

    return (
        <>
        {ctxActive ? 
        <motion.div
        style={{
            top: ctxCordinates.y,
            left: ctxCordinates.x,
            translateY: origin ? '-100%' : '0'
        }}
        className='ctx-menu-container'>
            {saveImage ? <CtxButton action={() => {handleSave(true)}} name={"Save Image"} /> : null}
            {saveVideo ? <CtxButton action={() => {handleSave(false)}} name={"Save Video"} /> : null}
            {pasteCtxState ? <CtxButton name={"Paste"} action={paste} /> : null}
            {joinChannelState ? <CtxButton action={handleJoinChannel} name={"Join Channel"} /> : null}
            {leaveChannelState ? <CtxButton action={handleLeaveChannel} name={'Leave Channel'} /> : null}
            {editChannelState ? <CtxButton action={handleEditChannel} name={"Edit Channel"} /> : null}
            {canBanUser ? <CtxButton name={"Ban User"} /> : null}
            {isOwnerCtxState ? <CtxMenuPlaceHolder name={"Server Owner"} /> : null}
            {assignPermissions ? <AssignPermissionGroupMenu action={assignNewPermissionGroup} permission_groups={permissionGroups} current_permission_group={selectedUserToManage.split('-channel')[0]}  /> : null}
            {audio ? <Range action={handleVolumeChange} fill={true} value={audioLevel} /> : null}
            {changeUserVolume ? <Range action={handleUserVolumeChange} step={0.05} value={userVolumeLevel} fill={true} /> : null}
            {deleteWidget ? <CtxButton action={handleDeleteWidget} name={"Delete Widget"} /> : null}
            {kickUser ? <CtxButton name="Kick User" /> : null}
            {pokeUser ? <CtxButton name="Poke User" action={handlePokeUser} /> : null}
            <Loading loading={loading} />
        </motion.div>
        : null}
        </>
    )
}
