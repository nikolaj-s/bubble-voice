import React from 'react'
import { ServerUsersProvider } from '../../../providers/ServerUsersProvider/ServerUsersProvider'
import { UserBar } from './UserBar/UserBar'

export const Users = () => {

    return (
        <ServerUsersProvider>
            <UserBar />
        </ServerUsersProvider>
    )
}
