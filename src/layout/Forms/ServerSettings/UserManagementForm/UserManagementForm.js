import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper';
import UserManager from '../../../../components/UserManager/UserManager';
import { assignPermissionGroup } from '../../../../features/ServerUsers/Thunks/assignPermissionGroup';

export const UserManagementForm = ({permissions}) => {

    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.serverUsersSlice);

    const groups = useSelector(state => state.serverPermissionsSlice.permissions);

    const users = useSelector(state => state.serverUsersSlice.users);

    const updateUsersGroup = (user_id, new_server_group) => {
        if (loading) return;
        
        dispatch(assignPermissionGroup({user_id, new_server_group}));
    }

    return (
        <NotAuthorized permission={permissions.user_can_assign_server_groups}>
            <LoadingErrorFormWrapper sliceName='serverUsersSlice'>
                <UserManager 
                permissions={permissions}
                onChangeUserGroup={updateUsersGroup}
                serverGroups={groups}
                users={users}
                />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
