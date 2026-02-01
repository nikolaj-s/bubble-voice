
import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/ui/Titles/Header/Header'
import { useSearchParams } from 'react-router-dom'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { SubPageWrapper } from '../../../../components/ui/Wrappers/SubPageWrapper/SubPageWrapper'
import { ModerationHome } from './ModerationHome/ModerationHome'
import { ManageMessagingTimeouts } from './ManageMessagingTimeouts/ManageMessagingTimeouts'
import BackButton from '../../../../components/ui/Buttons/BackButton/BackButton'

export const ModerationForm = ({permissions}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const content = {
        moderationHome: ModerationHome,
        ManageMessagingTimeouts
    }

    const activeSection = content[searchParams.get('moderation_option')] ? searchParams.get('moderation_option') : 'moderationHome';

    return (
        <NotAuthorized permission={permissions?.user_can_timeout_user_messaging}>
            <LoadingErrorFormWrapper sliceName='moderationSlice'>
                <span style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <BackButton />
                <Header text='Moderation' />
                </span>
                <LineSpacer />
                <SubPageWrapper page={activeSection}>
                    {React.createElement(content[activeSection], {permissions})}
                </SubPageWrapper>
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
