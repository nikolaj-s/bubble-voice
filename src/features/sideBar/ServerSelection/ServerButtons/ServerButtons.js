import React from 'react'
import { AltDisconnectButton } from '../../../../components/buttons/AltDisconnectButton/AltDisconnectButton'
import { AltLeaveServerButton } from '../../../../components/buttons/AltLeaveServerButton/AltLeaveServerButton'
import { AltConnectionIndicator } from '../../../../components/AltConnectionIndicator/AltConnectionIndicator'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { selectCurrentChannelId, selectServerId } from '../../../server/ServerSlice'
import { AltSettingsButton } from '../../../../components/buttons/AltSettingsButton/AltSettingsButton'

export const ServerButtons = () => {

    const color = useSelector(selectTextColor);

    const channel = useSelector(selectCurrentChannelId);

    const server = useSelector(selectServerId);

    return (
        <div className='server-buttons-nav-container'>
            <div style={{backgroundColor: color}} className="application-navigation-spacer"></div>
            {channel ? <AltConnectionIndicator active={channel} /> : null}
            {channel ? <AltDisconnectButton active={channel} /> : null}
            <AltLeaveServerButton active={server} />
            <AltSettingsButton active={true} />
        </div>
    )
}
