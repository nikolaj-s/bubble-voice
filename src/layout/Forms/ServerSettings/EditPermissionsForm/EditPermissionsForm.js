import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/ui/Titles/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import PermissionsMenu from '../../../../components/Permissions/PermissionsMenu/PermissionsMenu'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import { createPermissionGroup } from '../../../../features/ServerPermissions/Thunks/createPermissionGroup'
import ConfirmationPopup from '../../../../components/ui/Menus/ConfirmationPopup/ConfirmationPopup'
import { deletePermissionGroup } from '../../../../features/ServerPermissions/Thunks/deletePermissionGroup'

export const EditPermissionsForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [name, setName] = React.useState("");

    const [permissionToDelete, setPermissionToDelete] = React.useState(false);

    const permissionGroups = useSelector(state => state.serverPermissionsSlice.permissions);

    const users = useSelector(state => state.serverUsersSlice.users);

    const handleCreatePermissionGroup = () => {

        if (name.trim().length < 3) return;

        dispatch(createPermissionGroup({name}));

        setName("")

    }

    const handleCancelDelete = () => {


        setPermissionToDelete(false);
    }

    const handleDeletePermission = () => {

        dispatch(deletePermissionGroup({permissionGroup: permissionToDelete}))

        setPermissionToDelete(false);
    }

    return (
        <NotAuthorized permission={permissions?.user_can_manage_server_groups}>
            <LoadingErrorFormWrapper sliceName='serverPermissionsSlice'>
                <Header text='Create User Permission Group' />
                <Label label='Enter a permission group name:' />
                <TextInput value={name} onChange={setName} placeholder={'Name'} action={setName} />
                <TextButton disabled={name.length < 3} title='Create Server Group' action={handleCreatePermissionGroup} />
                <Header text='Edit User Permissions' />
                {Object.values(permissionGroups).map(group => 
                
                <PermissionsMenu 
                handleDelete={setPermissionToDelete}
                users={Object.values(users).filter(u => u.server_group === group._id)}
                key={group._id} 
                permissions={group} />    

                )}
                {permissionToDelete && (<ConfirmationPopup 
                onConfirm={handleDeletePermission}
                onCancel={handleCancelDelete}
                message={`Are you sure you want to delete the permission group: ${permissionToDelete.server_group_name}`}
                />)}
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
