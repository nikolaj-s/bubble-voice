import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/Titles/Header/Header'
import { useSelector } from 'react-redux'
import PermissionsMenu from '../../../../components/Menus/PermissionsMenu/PermissionsMenu'
import Label from '../../../../components/Titles/Label/Label'
import TextButton from '../../../../components/Buttons/TextButton/TextButton'
import TextInput from '../../../../components/Inputs/TextInput/TextInput'

export const EditPermissionsForm = ({permissions}) => {

    const [name, setName] = React.useState("");

    const permissionGroups = useSelector(state => state.serverPermissionsSlice.permissions);

    const [groupsToUpdate, setGroupsToUpdate] = React.useState({});

    const handleSetGroupToUpdate = (group) => {
        setGroupsToUpdate(
            groupsToUpdate[group._id] = group
        )
    }   

    const createServerGroup = () => {

    }

    const submitChanges = () => {

    }

    return (
        <NotAuthorized permission={permissions?.user_can_manage_server_groups}>
            <LoadingErrorFormWrapper sliceName='serverPermissionsSlice'>
                <Header text='Create User Permission Group' />
                <Label label='Enter a permission group name:' />
                <TextInput value={name} onChange={setName} placeholder={'Server Group Name'} />
                <TextButton disabled={name.length < 3} title='Create Server Group' />
                <Header text='Edit User Permissions' />
                {Object.values(permissionGroups).map(group => 
                    group.admin ? null :
                     
                    <PermissionsMenu onUpdate={handleSetGroupToUpdate} key={group._id} permissions={group} />
                    
                )}
                <TextButton disabled={Object.keys(groupsToUpdate).length === 0} title='Confirm Permission Group Changes' />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
