// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { SubMenuButton } from '../subMenuButton/SubMenuButton';

// state
import {  selectAccentColor, selectPrimaryColor, selectActivationColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelButton.css";
import { Image } from '../../Image/Image';
import { MicMuted } from '../../Icons/MicMuted/MicMuted';
import { WebCam } from '../../Icons/WebCam/WebCam';
import { ScreenShare } from '../../Icons/ScreenShare/ScreenShare';
import { Muted } from '../../Icons/Muted/Muted';

const User = ({user, channel_id}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const activityColor = useSelector(selectActivationColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div id={`${user._id}-channel-user-display-channel-id-${channel_id}`} style={{zIndex: 1}} key={user.username} className='channel-user-placeholder'>
            <div 
            style={{border: `solid 4px ${user.active ? activityColor : secondaryColor}`}}
            className='channel-user-placeholder-user-image'>
                <Image objectFit='cover' image={user.user_image} />
            </div>
            <h3 style={{color: textColor}}>{user.display_name}</h3>
            <div className='user-status-wrapper'>
                {user.microphone || user.microphone === undefined ? null : <MicMuted />}
                {user.muted ? <Muted /> : null}
                {user.webcam ? <WebCam /> : null}
                {user.screenshare ? <ScreenShare /> : null}
            </div>
        </div>
    )
}

export const ChannelButton = ({channel, action = () => {}, users}) => {

    const [usersState, setUsersState] = React.useState([]);

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handleAnimation = (color) => {
        if (channel.active) return;
        animation.start({
            border: `solid 4px ${color}`
        })
    }

    const handleAction = () => {
        action(channel)
    }

    React.useEffect(() => {
        animation.start({
            border: `solid 4px ${channel.active ? accentColor : primaryColor}`
        })
        setUsersState(users)
    // eslint-disable-next-line
    }, [channel, users])

    return (
        <>
            <motion.div 
            id={`channel-button-${channel._id}`}
            animate={animation} 
            onMouseEnter={() => {handleAnimation(accentColor)}}
            onMouseLeave={() => {handleAnimation(primaryColor)}}
            onMouseDown={() => {handleAnimation(textColor)}}
            onMouseUp={() => {handleAnimation(accentColor)}}
            onClick={handleAction}
            style={{
                border: `solid 4px ${channel.active ? accentColor : primaryColor}`,
                backgroundColor: channel.active ? accentColor : primaryColor,
                cursor: channel.active ? "default" : "pointer",
            }}
            className='channel-button-container'>
              <h3 style={{color: textColor}}>{channel.channel_name}</h3>  
              <SubMenuButton />
            </motion.div>
            {usersState.map((user) => {
                return (
                    <User key={user.username} channel_id={channel._id} user={user} />
                )
            })}
        </>
    )
}
