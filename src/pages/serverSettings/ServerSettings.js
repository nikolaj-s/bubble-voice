
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import ProtectedFormWrapper from '../../components/ui/Wrappers/ProtectedFormWrapper/ProtectedFormWrapper'
import { CreateChannelForm } from '../../layout/Forms/ServerSettings/CreateChannelForm/CreateChannelForm'
import { CreateCategoryForm } from '../../layout/Forms/ServerSettings/CreateCategoryForm/CreateCategoryForm'
import { EditServerDetailsForm } from '../../layout/Forms/ServerSettings/EditServerDetailsForm/EditServerDetailsForm'
import { EditPermissionsForm } from '../../layout/Forms/ServerSettings/EditPermissionsForm/EditPermissionsForm'
import { EditPermissionGroupForm } from '../../layout/Forms/ServerSettings/EditPermissionGroupForm/EditPermissionGroupForm'
import { EditChannelForm } from '../../layout/Forms/ServerSettings/EditChannelForm/EditChannelForm'
import { UserManagementForm } from '../../layout/Forms/ServerSettings/UserManagementForm/UserManagementForm'
import { EditCategoryForm } from '../../layout/Forms/ServerSettings/EditCategoryForm/EditCategoryForm'
import { ContentDataForm } from '../../layout/Forms/ServerSettings/ContentDataForm/ContentDataForm'
import { AddWidgetForm } from '../../layout/Forms/ServerSettings/AddWidgetForm/AddWidgetForm'
import { ManageWidgetsForm } from '../../layout/Forms/ServerSettings/ManageWidgetsForm/ManageWidgetsForm'
import { ManageChannelsForm } from '../../layout/Forms/ServerSettings/ManageChannelsForm/ManageChannelsForm'
import { InvitesForm } from '../../layout/Forms/ServerSettings/InvitesForm/InvitesForm'
import { ServerSecurityForm } from '../../layout/Forms/ServerSettings/ServerSecurityForm/ServerSecurityForm'
import { CreateMomentForm } from '../../layout/Forms/ServerSettings/CreateMomentForm/CreateMomentForm'
import { ModerationForm } from '../../layout/Forms/ServerSettings/ModerationForm/ModerationForm'

export const ServerSettings = ({close}) => {

    const navItems = [
        {key: "general", label: "General"},
        {key: "invites", label: "Invites"},
        {key: "createChannel", label: "Create Channel" },
        {key: "createCategory", label: "Create Category"},
        {key: "permissions", label: "Edit Permissions"},
        {key: "manageUsers", label: "Manage Users"},
        {key: "manageChannels", label: "Manage Channels"},
        {key: "moderation", label: "Moderation"},
        {key: "security", label: "Security"},
        {key: "contentData", label: "Content & Data"},
    ]

    const content = {
        general: <EditServerDetailsForm />,
        createChannel: <CreateChannelForm />,
        permissions: <EditPermissionsForm />,
        createCategory: <CreateCategoryForm />,
        security: <ServerSecurityForm />,
        invites: <InvitesForm />,
        editPermissionGroup: <EditPermissionGroupForm />,
        editChannel: <EditChannelForm />,
        manageUsers: <UserManagementForm />,
        editCategory: <EditCategoryForm />,
        contentData: <ContentDataForm />,
        addWidget: <AddWidgetForm />,
        manageWidgets: <ManageWidgetsForm />,
        manageChannels: <ManageChannelsForm />,
        createMoment: <CreateMomentForm />,
        moderation: <ModerationForm />
    }

    return (
        <ProtectedFormWrapper>
            <MenuWrapper onClose={close} navItems={navItems}>
                    {content}
            </MenuWrapper>
        </ProtectedFormWrapper>
    )
}
