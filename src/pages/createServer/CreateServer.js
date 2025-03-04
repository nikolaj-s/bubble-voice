import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import { CreateServerForm } from '../../layout/Forms/CreateServerForm/CreateServerForm'

export const CreateServer = ({close}) => {

    const navItems = [
        {key: "create", label: "Create"}
    ]

    const content = {
        create: <CreateServerForm />
    }

    return (
        <FullScreenWrapper onClose={close}>
            <MenuWrapper navItems={navItems} >
                {content}
            </MenuWrapper>
        </FullScreenWrapper>
    )
}
