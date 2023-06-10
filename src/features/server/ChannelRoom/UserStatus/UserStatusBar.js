import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectActivityStatus, selectHideUserStatus } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectCurrentChannelId, selectServerGroups, selectServerMembers } from '../../ServerSlice'
import { UserStatus } from './UserStatus/UserStatus';

import "./UserStatusBar.css";
import { selectCurrentStatus, selectOfflineUsers, selectOnlineUsers, setUsers, updateUserStatus } from './UserStatusSlice';

export const UserStatusBar = () => {

    const dispatch = useDispatch();

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
        
    }, [users])

    React.useEffect(() => {

        let interval;

        let ipcRenderer;

        if (activityStatus) {
            try {

                ipcRenderer = window.require('electron').ipcRenderer;
                
                interval = setInterval(() => {
                    
                    ipcRenderer.invoke('GET_SOURCES')
                    .then(res => {

                        let new_status_name;

                        let l_windows = res.filter(w => !w.id.includes('screen') && !w.name.includes('Bubble') && !w.name.includes('D3DProxyWindow') && !w.name.includes("Input Occlusion Window"));
                        
                        // avoid uneccessary server calls
                        
                        if (!l_windows[0]?.name) return;

                        if (l_windows[0].name.includes('Google Chrome')) {
                            new_status_name = "Google Chrome"
                        } else {
                            new_status_name = l_windows[0].name;
                        }

                        if (currentStatus === `Playing ${new_status_name}`) return;

                        dispatch(updateUserStatus({value: `Playing ${new_status_name}`}))
                    })

                }, 120000)

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

    }, [activityStatus, currentStatus])

    return (
        <>
        {(channelId && hideUserStatusBar) ? null :
        <div 
        style={{backgroundColor: glass ? glassColor : secondaryColor}}
        className='user-status-bar'>
            {serverGroups.map((server_group) => {

                if (server_group.server_group_name === 'Guest') return null;

                return (
                    <div className='online-user-wrapper' style={{display: onlineUsers.findIndex(u => u.server_group === server_group._id) !== -1 ? null : 'none', width: '100%'}} >
                    <h4 style={{color: textColor}}>{server_group.server_group_name}</h4>
                    {onlineUsers.map(u => {
                        if (u.server_group === server_group._id) {
                            return <UserStatus user={u} key={u._id} />
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
                            }
                        })}
                        </div>
                    )
                }
            })}
            {offlineUsers.length !== 0 ? <h4 style={{color: textColor}}>Offline</h4> : null}
            {offlineUsers.map((u) => {
                return <UserStatus user={u} key={u._id} />
            })}
        </div>
        }
        </>
    )
}
