import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectActivityStatus, selectHideUserStatus } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectCurrentChannelId, selectServerGroups, selectServerMembers } from '../../ServerSlice'
import { UserStatus } from './UserStatus/UserStatus';

import "./UserStatusBar.css";
import { selectCurrentStatus, selectOfflineUsers, selectOnlineUsers, setUsers, updateUserStatus } from './UserStatusSlice';
import { AltDownIcon } from '../../../../components/Icons/AltDownIcon/AltDownIcon';

export const UserStatusBar = () => {

    const dispatch = useDispatch();

    const [hideOfflineUsers, toggleHideOfflineUsers] = React.useState(false);

    const users = useSelector(selectServerMembers);

    const hideUserStatusBar = useSelector(selectHideUserStatus);

    const channelId = useSelector(selectCurrentChannelId);

    const onlineUsers = useSelector(selectOnlineUsers);

    const offlineUsers = useSelector(selectOfflineUsers);
    
    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);
    
    const secondaryColor = useSelector(selectSecondaryColor);

    const serverGroups = useSelector(selectServerGroups);

    const activityStatus = useSelector(selectActivityStatus);

    const currentStatus = useSelector(selectCurrentStatus);

    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {

        dispatch(setUsers(users));
    // eslint-disable-next-line    
    }, [users])

    const handleDynamicStatus = () => {

        let ipcRenderer;

        try {

            ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.invoke('DYNAMIC_STATUS')
            .then(res => {

                let new_status_name;

                let l_windows = res.filter(w => !w.id.includes('screen') && !w.name.includes('Bubble') && !w.name.includes('D3DProxyWindow') && !w.name.includes("Input Occlusion Window") && !w.name.includes('Overlay') && !w.name.includes('.mp4') && !w.name.includes('.jpg') && !w.name.includes('.png') && !w.name.includes('.jpeg') && !w.name.includes('.webp') && !w.name.includes('.webm') && !w.name.toLowerCase().includes('notification'));
                
                // avoid uneccessary server calls
                
                if (!l_windows[0]?.name) return;

                if (l_windows[0].name.includes('Backstop Window')) return;

                if (l_windows[0].name.includes('Windows Default')) return;

                if (l_windows[0].name.includes('Google Chrome')) {
                    new_status_name = "Google Chrome"
                } else if (l_windows[0].name.includes('Visual Studio Code')) {
                    new_status_name = "Visual Studio Code"
                } else if (l_windows[0].name.includes('Discord')) { 
                    new_status_name = 'Discord'
                } else if (l_windows[0].name.includes("Opera")) {
                    new_status_name = "Opera"
                } else if (l_windows[0].name.includes("Microsoft Edge")) {
                    new_status_name = "Microsoft Edge"
                } else {
                    new_status_name = l_windows[0].name;
                }

                if (currentStatus === `${new_status_name}`) return;
                
                dispatch(updateUserStatus({value: `${new_status_name}`, icon: ""}));

                for (const w of l_windows) {
                    URL.revokeObjectURL(w?.icon);
                }
            })
        } catch (error) {
            return;
        }
    }

    React.useEffect(() => {

        let interval;

        if (activityStatus) {
            try {

                interval = setInterval(handleDynamicStatus, 120000)

            } catch (error) {

                clearInterval(interval);

                interval = null;
            }

        } else {
            return;
        }

        return () => {
            clearInterval(interval);
        }
    // eslint-disable-next-line
    }, [activityStatus, currentStatus])

    const handleHideOfflineUsers = () => {

        localStorage.setItem('hide offline users', JSON.stringify(!hideOfflineUsers));

        toggleHideOfflineUsers(!hideOfflineUsers);
    }

    React.useEffect(() => {
        try {
            const hiddenState = localStorage.getItem('hide offline users');

            if (JSON.parse(hiddenState)) {
                toggleHideOfflineUsers(true);
            }
        } catch (error) {
            return;
        }
        
    }, [])

    return (
        <>
        {(hideUserStatusBar) ? null :
        <div 
        style={{backgroundColor: glass ? `rgba(${secondaryColor.split('(')[1].split(')')[0]}, 0.8)` : secondaryColor}}
        className='user-status-bar'>
            {serverGroups.map((server_group) => {

                if (server_group.server_group_name === 'Guest') return null;

                return (
                    <div className='online-user-wrapper' style={{display: onlineUsers.findIndex(u => u.server_group === server_group._id) !== -1 ? null : 'none', width: '100%'}} >
                        <h4 key={server_group.server_group_name}  style={{color: textColor}}>{server_group.server_group_name}</h4>
                        {onlineUsers.map(u => {
                            if (u.server_group === server_group._id) {
                                return <UserStatus user={u} key={u._id} />
                            } else {
                                return null
                            }
                        })}
                    </div>
                )
            })}
            {serverGroups.map((server_group) => {
                if (server_group.server_group_name === "Guest") {
                    return (
                        <div className='online-user-wrapper' style={{display: onlineUsers.findIndex(u => u.server_group === server_group._id) !== -1 ? null : 'none', width: '100%'}} >
                            <h4 style={{color: textColor}}>{server_group.server_group_name}</h4>
                            {onlineUsers.map(u => {
                                if (u.server_group === server_group._id) {
                                    return <UserStatus user={u} key={u._id} />
                                } else {
                                    return null
                                }
                            })}
                        </div>
                    )
                } else {
                    return null;
                }
            })}
            {offlineUsers.length !== 0 ? 
            <div onClick={handleHideOfflineUsers} className='offline-users-divider'>
                <h4 key="offline-title-header" style={{color: textColor, opacity: 1}}>Offline - {offlineUsers.length}</h4> 
                <AltDownIcon flip={hideOfflineUsers} />
            </div>
            : null}
            {hideOfflineUsers ?
            null :
            offlineUsers.map((u) => {
                return <UserStatus user={u} key={u._id} />
            })}
        </div>
        }
        </>
    )
}
