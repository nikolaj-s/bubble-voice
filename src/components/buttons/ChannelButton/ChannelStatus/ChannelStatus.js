import React from 'react'

import "./ChannelStatus.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectAppFocusedState } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const ChannelStatus = ({status, active}) => {

    const textColor = useSelector(selectTextColor);

    const focused = useSelector(selectAppFocusedState)

    return (
        <div 
        className={`channel-status-wrapper ${focused ? 'channel-status-wrapper-animation' : ''}`}>
            <p
            style={{color: textColor, opacity: 0.7}}
            >{status}</p>
        </div>
    )
}
