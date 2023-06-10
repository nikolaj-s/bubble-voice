// library's
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAnimation, motion } from 'framer-motion';

// state
import { selectCurrentServerPageState, handleChangePage } from './ServerNavigationSlice';
import { selectCurrentChannelId, selectUsersPermissions } from '../../ServerSlice';
import { selectAccentColor, selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ServerNavigation.css";
import { VideoRoomIcon } from '../../../../components/Icons/VideoRoomIcon/VideoRoomIcon';
import { SocialIcon } from '../../../../components/Icons/SocialIcon/SocialIcon';
import { WidgetsIcon } from '../../../../components/Icons/WidgetsIcon/WidgetsIcon';
import { PinIcon } from '../../../../components/Icons/PinIcon/PinIcon';
import { MediaIcon } from '../../../../components/Icons/MediaIcon/MediaIcon';
import { SubMenuButton } from '../../../../components/buttons/subMenuButton/SubMenuButton';
import { selectHideUserStatus } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

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
    
    const [videoDesc, toggleVideoDesc] = React.useState(false);

    const [socialDesc, toggleSocialDesc] = React.useState(false);

    const [widgetDesc, toggleWidgetDesc] = React.useState(false);

    const [pinsDesc, togglePinsDesc] = React.useState(false);

    const [mediaDesc, toggleMediaDesc] = React.useState(false);

    const handleAction = (p) => {
        dispatch(handleChangePage(p));
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

    React.useEffect(() => {
        if (page === 'voice') {
            voiceButtonAnimation.start({
                backgroundColor: glassState ? glassColor : secondaryColor,
                cursor: 'default',
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
            })
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor',
            })
        } else if (page === 'social') {
            socialButtonAnimation.start({
                backgroundColor: glassState ? glassColor : secondaryColor,
                cursor: 'default'
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
        } else if (page === 'widgets') {
            widgetsButtonAnimation.start({
                backgroundColor: glassState ? glassColor : secondaryColor,
                cursor: 'default'
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
        } else if (page === 'pins') {
            pinsButtonAnimation.start({
                backgroundColor: glassState ? glassColor : secondaryColor,
                cursor: 'default'
            })
            mediaButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
        } else if (page === 'media') {
            pinsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            mediaButtonAnimation.start({
                backgroundColor: glassState ? glassColor : secondaryColor,
                cursor: 'default'
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            voiceButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
        }
    // eslint-disable-next-line
    }, [page])

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
            <div className='server-navigation-button-wrapper'>
                {inChannel ?
                <>
                <motion.div 
                style={{borderTopLeftRadius: 5}}
                transition={{duration: 0.05}}
                onMouseEnter={() => {handleDesc('video', true)}}
                onMouseOver={() => {handleAnimation(glassState ? glassColor : secondaryColor, voiceButtonAnimation, 'voice')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, voiceButtonAnimation, 'voice')}}
                onMouseLeave={() => {handleDesc('video', false)}}
                onMouseDown={() => {handleAnimation(accentColor, voiceButtonAnimation, 'voice')}}
                onMouseUp={() => {handleAnimation(glassState ? glassColor : secondaryColor, voiceButtonAnimation, 'voice')}}
                animate={voiceButtonAnimation} onClick={() => {handleAction('voice')}} className='server-navigation-button stream-server-button'>
                    {videoDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Stream Room</p> : null}
                    <VideoRoomIcon color={textColor} />
                </motion.div>
                {permissions?.user_can_view_channel_content ? 
                <>
                <motion.div 
                id={'channel-social-tab-button'}
                transition={{duration: 0.05}}
                onMouseEnter={() => {handleDesc('social', true)}}
                onMouseOver={() => {handleAnimation(glassState ? glassColor : secondaryColor, socialButtonAnimation, 'social')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, socialButtonAnimation, 'social')}}
                onMouseLeave={() => {handleDesc('social', false)}}
                onMouseDown={() => {handleAnimation(accentColor, socialButtonAnimation, 'social')}}
                onMouseUp={() => {handleAnimation(glassState ? glassColor : secondaryColor, socialButtonAnimation, 'social')}}
                animate={socialButtonAnimation} onClick={() => {handleAction('social')}} className='server-navigation-button'>
                    {socialDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Social</p> : null}
                    <SocialIcon color={textColor} />
                </motion.div>
                <motion.div 
                onMouseEnter={() => {handleDesc('widgets', true)}}
                onMouseLeave={() => {handleDesc('widgets', false)}}
                transition={{duration: 0.05}}
                onMouseOver={() => {handleAnimation(glassState ? glassColor : secondaryColor, widgetsButtonAnimation, 'widgets')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, widgetsButtonAnimation, 'widgets')}}
                onMouseDown={() => {handleAnimation(accentColor, widgetsButtonAnimation, 'widgets')}}
                onMouseUp={() => {handleAnimation(glassState ? glassColor : secondaryColor, widgetsButtonAnimation, 'widgets')}}
                animate={widgetsButtonAnimation} onClick={() => {handleAction('widgets')}} className='server-navigation-button'>
                    {widgetDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Widgets</p> : null}
                    <WidgetsIcon color={textColor} />
                </motion.div>
                </>
                : null}
                </>
                : null}
                <motion.div 
                onMouseEnter={() => {handleDesc('pins', true)}}
                onMouseLeave={() => {handleDesc('pins', false)}}
                transition={{duration: 0.05}}
                onMouseOver={() => {handleAnimation(glassState ? glassColor : secondaryColor, pinsButtonAnimation, 'pins')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, pinsButtonAnimation, 'pins')}}
                onMouseDown={() => {handleAnimation(accentColor, pinsButtonAnimation, 'pins')}}
                onMouseUp={() => {handleAnimation(glassState ? glassColor : secondaryColor, pinsButtonAnimation, 'pins')}}
                animate={pinsButtonAnimation} onClick={() => {handleAction('pins')}} className='server-navigation-button'>
                    {pinsDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Pins</p> : null}
                    <PinIcon color={textColor} />
                </motion.div>
                <motion.div 
                onMouseEnter={() => {handleDesc('media', true)}}
                onMouseLeave={() => {handleDesc('media', false)}}
                transition={{duration: 0.05}}
                onMouseOver={() => {handleAnimation(glassState ? glassColor : secondaryColor, mediaButtonAnimation, 'media')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, mediaButtonAnimation, 'media')}}
                onMouseDown={() => {handleAnimation(accentColor, mediaButtonAnimation, 'media')}}
                onMouseUp={() => {handleAnimation(glassState ? glassColor : secondaryColor, mediaButtonAnimation, 'media')}}
                animate={mediaButtonAnimation} onClick={() => {handleAction('media')}} className='server-navigation-button'>
                    {mediaDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Media</p> : null}
                    <MediaIcon color={textColor} />
                </motion.div>
               
            </div>
            <motion.div transition={{duration: 0.2}} className='server-navigation-filler'></motion.div>
                {inChannel ? <SubMenuButton desc_width={150} transparent={true} altInvert={true} invert={true} description={"Room Quick Settings"} right_orientation_desc={true}  target={'live-chat-wrapper'} borderRadius={3} zIndex={3} top={0} height={7} left={null} width={15} /> : null}
        </motion.div>
    )
}
