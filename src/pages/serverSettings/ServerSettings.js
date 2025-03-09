import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import ProtectedFormWrapper from '../../components/ui/Wrappers/ProtectedFormWrapper/ProtectedFormWrapper'
import { EditServerDetails } from '../../layout/Forms/ServerSettings/EditServerDetails/EditServerDetails'
import { CreateChannelForm } from '../../layout/Forms/ServerSettings/CreateChannelForm/CreateChannelForm'
import { CreateCategoryForm } from '../../layout/Forms/ServerSettings/CreateCategoryForm/CreateCategoryForm'

export const ServerSettings = ({close}) => {

    const navItems = [
        {key: "general", label: "General"},
        {key: "createChannel", label: "Create Channel" },
        {key: "createCategory", label: "Create Category"},
        {key: "permissions", label: "Edit Permissions"},
        
    ]

    const content = {
        general: <EditServerDetails />,
        createChannel: <CreateChannelForm />,
        permissions: <></>,
        createCategory: <CreateCategoryForm />
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
