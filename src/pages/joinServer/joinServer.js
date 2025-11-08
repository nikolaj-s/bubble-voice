import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import { JoinServerForm } from '../../layout/Forms/JoinServerForm/JoinServerForm'
import { Card } from '../../components/ui/Wrappers/Card/Card'

export const JoinServer = ({close}) => {

    return (
            <Card>
                <JoinServerForm />
            </Card>
    )
}

