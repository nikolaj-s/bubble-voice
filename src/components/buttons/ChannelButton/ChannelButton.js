// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// components
import { SubMenuButton } from '../subMenuButton/SubMenuButton';
import { ChannelUserDisplay } from './ChannelUserDisplay/ChannelUserDisplay';
import { AltImageIcon } from '../../Icons/AltImageIcon/AltImageIcon';
// state
import {  selectAccentColor, selectActivationColor, selectGlassPrimaryColor, selectPrimaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ChannelButton.css";
import { SocialButton } from '../SocialButton/SocialButton';
import { moveUser, selectChannelSocialId, selectCurrentChannelId, selectUsersPermissions, setChannelSocialId, throwServerError } from '../../../features/server/ServerSlice';
import { SOCIAL_DATA } from '../../../util/LocalData';
import { VoiceDisabledIcon } from '../../Icons/VoiceDisabledIcon/VoiceDisabledIcon';
import { VoiceEnabledIcon } from '../../Icons/VoiceEnabledIcon/VoiceEnabledIcon';
import { LockedChannelIcon } from '../../Icons/LockedChannelIcon/LockedChannelIcon';
import { TextOnlyIcon } from '../../Icons/TextOnlyIcon/TextOnlyIcon';
import { handleChangePage } from '../../../features/server/ChannelRoom/ServerNavigation/ServerNavigationSlice';
import { selectUsername } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { ChannelImageIcon } from '../../ChannelImageIcon/ChannelImageIcon';
import { selectDisableChannelIcons } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { setSelectedMember } from '../../../features/server/ChannelRoom/MemberPanel/MemberPanelSlice';
import { ChannelStatus } from './ChannelStatus/ChannelStatus';
import { RedditIcon } from '../../Icons/RedditIcon/RedditIcon';
import { HistoryIcon } from '../../Icons/HistoryIcon/HistoryIcon';
import { selectLoadingChannel } from '../../../features/server/ChannelRoom/Room/RoomSlice';


export const ChannelButton = ({category_id, collapse, channel, action = () => {}, users, index, move = () => {}, draggingUser, toggleDraggingUser = () => {}, draggingChannel, toggleDraggingChannel}) => {

    const dispatch = useDispatch();

    const [mouseEnter, toggleMouseEnter] = React.useState(false);

    const [unReadMessage, toggleUnReadMessage] = React.useState(false);

    const [moveIndicator, toggleMoveIndicator] = React.useState(false);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const animation = useAnimation();

    const glassColor = useSelector(selectGlassPrimaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const transparentPrimaryColor = useSelector(selectTransparentPrimaryColor);
    
    const currentChannelId = useSelector(selectCurrentChannelId);

    const currentSocialId = useSelector(selectChannelSocialId);

    const activationColor = useSelector(selectActivationColor);

    const username = useSelector(selectUsername);

    const active = (currentChannelId === channel._id) || (currentSocialId === channel._id);

    const disableChannelIcons = useSelector(selectDisableChannelIcons);

    const permissions = useSelector(selectUsersPermissions);

    const loadingChannel = useSelector(selectLoadingChannel);

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

        if (active && !channel.text_only) dispatch(handleChangePage('voice'));
        
        if (loadingChannel) return;
        
        dispatch(setSelectedMember(""));

        action(channel)
    }

    React.useEffect(() => {
       
        animation.start({
            backgroundColor: active ? accentColor : transparentPrimaryColor
        })

    // eslint-disable-next-line
    }, [channel, active])

    React.useEffect(() => {
        try {
            
            const last_message = SOCIAL_DATA.get(channel._id);

            if (channel._id === currentSocialId) return toggleUnReadMessage(false);
            
            if (channel.last_message_id === undefined || !channel.last_message_id) return;
            
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

        dispatch(setChannelSocialId(channel._id));

        dispatch(setSelectedMember(""))

    }

    const onDragOver = (event, dragType) => {

        if (draggingChannel) return;
        
        event.preventDefault();

        handleAnimation(primaryColor, true);

      //  document.getElementById(`channel-wrapper-button-${channel._id}`).style.backgroundColor = primaryColor;
    }

    const onDragLeave = () => {
        if (draggingChannel) return;
    //    document.getElementById(`channel-wrapper-button-${channel._id}`).style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
        handleAnimation(transparentPrimaryColor, false)
    }

    const onDrop = (event) => {
        try {
            
        document.getElementById(`channel-wrapper-button-${channel._id}`).style.backgroundColor = 'rgba(0, 0, 0, 0)';

        if (channel.text_only) return;
        
        const id = event.dataTransfer.getData('text');
     
        if (!id) return;

        const split_id = id.split(' ');

        const selected_username = split_id.length > 2 ? `${split_id[1]} ${split_id[2]}` : split_id[1];

        const channel_id = split_id[0];
       
        if (channel_id === channel._id) return;

        if (selected_username === username) {
            document.getElementById(`channel-button-${channel._id}`).click();
        } else if (selected_username && channel_id) {
            if (!permissions?.user_can_move_users) return dispatch(throwServerError({errorMessage: "ERROR: you are not authorized to move other users"}));

            dispatch(moveUser({username: selected_username, channel_id: channel_id, arg: channel._id}))
        }

        } catch (err) {
            console.log(err)
            dispatch(throwServerError({errorMessage: "An Error Was Thrown When Moving This User"}))
        }
    }

    const handleNewChannelPosition = (e) => {

        try {

            toggleMoveIndicator(false);

            const id = e.dataTransfer.getData('text');

            if (!id || id.split(' ').length > 1) return;
            console.log(channel)
            console.log(id, channel._id, category_id);
            move(id, channel._id, category_id);

        } catch (error) {
            console.log(error);
        }

    }

    const handleDragStart = (e) => {

        e.stopPropagation();

        e.dataTransfer.setData('text/plain', `${channel._id}`);

        toggleDraggingChannel(true);

        console.log('channel drag start')
    }

    const handleDragEnd = (e) => {
        toggleDraggingChannel(false);
    }

    

    return (
        <>
        <div
       
        id={`channel-wrapper-button-${channel._id}`}
        onDragOver={(event) => {onDragOver(event)}}
            onDragLeave={() => {onDragLeave()}}
            onDrop={onDrop}
            
            style={{
                display: (!active && collapse && channel?.users?.length === 0 && !unReadMessage || (!channel.auth && collapse)) ? 'none' : null,
                marginBottom: (channel.auth && channel?.users?.length > 0) ? 10 : null,
                position: 'relative'
            }} 
        >
            <div 
            
            style={{
                backgroundColor: users.length > 0 && channel.auth ? glassColor : null,
                paddingBottom: users.length > 0 && channel.auth ? '5px' : null,
            }}
            className='channel-button-surround-wrapper'>
            <motion.div 
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            id={`channel-button-${channel._id}`}
            animate={animation} 
            onMouseEnter={() => {handleAnimation(primaryColor, true)}}
            onMouseLeave={() => {handleAnimation(transparentPrimaryColor, false); toggleMouseDown(false)}}
            onMouseOver={() => {handleAnimation(primaryColor, true)}}
            onMouseDown={() => {handleAnimation(accentColor); toggleMouseDown(true)}}
            onMouseUp={() => {handleAnimation(primaryColor); toggleMouseDown(false)}}
            onClick={handleAction}
            transition={{duration: 0}}
            style={{
                backgroundColor: active ? accentColor : transparentPrimaryColor,
                cursor: "pointer",
                marginBottom: users.length > 0 && channel.auth && !channel.status ? '8px' : null,
                scale: mouseDown ? 0.95 : 1
            }}
            className='channel-button-container'>
                <div style={{backgroundColor: unReadMessage && channel.auth ? textColor : null}} className='unread-message-indicator'></div>   
                <div style={{opacity: (active || mouseEnter || unReadMessage) && channel.auth ? 1 : 0.85}} className='channel-status-icon-container'>
                    {(channel.icon && disableChannelIcons === false) ?
                    <ChannelImageIcon image={channel.icon} /> : null}
                    {
                    channel?.type === 'mediahistory' ?
                    <HistoryIcon width={20} height={20} />
                    :
                    channel?.type === 'subreddit' ?
                    <RedditIcon />
                    :
                    channel?.type === 'screenshots' ?
                    <AltImageIcon height='20px' width='20px' />
                    :
                    channel.locked_channel ?
                    <LockedChannelIcon /> :
                    channel.text_only ?
                    <TextOnlyIcon /> :
                    channel.disable_streams ? 
                    <VoiceDisabledIcon />
                    :
                    <VoiceEnabledIcon />
                    }
                </div>
                <h3 style={{color: textColor, opacity: (active || mouseEnter || unReadMessage) && channel.auth ? 1 : 0.7, fontWeight: unReadMessage ? 600 : null}}>{channel.channel_name}</h3>
                {mouseEnter || active ? <div className='channel-button-extra-context-wrapper'>
                    {!channel.text_only ? <SocialButton o_mouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}} desc_o_mouse_leave={() => {handleAnimation(transparentPrimaryColor, false)}} flip_description={index === 0 ? true : false} zIndex={active ? 1 : 2} action={openSocial} borderRadius={5} width={17} height={17} padding={6} desc_space={20} /> : null}
                    <SubMenuButton invert={false} altInvert={true} o_mouseLeave={() => {handleAnimation(transparentPrimaryColor, false)}} desc_o_mouse_leave={() => {handleAnimation(transparentPrimaryColor, false)}} flip_description={index === 0 ? true : false} zIndex={active ? 1 : 2} description={"More"} margin={"0px 3px 0px 0px"} target={`channel-button-${channel._id}`} padding={6} width={17} height={17} borderRadius={"5px"} desc_space={20} />
                </div> : null}
            </motion.div>
            {channel?.status && channel?.auth ?
            <ChannelStatus status={channel.status} active={currentChannelId === channel._id} />
            : null}
            {channel.auth ?
            users.map((user) => {
                return (
                    <ChannelUserDisplay dragging={toggleDraggingUser} key={user.username} channel_id={channel._id} user={user} />
                )
            }) : null}
            </div>
            <div onDragOver={(e) => {e.preventDefault()}} style={{width: '100%', height: collapse ? 0 : 10, flexShrink: 0, backgroundColor: moveIndicator && !draggingUser ? activationColor : null, zIndex: draggingChannel ? 2 : -1, pointerEvents: 'all', position: 'absolute', bottom: 0}} onDrop={handleNewChannelPosition} onDragEnter={() => {toggleMoveIndicator(true)}} onDragLeave={() => {toggleMoveIndicator(false)}} />
        </div>

        </>
    )
}
