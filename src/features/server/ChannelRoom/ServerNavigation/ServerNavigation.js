// library's
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAnimation, motion } from 'framer-motion';

// state
import { selectCurrentServerPageState, handleChangePage } from './ServerNavigationSlice';
import { selectChannelSocialId, selectCurrentChannel, selectCurrentChannelId, selectCurrentlyViewChannelSocial, selectUsersPermissions, setChannelSocialId } from '../../ServerSlice';
import { selectAccentColor, selectOnMacOs, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ServerNavigation.css";
import { VideoRoomIcon } from '../../../../components/Icons/VideoRoomIcon/VideoRoomIcon';
import { SocialIcon } from '../../../../components/Icons/SocialIcon/SocialIcon';
import { WidgetsIcon } from '../../../../components/Icons/WidgetsIcon/WidgetsIcon';
import { PinIcon } from '../../../../components/Icons/PinIcon/PinIcon';
import { MediaIcon } from '../../../../components/Icons/MediaIcon/MediaIcon';
import { AltCloseButton } from '../../../../components/buttons/AltCloseButton/AltCloseButton'
import { miscSettingsChannelSpecificStateChange, selectHideUserStatus, selectWebVersion } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { OptionsButton } from '../../../../components/buttons/OptionsButton/OptionsButton';
import { TextOnlyIcon } from '../../../../components/Icons/TextOnlyIcon/TextOnlyIcon';
import { setSelectedMember } from '../MemberPanel/MemberPanelSlice';
import { ActivityIcon } from '../../../../components/Icons/ActivityIcon/ActivityIcon';
import { SOCIAL_DATA } from '../../../../util/LocalData';
import { SocialFilterButton } from '../../../../components/buttons/SocialFilterButton/SocialFilterButton';
import { selectFilterMenuOpen, toggleFilterMenu } from '../../SocialSlice';
import { UserBarToggleButton } from '../../../../components/buttons/UserBarToggleButton/UserBarToggleButton';
import { selectChannelSpecificStateSettings } from '../../../contextMenu/contextMenuSlice';
import { setExpandedContent } from '../../../ExpandContent/ExpandContentSlice';

export const ServerNavigation = () => {

    const dispatch = useDispatch();

    const usingWebVersion = useSelector(selectWebVersion);

    const onMacOs = useSelector(selectOnMacOs);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const hideUsers = useSelector(selectHideUserStatus);

    const page = useSelector(selectCurrentServerPageState);

    const inChannel = useSelector(selectCurrentChannelId);

    const voiceButtonAnimation = useAnimation();

    const socialButtonAnimation = useAnimation();

    const widgetsButtonAnimation = useAnimation();

    const pinsButtonAnimation = useAnimation();

    const mediaButtonAnimation = useAnimation();

    const activityButtonAnimation = useAnimation();

    const permissions = useSelector(selectUsersPermissions);

    const socialId = useSelector(selectChannelSocialId);

    const socialChannel = useSelector(selectCurrentlyViewChannelSocial);

    const channel = useSelector(selectCurrentChannel);

    const filterMenuOpen = useSelector(selectFilterMenuOpen);
    
    const [videoDesc, toggleVideoDesc] = React.useState(false);

    const [socialDesc, toggleSocialDesc] = React.useState(false);

    const [widgetDesc, toggleWidgetDesc] = React.useState(false);

    const [pinsDesc, togglePinsDesc] = React.useState(false);

    const [mediaDesc, toggleMediaDesc] = React.useState(false);

    const [activityDesc, toggleActivityDesc] = React.useState(false);

    const [unReadMessage, toggleUnreadMessage] = React.useState(false);

    React.useEffect(() => {

        if (page === 'social') {
            toggleUnreadMessage(false);
            return;
        }

        const last_message = SOCIAL_DATA.get(inChannel);
        
        if (!last_message?.message_id || !channel?.last_message_id) return;

        if (last_message?.message_id !== channel?.last_message_id) {

            toggleUnreadMessage(true);

        }

        return () => {
            toggleUnreadMessage(false);
        }

    }, [page, channel, SOCIAL_DATA])

    const handleAction = (p) => {
        dispatch(handleChangePage(p));

        dispatch(setSelectedMember(""));
    }

    const handleAnimation = (color, type, p) => {
        
        if (p === page) return;
        type.start({
            backgroundColor: color,
            cursor: 'pointer',
        })
    }

    const handleDesc = (type, action) => {
        if (type === 'video') {
            toggleVideoDesc(action);
        } else if (type === 'widgets') {
            toggleWidgetDesc(action);
        } else if (type === 'pins') {
            togglePinsDesc(action); 
        } else if (type === 'media') {
            toggleMediaDesc(action);
        }else if (type === 'activity') {
            toggleActivityDesc(action)
        } else {
            toggleSocialDesc(action);
        }
    }

    const closeSocialRoute = () => {
        dispatch(setChannelSocialId(""));
        dispatch(setSelectedMember(""))
    }

    React.useEffect(() => {

        if (page === 'voice') {
            voiceButtonAnimation.start({
                backgroundColor: accentColor,
                cursor: 'default',
               
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            activityButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
               
            })
        } else if (page === 'social') {
            socialButtonAnimation.start({
                backgroundColor: accentColor,
                cursor: 'default',
               
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            activityButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
               
            })
        } else if (page === 'widgets') {
            widgetsButtonAnimation.start({
                backgroundColor: accentColor,
                cursor: 'default',
               
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            activityButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
               
            })
        } else if (page === 'pins') {
            pinsButtonAnimation.start({
                backgroundColor: accentColor,
                cursor: 'default',
               
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            activityButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
               
            })
        } else if (page === 'media') {
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
               
            })
            mediaButtonAnimation.start({
                backgroundColor: accentColor,
                cursor: 'default',
                
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            activityButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
               
            })
        } else if (page === 'activity') {
            activityButtonAnimation.start({
                backgroundColor: accentColor,
                cursor: 'default',
                
            })
            
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
               
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
                
            })
        }
    // eslint-disable-next-line
    }, [page, socialId])

    React.useEffect(() => {

        if (inChannel) {
            handleAction('voice');
        } else {
            handleAction('activity');
        }
    // eslint-disable-next-line
    }, [inChannel])

    const openSocialFilterMenu = () => {
        dispatch(toggleFilterMenu(!filterMenuOpen))
    }

    const toggleHideUsers = () => {
        dispatch(miscSettingsChannelSpecificStateChange("hideUserStatus"));
    }

    const openChannelInfo = () => {
        dispatch(setExpandedContent({content_type: 'channel-info', ...socialChannel}));
    }

    return (
        <motion.div
        style={{
            maxWidth: (hideUsers) ? 'calc(100% - 378px)' : 'calc(100% - 378px)'
        }}
        className='server-navigation-container'>
            {!socialId ?
            <div
            
            className='server-navigation-button-wrapper'>
                {inChannel ?
                <>
                <motion.div 
                transition={{duration: 0.05}}
                onMouseEnter={() => {handleDesc('video', true); handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                onMouseLeave={() => {handleDesc('video', false); handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, voiceButtonAnimation, 'voice')}}
                onMouseDown={() => {handleAnimation(accentColor, voiceButtonAnimation, 'voice')}}
                onMouseUp={() => {handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                animate={voiceButtonAnimation} onClick={() => {handleAction('voice')}} className='server-navigation-button stream-server-button'>
                    {videoDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Stream Room</p> : null}
                    <VideoRoomIcon opacity={page === 'voice' || videoDesc ? 1 : 0.6} color={textColor} />
                </motion.div>
                {permissions?.user_can_view_channel_content ? 
                <>
                
                <motion.div 
                onMouseEnter={() => {handleDesc('widgets', true); handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                onMouseLeave={() => {handleDesc('widgets', false);handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, widgetsButtonAnimation, 'widgets')}}
                transition={{duration: 0.05}}
                onMouseDown={() => {handleAnimation(accentColor, widgetsButtonAnimation, 'widgets')}}
                onMouseUp={() => {handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                animate={widgetsButtonAnimation} onClick={() => {handleAction('widgets')}} className='server-navigation-button'>
                    {widgetDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Widgets</p> : null}
                    <WidgetsIcon opacity={page === 'widgets' || widgetDesc ? 1 : 0.6} color={textColor} />
                </motion.div>
                </>
                : null}
                </>
                : null}
                <motion.div 
                onMouseEnter={() => {handleDesc('activity', true);handleAnimation(secondaryColor, activityButtonAnimation, 'activity')}}
                onMouseLeave={() => {handleDesc('activity', false);handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, activityButtonAnimation, 'activity')}}
                transition={{duration: 0.05}}
                onMouseDown={() => {handleAnimation(accentColor, activityButtonAnimation, 'activity')}}
                onMouseUp={() => {handleAnimation(secondaryColor, activityButtonAnimation, 'activity')}}
                animate={activityButtonAnimation} onClick={() => {handleAction('activity')}} className='server-navigation-button'>
                    {activityDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Dashboard</p> : null}
                    <ActivityIcon opacity={page === 'activity' || activityDesc ? 1 : 0.6} color={textColor} />
                </motion.div>
                <motion.div 
                onMouseEnter={() => {handleDesc('pins', true); handleAnimation(secondaryColor, pinsButtonAnimation, 'pins')}}
                onMouseLeave={() => {handleDesc('pins', false); handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, pinsButtonAnimation, 'pins')}}
                transition={{duration: 0.05}}
                onMouseDown={() => {handleAnimation(accentColor, pinsButtonAnimation, 'pins')}}
                onMouseUp={() => {handleAnimation(secondaryColor, pinsButtonAnimation, 'pins')}}
                animate={pinsButtonAnimation} onClick={() => {handleAction('pins')}} className='server-navigation-button'>
                    {pinsDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Pins</p> : null}
                    <PinIcon opacity={page === 'pins' || pinsDesc ? 1 : 0.6} color={textColor} />
                </motion.div>
                <motion.div 
                onMouseEnter={() => {handleDesc('media', true); handleAnimation(secondaryColor, mediaButtonAnimation, 'media')}}
                onMouseLeave={() => {handleDesc('media', false); handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, mediaButtonAnimation, 'media')}}
                transition={{duration: 0.05}}
                onMouseDown={() => {handleAnimation(accentColor, mediaButtonAnimation, 'media')}}
                onMouseUp={() => {handleAnimation(secondaryColor, mediaButtonAnimation, 'media')}}
                animate={mediaButtonAnimation} onClick={() => {handleAction('media')}} className='server-navigation-button'>
                    {mediaDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Media</p> : null}
                    <MediaIcon opacity={page === 'media' || mediaDesc ? 1 : 0.6} color={textColor} />
                </motion.div>
               
            </div> :
            <div className='channel-social-header-container'>
                <div className='channel-social-header-wrapper'>
                    <TextOnlyIcon />
                    <h3 style={{color: textColor}}>{socialChannel.channel_name}</h3>
                    {socialChannel?.guidelines ?
                    <>
                    <div
                    style={{
                        height: 20,
                        width: 2,
                        margin: '0px 5px',
                        flexShrink: 0,
                        backgroundColor: textColor,
                        opacity: 0.5
                    }}
                    />
                    <p 
                    onClick={openChannelInfo}
                    id={'social-channel-guide-lines-notice'}
                    style={{
                        color: textColor,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        wordBreak: 'keep-all',
                        whiteSpace: 'nowrap',
                        wordWrap: 'normal',
                        fontSize: '0.9rem',
                        maxWidth: '100%',
                        flexShrink: 4
                    }}>{socialChannel?.guidelines}</p>
                    </>
                    : null}
                </div>
                
            </div>
            }
            <div
            style={{
                width: 'auto',
                height: 30,
                display: 'flex',
                alignItems: 'center'
            }}
            >
            {!socialId ? <div className='server-navigation-filler'></div> : null}
            {socialChannel?.type === 'screenshots' || socialChannel?.type === 'subreddit' ? null :
            socialId || page === 'social' ?
            <SocialFilterButton action={openSocialFilterMenu} flip_description={true} description={"Filter"} width={62} borderRadius={0} height={'100%'} />
            : null}
            {inChannel && !socialId ? <OptionsButton desc_width={100} transparent={true} right_orientation_desc={true}  target={'live-chat-wrapper'} borderRadius={0} zIndex={3} top={0} height={'calc(100%)'} left={null} width={15} /> : null}
            <UserBarToggleButton action={toggleHideUsers} state={!hideUsers} width={15} borderRadius={0} height={'100%'} />
            
            </div>
        </motion.div>
    )
}
