import React from 'react'
import { useSelector } from 'react-redux'
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { selectHideUserStatus } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectCurrentChannelId, selectServerMembers } from '../../ServerSlice'
import { UserStatus } from './UserStatus/UserStatus';

import "./UserStatusBar.css";

export const UserStatusBar = () => {

    const users = useSelector(selectServerMembers);

    const hideUserStatusBar = useSelector(selectHideUserStatus);

    const channelId = useSelector(selectCurrentChannelId);

    const [onlineUsers, setOnlineUsers] = React.useState([]);

    const [offlineUsers, setOfflineUsers] = React.useState([]);

    React.useEffect(() => {

        const online = [];

        const offline = [];

        for (const u of users) {
            if (u.status && u.status !== 'offline') {
                online.push(u)
            } else {
                offline.push(u)
            }
        }

        setOnlineUsers(online)

        setOfflineUsers(offline)

    }, [users])

    return (
        <>
        {(channelId && hideUserStatusBar) ? null :
        <div className='user-status-bar'>
            <InputTitle title={"Online"} />
            {onlineUsers.map((u) => {
                return <UserStatus user={u} key={u._id} />
            })}
            <InputTitle title={"Offline"} />
            {offlineUsers.map((u) => {
                return <UserStatus user={u} key={u._id} />
            })}
        </div>
        }
        </>
    )
}
