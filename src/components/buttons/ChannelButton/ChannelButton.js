// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// components
import { SubMenuButton } from '../subMenuButton/SubMenuButton';
import { ChannelUserDisplay } from './ChannelUserDisplay/ChannelUserDisplay';

// state
import {  selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelButton.css";
import { SocialButton } from '../SocialButton/SocialButton';
import { setChannelSocialId } from '../../../features/server/ServerSlice';


export const ChannelButton = ({channel, action = () => {}, users, index}) => {

    const dispatch = useDispatch();

    const [usersState, setUsersState] = React.useState([]);

    const [mouseEnter, toggleMouseEnter] = React.useState(false);

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const active = window.location.hash.includes(channel._id);

    const handleAnimation = (color, enter) => {
        if (enter) {
            toggleMouseEnter(true)
        } else {
            toggleMouseEnter(false)
        }

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
    
    const openSocial = (e) => {
        e.stopPropagation();

        dispatch(setChannelSocialId(channel._id))
    }

    return (
        <>
            <motion.div 
            id={`channel-button-${channel._id}`}
            animate={animation} 
            onMouseEnter={() => {handleAnimation(accentColor, true)}}
            onMouseLeave={() => {handleAnimation(primaryColor, false)}}
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
                {mouseEnter ? <div className='channel-button-extra-context-wrapper'>
                    <SocialButton action={openSocial} margin={'0 5px 0 0'} borderRadius={10} width={12} height={12} />
                    <SubMenuButton zIndex={1} description={"More"} target={`channel-button-${channel._id}`} width={12} height={12} borderRadius={10} />
                </div> : null}
            </motion.div>
            {usersState.map((user) => {
                return (
                    <ChannelUserDisplay key={user.username} channel_id={channel._id} user={user} />
                )
            })}
        </>
    )
}
