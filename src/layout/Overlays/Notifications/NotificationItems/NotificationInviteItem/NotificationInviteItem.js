import React from 'react'
import { Text } from '../../../../../components/ui/Text/Text'
import { ToolBar } from '../../../../../components/ui/Wrappers/ToolBar/ToolBar'
import IconButton from '../../../../../components/ui/Buttons/IconButton/IconButton'
import { CircleCheck, CircleX } from 'lucide-react'
import { Banner } from '../../../../../components/Banner/Banner'

export const NotificationInviteItem = ({sender_id: sender, server_id: server, channel_id: channel, type, onAccept, onDecline}) => {
    return (
        <>
        {type === 'server_invite' ?
        <>
        <Banner image={server.server_banner} />
        <Text>
            {`${server.server_name} by ${sender.display_name}`}
        </Text>
        </>
        :
        <Text>
            {`${sender.display_name} invited you to join them in a voice call in ${server?.server_name} / ${channel?.channel_name}`}
        </Text>
        }
        <ToolBar>
            <IconButton title={'Accept'} Icon={<CircleCheck color='var(--success-color)' />} onClick={onAccept} />
            <IconButton title={'Decline'} Icon={<CircleX color='var(--error-color)' />} onClick={onDecline} />
        </ToolBar>
        </>
    )
}
