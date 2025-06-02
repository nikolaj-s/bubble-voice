import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import MenuWrapper from '../../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import { CreateServerForm } from '../../Forms/CreateServerForm/CreateServerForm'

export const CreateServer = ({close}) => {

    const navItems = [
        {key: "create", label: "Create a Bubble"}
    ]

    const content = {
        create: <CreateServerForm />
    }

    return (
        <MenuWrapper navItems={navItems} >
            {content}
        </MenuWrapper>
    )
}
