import React from 'react'
import { NotAuthorized } from '../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'

export const ManageChannelsForm = ({permissions}) => {
    return (
        <NotAuthorized permission={permissions.user_can_edit_channels}>
            <LoadingErrorFormWrapper sliceName='channelsSlice' >

            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
