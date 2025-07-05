
import React from 'react'
import { useSelector } from 'react-redux'

export const usePermissions = () => {

    const {_id: user_id} = useSelector(state => state.accountSlice.account);

    const member = useSelector(state => state.serverUsersSlice.users[user_id]) || {};

    const permissions = useSelector(state => state.serverPermissionsSlice.permissions[member.server_group]) || {};

    return permissions;
}
