
import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/ui/Titles/Header/Header'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'

import { InviteFormHome } from './InviteFormHome/InviteFormHome'
import { InviteUserForm } from './InviteUserForm/InviteUserForm'
import { ViewPendingInvitesForm } from './ViewPendingInvitesForm/ViewPendingInvitesForm'
import { useSearchParams } from 'react-router-dom';

import { SubPageWrapper } from '../../../../components/ui/Wrappers/SubPageWrapper/SubPageWrapper'
import { useDispatch } from 'react-redux'
import { getInviteLink } from '../../../../features/Invites/ServerInvites/Thunks/getInviteLink'

export const InvitesForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const content = {
        'home': InviteFormHome,
        inviteUser: InviteUserForm,
        pendingInvites: ViewPendingInvitesForm
    }

    React.useEffect(() => {

        if (permissions.user_can_manage_invites) {
            dispatch(getInviteLink());
        }

    }, [dispatch, permissions])

    const activeSection = content[searchParams.get('invites')] ? searchParams.get('invites') : 'home';

    return (
        <NotAuthorized permission={permissions.user_can_manage_invites}>
            <LoadingErrorFormWrapper sliceName='serverInvitesSlice' >
                <Header text='Manage Invites' />
                <LineSpacer />
                <SubPageWrapper page={activeSection}>
                    {React.createElement(content[activeSection], {permissions, setSearchParams})}
                </SubPageWrapper>
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
