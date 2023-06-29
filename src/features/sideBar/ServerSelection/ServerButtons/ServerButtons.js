import React from 'react'
import { AltDisconnectButton } from '../../../../components/buttons/AltDisconnectButton/AltDisconnectButton'
import { AltLeaveServerButton } from '../../../../components/buttons/AltLeaveServerButton/AltLeaveServerButton'
import { AltConnectionIndicator } from '../../../../components/AltConnectionIndicator/AltConnectionIndicator'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { selectCurrentChannelId, selectServerId } from '../../../server/ServerSlice'

export const ServerButtons = () => {

    const color = useSelector(selectTextColor);

    const channel = useSelector(selectCurrentChannelId);

    const server = useSelector(selectServerId);

    return (
        <div className='server-buttons-nav-container'>
            <div style={{backgroundColor: color}} className="application-navigation-spacer"></div>
            <AltConnectionIndicator active={channel} />
            <AltDisconnectButton active={channel} />
            <AltLeaveServerButton active={server} />
        </div>
    )
}
