import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import { JoinServerForm } from '../../layout/Forms/JoinServerForm/JoinServerForm'

export const JoinServer = ({close}) => {

    const navItems = [
        {key: "joinServer", label: 'Join Server'}
    ]

    const content = {
        joinServer: <JoinServerForm />
    }

    return (
        <FullScreenWrapper onClose={close}>
            <MenuWrapper navItems={navItems}>
                {content}
            </MenuWrapper>
        </FullScreenWrapper>
    )
}

