// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// components
import { SubMenuButton } from '../subMenuButton/SubMenuButton';
import { ChannelUserDisplay } from './ChannelUserDisplay/ChannelUserDisplay';

// state
import {  selectAccentColor, selectPrimaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelButton.css";
import { SocialButton } from '../SocialButton/SocialButton';
import { selectChannelSocialId, selectCurrentChannelId, setChannelSocialId } from '../../../features/server/ServerSlice';
import { SOCIAL_DATA } from '../../../util/LocalData';


export const ChannelButton = ({channel, action = () => {}, users, index}) => {

    const dispatch = useDispatch();

    const [usersState, setUsersState] = React.useState([]);

    const [mouseEnter, toggleMouseEnter] = React.useState(false);

    const [unReadMessage, toggleUnReadMessage] = React.useState(false);

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const transparentPrimaryColor = useSelector(selectTransparentPrimaryColor);

    const active = window.location.hash.includes(channel._id);

    const currentChannelId = useSelector(selectCurrentChannelId);

    const currentSocialId = useSelector(selectChannelSocialId);

    const handleAnimation = (color, enter) => {
        if (enter) {
            toggleMouseEnter(true)
        } else {
            toggleMouseEnter(false)
        }

        if (active) return;

        animation.start({
            border: `solid 4px ${color}`,
            backgroundColor: color
        })
    }

    const handleAction = () => {
        action(channel)
    }

    React.useEffect(() => {
       
        animation.start({
            border: `solid 4px ${active ? primaryColor : transparentPrimaryColor}`,
            backgroundColor: active ? primaryColor : transparentPrimaryColor
        })

        setUsersState(users);


    // eslint-disable-next-line
    }, [channel, users])

    React.useEffect(() => {
        try {
            
            const last_message = SOCIAL_DATA.get(channel._id);

            if (channel._id === currentChannelId || channel._id === currentSocialId) return toggleUnReadMessage(false);

            if ((last_message?.message_id !== channel?.social[0]._id)) {
                toggleUnReadMessage(true);
            }

        } catch (error) {
            return;
        }
    }, [channel.social, SOCIAL_DATA, currentChannelId, currentSocialId])
    
    const openSocial = (e) => {
        e.stopPropagation();

        dispatch(setChannelSocialId(channel._id))
    }

    return (
        <>
            <motion.div 
            id={`channel-button-${channel._id}`}
            animate={animation} 
            onMouseEnter={() => {handleAnimation(primaryColor, true)}}
            onMouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}}
            onMouseDown={() => {handleAnimation(accentColor)}}
            onMouseUp={() => {handleAnimation(primaryColor)}}
            onClick={handleAction}
            transition={{duration: 0.1}}
            style={{
                border: `solid 4px ${active ? primaryColor : transparentPrimaryColor}`,
                backgroundColor: active ? accentColor : transparentPrimaryColor,
                cursor: active ? "default" : "pointer",
            }}
            className='channel-button-container'>
                {unReadMessage ?
                <div style={{backgroundColor: textColor}} className='unread-message-indicator'></div>
                : null}
                <h3 style={{color: textColor, opacity: (active || mouseEnter || unReadMessage) ? 1 : 0.7}}>{channel.channel_name}</h3>
                {mouseEnter ? <div className='channel-button-extra-context-wrapper'>
                    <SocialButton o_mouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}} desc_o_mouse_leave={() => {handleAnimation(transparentPrimaryColor, false)}} flip_description={index === 0 ? true : false} zIndex={index === 0 ? 2 : 1} action={openSocial} margin={'0 5px 0 0'} borderRadius={4} width={20} height={20} padding={4} desc_space={10} />
                    <SubMenuButton invert={false} altInvert={true} o_mouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}} desc_o_mouse_leave={() => {handleAnimation(transparentPrimaryColor, false)}} flip_description={index === 0 ? true : false} zIndex={index === 0 ? 2 : 1} description={"More"} target={`channel-button-${channel._id}`} padding={4} width={20} height={20} borderRadius={4} desc_space={10} />
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
