import React from 'react'

import styles from './UsersBar.module.css';

import { ServerUsersProvider } from '../../../providers/ServerUsersProvider/ServerUsersProvider';

import { useSelector } from 'react-redux';

import UserButton from '../../../components/ui/Buttons/UserButton/UserButton';

import { useEffect, useState } from "react";

export const UserBar = () => {
    const users = useSelector(state => state.serverUsersSlice.users);
    const groups = useSelector(state => state.serverPermissionsSlice.permissions);

    // State to store processed groups and users
    const [groupedUsers, setGroupedUsers] = useState({});
    const [sortedGroups, setSortedGroups] = useState([]);

    // Process users and groups when data changes
    useEffect(() => {
        if (!users || !groups) return;

        // 1️⃣ Group users by server_group
        const newGroupedUsers = {};
        Object.values(users).forEach(user => {
            if (!newGroupedUsers[user.server_group]) {
                newGroupedUsers[user.server_group] = [];
            }
            newGroupedUsers[user.server_group].push(user);
        });

        // 2️⃣ Sort groups: Admin groups first
        const newSortedGroups = Object.entries(groups).sort((a, b) => {
            return (b[1].admin === true) - (a[1].admin === true);
        });

        // Update state
        setGroupedUsers(newGroupedUsers);
        setSortedGroups(newSortedGroups);
    }, [users, groups]); // Recalculate only when users or groups change

    if (!users || !groups) return <></>;

    return (
        <div className={styles.container}>
            <ServerUsersProvider>
                {sortedGroups.map(([groupId, group]) => groupedUsers[groupId]?.length > 0 && (
                    <div key={groupId} className={styles.groupContainer}>
                        {/* Group Name */}
                        <p className={styles.groupName}>{group.server_group_name} </p>
                        {/* Users in this group */}
                        {groupedUsers[groupId]?.map(user => (
                            <UserButton {...user} user={user} key={user.user_id} />
                        ))}
                    </div>
                ))}
            </ServerUsersProvider>
        </div>
    );
};

