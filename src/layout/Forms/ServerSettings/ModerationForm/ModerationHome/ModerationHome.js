import React from 'react'
import Label from '../../../../../components/ui/Titles/Label/Label'
import TextButton from '../../../../../components/ui/Buttons/TextButton/TextButton'
import { useSearchParams } from 'react-router-dom'
import { Description } from '../../../../../components/ui/Description/Description'

export const ModerationHome = ({permissions}) => {

    const [_, setSearchParams] = useSearchParams();
  
    return (
        <>
        {permissions?.user_can_timeout_user_messaging && (
        <>
        <Label label='Manage Current Messaging Timeouts' />
        <Description description={"View all active messaging timeouts in this server. From here, moderators can review reasons and durations, or remove timeouts early to restore a user’s messaging privileges."} />
        <TextButton action={() => {setSearchParams({section: 'moderation', moderation_option: 'ManageMessagingTimeouts'})}} title='Manage' />
        </>
        )}
        </>
    )
}
