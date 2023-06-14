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
import { moveUser, selectChannelSocialId, selectCurrentChannelId, setChannelSocialId, throwServerError } from '../../../features/server/ServerSlice';
import { SOCIAL_DATA } from '../../../util/LocalData';
import { VoiceDisabledIcon } from '../../Icons/VoiceDisabledIcon/VoiceDisabledIcon';
import { VoiceEnabledIcon } from '../../Icons/VoiceEnabledIcon/VoiceEnabledIcon';
import { LockedChannelIcon } from '../../Icons/LockedChannelIcon/LockedChannelIcon';
import { TextOnlyIcon } from '../../Icons/TextOnlyIcon/TextOnlyIcon';
import { handleChangePage } from '../../../features/server/ChannelRoom/ServerNavigation/ServerNavigationSlice';
import { selectUsername } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { ChannelImageIcon } from '../../ChannelImageIcon/ChannelImageIcon';
import { selectDisableChannelIcons } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';


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
    
    const currentChannelId = useSelector(selectCurrentChannelId);

    const currentSocialId = useSelector(selectChannelSocialId);

    const username = useSelector(selectUsername);

    const active = (currentChannelId === channel._id) || (currentSocialId === channel._id);

    const disableChannelIcons = useSelector(selectDisableChannelIcons);

    React.useEffect(() => {

        if (!active && !mouseEnter) {
            animation.start({backgroundColor: transparentPrimaryColor})
        }

    }, [active, mouseEnter])

    const handleAnimation = (color, enter) => {
        if (enter) {
            toggleMouseEnter(true)
        } else {
            toggleMouseEnter(false)
        }

        if (active) return;

        animation.start({
            backgroundColor: color
        })
    }

    const handleAction = () => {
        
        if (channel.auth === false) return dispatch(throwServerError({errorMessage: "Whoops This Channel Has Been Made Available To Only Certain Users!"}));

        if (channel.text_only) return dispatch(setChannelSocialId(channel._id));

        if (active) dispatch(setChannelSocialId(null));;

        action(channel)
    }

    React.useEffect(() => {
       
        animation.start({
            backgroundColor: active ? primaryColor : transparentPrimaryColor
        })

    // eslint-disable-next-line
    }, [channel])

    React.useEffect(() => {
        try {
            
            const last_message = SOCIAL_DATA.get(channel._id);

            if (channel._id === currentChannelId || channel._id === currentSocialId) return toggleUnReadMessage(false);
            
            if (channel.last_message_id === undefined) return;
            
            if (last_message?.message_id !== channel?.last_message_id) {
                toggleUnReadMessage(true);
            }

        } catch (error) {
            return;
        }
    }, [channel.last_message_id, SOCIAL_DATA, currentChannelId, currentSocialId])
    
    const openSocial = (e) => {
        e.stopPropagation();

        if (channel.auth === false) return dispatch(throwServerError({errorMessage: "Whoops This Channel Has Been Made Available To Only Certain Users!"}));

        if (channel._id === currentChannelId) {

            dispatch(handleChangePage('social'));

            dispatch(setChannelSocialId(null));
        } else {
            dispatch(setChannelSocialId(channel._id));
        }

        
    }

    const onDragOver = (event) => {

        if (channel.text_only) return;

        event.preventDefault();

        handleAnimation(primaryColor, true);

        document.getElementById(`channel-wrapper-button-${channel._id}`).style.backgroundColor = primaryColor;
    }

    const onDragLeave = () => {

        if (channel.text_only) return;

        document.getElementById(`channel-wrapper-button-${channel._id}`).style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
        handleAnimation(transparentPrimaryColor, false)
    }

    const onDrop = (event) => {

        document.getElementById(`channel-wrapper-button-${channel._id}`).style.backgroundColor = 'rgba(0, 0, 0, 0)';

        if (channel.text_only) return;
        
        const id = event.dataTransfer.getData('text');
        
        if (!id) return;

        const selected_username = id.split(' ')[1];

        const channel_id = id.split(' ')[0];
        
        if (channel_id === channel._id) return;

        if (selected_username === username) {
            document.getElementById(`channel-button-${channel._id}`).click();
        } else if (selected_username && channel_id) {
            
            dispatch(moveUser({username: selected_username, channel_id: channel_id, arg: channel._id}))
        }
    }
    
    return (
        <div
        id={`channel-wrapper-button-${channel._id}`}
        onDragOver={(event) => {onDragOver(event)}}
            onDragLeave={() => {onDragLeave()}}
            onDrop={onDrop}
        >
            <motion.div 
            
            id={`channel-button-${channel._id}`}
            animate={animation} 
            onMouseEnter={() => {handleAnimation(primaryColor, true)}}
            onMouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}}
            onMouseOver={() => {handleAnimation(primaryColor, true)}}
            onMouseDown={() => {handleAnimation(accentColor)}}
            onMouseUp={() => {handleAnimation(primaryColor)}}
            onClick={handleAction}
            transition={{duration: 0}}
            style={{
                backgroundColor: active ? accentColor : transparentPrimaryColor,
                cursor: active ? "default" : "pointer",
            }}
            className='channel-button-container'>
                <div style={{backgroundColor: unReadMessage && channel.auth ? textColor : null}} className='unread-message-indicator'></div>   
                <div style={{opacity: (active || mouseEnter || unReadMessage) && channel.auth ? 1 : 0.85}} className='channel-status-icon-container'>
                    {(channel.icon && disableChannelIcons === false) ?
                    <ChannelImageIcon image={channel.icon} /> : null}
                    {channel.locked_channel ?
                    <LockedChannelIcon /> :
                    channel.text_only ?
                    <TextOnlyIcon /> :
                    channel.disable_streams ? 
                    <VoiceDisabledIcon />
                    :
                    <VoiceEnabledIcon />
                    }
                </div>
                <h3 style={{color: textColor, opacity: (active || mouseEnter || unReadMessage) && channel.auth ? 1 : 0.7}}>{channel.channel_name}</h3>
                {mouseEnter ? <div className='channel-button-extra-context-wrapper'>
                    {!channel.text_only ? <SocialButton o_mouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}} desc_o_mouse_leave={() => {handleAnimation(transparentPrimaryColor, false)}} flip_description={index === 0 ? true : false} zIndex={index === 0 ? 2 : 1} action={openSocial} borderRadius={4} width={15} height={15} padding={4} desc_space={12} /> : null}
                    <SubMenuButton invert={false} altInvert={true} o_mouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}} desc_o_mouse_leave={() => {handleAnimation(transparentPrimaryColor, false)}} flip_description={index === 0 ? true : false} zIndex={index === 0 ? 2 : 1} description={"More"} target={`channel-button-${channel._id}`} padding={4} width={15} height={15} borderRadius={4} desc_space={12} />
                </div> : null}
            </motion.div>
            {channel.auth ?
            users.map((user) => {
                return (
                    <ChannelUserDisplay key={user.username} channel_id={channel._id} user={user} />
                )
            }) : null}
        </div>
    )
}
