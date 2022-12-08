import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { selectPrimaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectHideUserStatus } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectCurrentChannelId, selectServerGroups, selectServerMembers } from '../../ServerSlice'
import { UserStatus } from './UserStatus/UserStatus';

import "./UserStatusBar.css";
import { selectOfflineUsers, selectOnlineUsers, setUsers } from './UserStatusSlice';

export const UserStatusBar = () => {

    const dispatch = useDispatch();

    const users = useSelector(selectServerMembers);

    const hideUserStatusBar = useSelector(selectHideUserStatus);

    const channelId = useSelector(selectCurrentChannelId);

    const onlineUsers = useSelector(selectOnlineUsers);

    const offlineUsers = useSelector(selectOfflineUsers);

    const primaryColor = useSelector(selectPrimaryColor);

    const serverGroups = useSelector(selectServerGroups);

    React.useEffect(() => {

        dispatch(setUsers(users));
        console.log(users)
    }, [users])

    return (
        <>
        {(channelId && hideUserStatusBar) ? null :
        <div 
        style={{borderLeft: `3px solid ${primaryColor}`}}
        className='user-status-bar'>
            {serverGroups.map((server_group) => {
                return (
                    <div style={{display: onlineUsers.findIndex(u => u.server_group === server_group._id) !== -1 ? null : 'none'}} >
                    <InputTitle title={server_group.server_group_name} />
                    {onlineUsers.map(u => {
                        if (u.server_group === server_group._id) {
                            return <UserStatus user={u} key={u._id} />
                        }
                    })}
                    </div>
                )
            })}
            <InputTitle marginBottom={'13px'} marginTop={'13px'} title={"Offline"} />
            {offlineUsers.map((u) => {
                return <UserStatus user={u} key={u._id} />
            })}
        </div>
        }
        </>
    )
}
