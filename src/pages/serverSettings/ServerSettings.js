import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import ProtectedFormWrapper from '../../components/ui/Wrappers/ProtectedFormWrapper/ProtectedFormWrapper'
import { CreateChannelForm } from '../../layout/Forms/ServerSettings/CreateChannelForm/CreateChannelForm'
import { CreateCategoryForm } from '../../layout/Forms/ServerSettings/CreateCategoryForm/CreateCategoryForm'
import { EditServerDetailsForm } from '../../layout/Forms/ServerSettings/EditServerDetailsForm/EditServerDetailsForm'
import { EditPermissionsForm } from '../../layout/Forms/ServerSettings/EditPermissionsForm/EditPermissionsForm'
import { EditPermissionGroupForm } from '../../layout/Forms/ServerSettings/EditPermissionGroupForm/EditPermissionGroupForm'
import { EditChannelForm } from '../../layout/Forms/ServerSettings/EditChannelForm/EditChannelForm'
import { UserManagementForm } from '../../layout/Forms/ServerSettings/UserManagementForm/UserManagementForm'

export const ServerSettings = ({close}) => {

    const navItems = [
        {key: "general", label: "General"},
        {key: "createChannel", label: "Create Channel" },
        {key: "createCategory", label: "Create Category"},
        {key: "permissions", label: "Edit Permissions"},
        {key: "manageUsers", label: "Manage Users"},
        {key: "security", label: "Security"},
    ]

    const content = {
        general: <EditServerDetailsForm />,
        createChannel: <CreateChannelForm />,
        permissions: <EditPermissionsForm />,
        createCategory: <CreateCategoryForm />,
        security: <></>,
        editPermissionGroup: <EditPermissionGroupForm />,
        editChannel: <EditChannelForm />,
        manageUsers: <UserManagementForm />
    }

    return (
        <FullScreenWrapper onClose={close}>
            <ProtectedFormWrapper>
                <MenuWrapper navItems={navItems}>
                        {content}
                </MenuWrapper>
            </ProtectedFormWrapper>
        </FullScreenWrapper>
    )
}
