import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { selectHideUserStatus } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectCurrentChannelId, selectServerMembers } from '../../ServerSlice'
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

    React.useEffect(() => {

        dispatch(setUsers(users));
        
    }, [users])

    return (
        <>
        {(channelId && hideUserStatusBar) ? null :
        <div className='user-status-bar'>
            <InputTitle marginBottom={'13px'} marginTop={'13px'} title={"Online"} />
            {onlineUsers.map((u) => {
                return <UserStatus user={u} key={u._id} />
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
