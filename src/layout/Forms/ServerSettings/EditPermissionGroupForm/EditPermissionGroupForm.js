import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { useDispatch, useSelector } from 'react-redux'
import UserPermissionsEditor from '../../../../components/Permissions/UserPermissionsEditor/UserPermissionsEditor';
import { useSearchParams } from 'react-router-dom';
import { updatePermissionGroup } from '../../../../features/ServerPermissions/Thunks/updatePermissionGroup';

export const EditPermissionGroupForm = ({permissions}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const { currentPermissionGroup } = useSelector(state => state.serverPermissionsSlice);

    const permissionGroup = useSelector(state => state.serverPermissionsSlice.permissions[currentPermissionGroup]);

    const handleUpdate = (perms) => {
       
        dispatch(updatePermissionGroup({updatedPermissions: perms}));

        setSearchParams({section: 'permissions'})
    }

    return (
        <NotAuthorized permission={permissions.user_can_manage_server_groups}>
            <UserPermissionsEditor onUpdate={handleUpdate} permissions={permissionGroup} />
        </NotAuthorized>
    )
}
