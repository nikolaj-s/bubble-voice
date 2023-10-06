import React from 'react'

import "./ChannelStatus.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ChannelStatus = ({status, active}) => {

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <div 
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        style={{backgroundColor: active ? accentColor : primaryColor}}
        className={`channel-status-wrapper ${hover ? 'channel-status-wrapper-animation' : ''}`}>
            <p
            style={{color: textColor, opacity: 0.7}}
            >{status}</p>
        </div>
    )
}
