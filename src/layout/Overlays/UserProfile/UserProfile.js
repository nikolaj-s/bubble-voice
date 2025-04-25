import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import { useSelector } from 'react-redux'
import { Profile } from '../../../components/Profile/Profile';

export const UserProfile = ({close}) => {

    const {user} = useSelector(state => state.userProfileSlice);

    const profile = useSelector(state => state.serverUsersSlice.users[user])

    return (
        <FullScreenWrapper onClose={close} maxContentWidth={400}>
            <Profile account={profile} />
        </FullScreenWrapper>
    )
}
