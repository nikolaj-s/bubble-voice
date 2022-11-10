// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { SubMenuButton } from '../subMenuButton/SubMenuButton';
import { ChannelUserDisplay } from './ChannelUserDisplay/ChannelUserDisplay';

// state
import {  selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelButton.css";


export const ChannelButton = ({channel, action = () => {}, users, index}) => {

    const [usersState, setUsersState] = React.useState([]);

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const active = window.location.hash.includes(channel._id);

    const handleAnimation = (color) => {
        if (active) return;
        animation.start({
            border: `solid 4px ${color}`
        })
    }

    const handleAction = () => {
        action(channel)
    }

    React.useEffect(() => {
       
        animation.start({
            border: `solid 4px ${active ? accentColor : primaryColor}`
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
                border: `solid 4px ${active ? accentColor : primaryColor}`,
                backgroundColor: active ? accentColor : primaryColor,
                cursor: active ? "default" : "pointer",
            }}
            className='channel-button-container'>
              <h3 style={{color: textColor}}>{channel.channel_name}</h3>  
              <SubMenuButton zIndex={1} flip_description={index === 0 ? true : false} description={"More"} target={`channel-button-${channel._id}`} width={12} height={12} borderRadius={10} />
            </motion.div>
            {usersState.map((user) => {
                return (
                    <ChannelUserDisplay key={user.username} channel_id={channel._id} user={user} />
                )
            })}
        </>
    )
}
