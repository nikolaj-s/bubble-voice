// library's
import React from 'react'
import { useSelector } from 'react-redux';

// components
import { Muted } from '../../../Icons/Muted/Muted';
import { WebCam } from '../../../Icons/WebCam/WebCam';
import { ScreenShare } from '../../../Icons/ScreenShare/ScreenShare';
import { Image } from '../../../Image/Image';
import { MicMuted } from '../../../Icons/MicMuted/MicMuted';

// state
import { selectSecondaryColor, selectActivationColor, selectTextColor, selectAccentColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelUserDisplay.css";

export const ChannelUserDisplay = ({user, channel_id}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const activityColor = useSelector(selectActivationColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <div id={`${user._id}-channel-user-display-channel-id-${channel_id}`} style={{zIndex: 1}} key={user.username} className='channel-user-placeholder'>
            <div 
            style={{border: `solid 4px ${(user.active && user.microphone) ? activityColor : secondaryColor}`}}
            className='channel-user-placeholder-user-image'>
                <Image objectFit='cover' image={user.user_image} />
            </div>
            <h3 style={{color: textColor}}>{user.display_name}</h3>
            <div 
            style={{backgroundColor: accentColor}}
            className='user-status-wrapper'>
                {user.microphone || user.microphone === undefined ? null : <MicMuted />}
                {user.muted ? <Muted /> : null}
                {user.webcam ? <WebCam /> : null}
                {user.screenshare ? <ScreenShare /> : null}
            </div>
        </div>
    )
}