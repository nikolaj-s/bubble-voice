// library's
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAnimation, motion } from 'framer-motion';

// state
import { selectCurrentServerPageState, handleChangePage } from './ServerNavigationSlice';
import { selectChannelSocialId, selectCurrentChannelId, selectCurrentlyViewChannelSocial, selectUsersPermissions, setChannelSocialId } from '../../ServerSlice';
import { selectAccentColor, selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ServerNavigation.css";
import { VideoRoomIcon } from '../../../../components/Icons/VideoRoomIcon/VideoRoomIcon';
import { SocialIcon } from '../../../../components/Icons/SocialIcon/SocialIcon';
import { WidgetsIcon } from '../../../../components/Icons/WidgetsIcon/WidgetsIcon';
import { PinIcon } from '../../../../components/Icons/PinIcon/PinIcon';
import { MediaIcon } from '../../../../components/Icons/MediaIcon/MediaIcon';
import { AltCloseButton } from '../../../../components/buttons/AltCloseButton/AltCloseButton'
import { selectHideUserStatus } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { OptionsButton } from '../../../../components/buttons/OptionsButton/OptionsButton';
import { TextOnlyIcon } from '../../../../components/Icons/TextOnlyIcon/TextOnlyIcon';
import { setSelectedMember } from '../MemberPanel/MemberPanelSlice';

export const ServerNavigation = () => {

    const dispatch = useDispatch();

    const [width, setWidth] = React.useState(0)

    const primaryColor = useSelector(selectPrimaryColor);

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

    const glassColor = useSelector(selectGlassColor);

    const  glassState = useSelector(selectGlassState);

    const permissions = useSelector(selectUsersPermissions);

    const socialId = useSelector(selectChannelSocialId);

    const socialChannel = useSelector(selectCurrentlyViewChannelSocial);
    
    const [videoDesc, toggleVideoDesc] = React.useState(false);

    const [socialDesc, toggleSocialDesc] = React.useState(false);

    const [widgetDesc, toggleWidgetDesc] = React.useState(false);

    const [pinsDesc, togglePinsDesc] = React.useState(false);

    const [mediaDesc, toggleMediaDesc] = React.useState(false);

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
        }
    // eslint-disable-next-line
    }, [page, socialChannel])

    const resize = () => {
        const el = document.getElementsByClassName('outer-server-page-wrapper')[0];

        if (el) {
            setWidth(el.getBoundingClientRect().width)
        }

        setTimeout(() => {
            const el = document.getElementsByClassName('outer-server-page-wrapper')[0];

            if (el) {
                setWidth(el.getBoundingClientRect().width)
            }
        }, 100)
    }

    React.useEffect(() => {

        resize();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        }

    }, [])

    React.useEffect(() => {

        if (inChannel) {
            handleAction('voice');
        } else {
            handleAction('pins');
        }

        resize();

    }, [inChannel])

    React.useEffect(() => {
        resize();
    }, [hideUsers])

    return (
        <motion.div

        style={{width: width}}
        className='server-navigation-container'>
            {!socialId ?
            <div className='server-navigation-button-wrapper'>
                {inChannel ?
                <>
                <motion.div 
                style={{borderTopLeftRadius: 5}}
                transition={{duration: 0.05}}
                onMouseEnter={() => {handleDesc('video', true)}}
                onMouseOver={() => {handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                onMouseOut={() => {handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, voiceButtonAnimation, 'voice')}}
                onMouseLeave={() => {handleDesc('video', false)}}
                onMouseDown={() => {handleAnimation(accentColor, voiceButtonAnimation, 'voice')}}
                onMouseUp={() => {handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                animate={voiceButtonAnimation} onClick={() => {handleAction('voice')}} className='server-navigation-button stream-server-button'>
                    {videoDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Stream Room</p> : null}
                    <VideoRoomIcon opacity={page === 'voice' ? 1 : 0.6} color={textColor} />
                </motion.div>
                {permissions?.user_can_view_channel_content ? 
                <>
                <motion.div 
                id={'channel-social-tab-button'}
                transition={{duration: 0.05}}
                onMouseEnter={() => {handleDesc('social', true)}}
                onMouseOver={() => {handleAnimation(secondaryColor, socialButtonAnimation, 'social')}}
                onMouseOut={() => {handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, socialButtonAnimation, 'social')}}
                onMouseLeave={() => {handleDesc('social', false)}}
                onMouseDown={() => {handleAnimation(accentColor, socialButtonAnimation, 'social')}}
                onMouseUp={() => {handleAnimation(secondaryColor, socialButtonAnimation, 'social')}}
                animate={socialButtonAnimation} onClick={() => {handleAction('social')}} className='server-navigation-button'>
                    {socialDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Social</p> : null}
                    <SocialIcon opacity={page === 'social' ? 1 : 0.6} color={textColor} />
                </motion.div>
                <motion.div 
                onMouseEnter={() => {handleDesc('widgets', true)}}
                onMouseLeave={() => {handleDesc('widgets', false)}}
                transition={{duration: 0.05}}
                onMouseOver={() => {handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                onMouseOut={() => {handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, widgetsButtonAnimation, 'widgets')}}
                onMouseDown={() => {handleAnimation(accentColor, widgetsButtonAnimation, 'widgets')}}
                onMouseUp={() => {handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                animate={widgetsButtonAnimation} onClick={() => {handleAction('widgets')}} className='server-navigation-button'>
                    {widgetDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Widgets</p> : null}
                    <WidgetsIcon opacity={page === 'widgets' ? 1 : 0.6} color={textColor} />
                </motion.div>
                </>
                : null}
                </>
                : null}
                <motion.div 
                onMouseEnter={() => {handleDesc('pins', true)}}
                onMouseLeave={() => {handleDesc('pins', false)}}
                transition={{duration: 0.05}}
                onMouseOver={() => {handleAnimation(secondaryColor, pinsButtonAnimation, 'pins')}}
                onMouseOut={() => {handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, pinsButtonAnimation, 'pins')}}
                onMouseDown={() => {handleAnimation(accentColor, pinsButtonAnimation, 'pins')}}
                onMouseUp={() => {handleAnimation(secondaryColor, pinsButtonAnimation, 'pins')}}
                animate={pinsButtonAnimation} onClick={() => {handleAction('pins')}} className='server-navigation-button'>
                    {pinsDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Pins</p> : null}
                    <PinIcon opacity={page === 'pins' ? 1 : 0.6} color={textColor} />
                </motion.div>
                <motion.div 
                onMouseEnter={() => {handleDesc('media', true)}}
                onMouseLeave={() => {handleDesc('media', false)}}
                transition={{duration: 0.05}}
                onMouseOver={() => {handleAnimation(secondaryColor, mediaButtonAnimation, 'media')}}
                onMouseOut={() => {handleAnimation(`rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0)`, mediaButtonAnimation, 'media')}}
                onMouseDown={() => {handleAnimation(accentColor, mediaButtonAnimation, 'media')}}
                onMouseUp={() => {handleAnimation(secondaryColor, mediaButtonAnimation, 'media')}}
                animate={mediaButtonAnimation} onClick={() => {handleAction('media')}} className='server-navigation-button'>
                    {mediaDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Media</p> : null}
                    <MediaIcon opacity={page === 'media' ? 1 : 0.6} color={textColor} />
                </motion.div>
               
            </div> :
            <div className='channel-social-header-container'>
                <div className='channel-social-header-wrapper'>
                    <TextOnlyIcon />
                    <h3 style={{color: textColor}}>{socialChannel.channel_name}</h3>
                </div>
                <div className='close-social-route-button'>
                    <AltCloseButton action={closeSocialRoute} margin="0px 0px 0px 5px" width={25} borderRadius={3} height={16} padding={5} />
                </div>
            </div>
            }
            {!socialId ? <div className='server-navigation-filler'></div> : null}
            {inChannel ? <OptionsButton desc_width={100} transparent={true} description={"Room Options"} right_orientation_desc={true}  target={'live-chat-wrapper'} borderRadius={3} zIndex={3} top={0} height={7} left={null} width={15} /> : null}
        </motion.div>
    )
}
