// library's
import { useAnimation, motion } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { SocialIcon } from '../../../../../components/Icons/SocialIcon/SocialIcon';
import { VideoRoomIcon } from '../../../../../components/Icons/VideoRoomIcon/VideoRoomIcon';
import { WidgetsIcon } from '../../../../../components/Icons/WidgetsIcon/WidgetsIcon';

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectUsersPermissions } from '../../../ServerSlice';

// style
import "./RoomNavigation.css";

export const RoomNavigation = ({page, action}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const voiceButtonAnimation = useAnimation();

    const socialButtonAnimation = useAnimation();

    const widgetsButtonAnimation = useAnimation();

    const permissions = useSelector(selectUsersPermissions);

    const [videoDesc, toggleVideoDesc] = React.useState(false);

    const [socialDesc, toggleSocialDesc] = React.useState(false);

    const [widgetDesc, toggleWidgetDesc] = React.useState(false);

    const handleAction = (p) => {
        action(p)
    }

    const handleAnimation = (color, type, p) => {
        if (p === page) return;
        type.start({
            backgroundColor: color,
            cursor: 'pointer'
        })
    } 

    React.useEffect(() => {
        if (page === 'voice') {
            voiceButtonAnimation.start({
                backgroundColor: secondaryColor,
                cursor: 'default'
            })
            socialButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
            widgetsButtonAnimation.start({
                backgroundColor: `rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`,
                cursor: 'cursor'
            })
        } else if (page === 'social') {
            socialButtonAnimation.start({
                backgroundColor: secondaryColor,
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
        } else if (page === 'widgets') {
            widgetsButtonAnimation.start({
                backgroundColor: secondaryColor,
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
        }
    // eslint-disable-next-line
    }, [page])

    const handleDesc = (type, action) => {
        if (type === 'video') {
            toggleVideoDesc(action);
        } else if (type === 'widgets') {
            toggleWidgetDesc(action);
        } else {
            toggleSocialDesc(action);
        }
    }

    return (
        <div 
        style={{marginBottom: 1}}
        className='room-navigation-container'>
            <div className='room-navigation-button-wrapper'>
                <motion.div 
                transition={{duration: 0.2}}
                onMouseEnter={() => {handleDesc('video', true)}}
                onMouseOver={() => {handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, voiceButtonAnimation, 'voice')}}
                onMouseLeave={() => {handleDesc('video', false)}}
                onMouseDown={() => {handleAnimation(accentColor, voiceButtonAnimation, 'voice')}}
                onMouseUp={() => {handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                animate={voiceButtonAnimation} onClick={() => {handleAction('voice')}} className='room-navigation-button stream-room-button'>
                    {videoDesc ? <p style={{color: textColor, backgroundColor: secondaryColor, marginLeft: 20}}>Stream Room</p> : null}
                    <VideoRoomIcon color={textColor} />
                </motion.div>
                {permissions?.user_can_view_channel_content ? 
                <>
                <motion.div 
                id={'channel-social-tab-button'}
                transition={{duration: 0.2}}
                onMouseEnter={() => {handleDesc('social', true)}}
                onMouseOver={() => {handleAnimation(secondaryColor, socialButtonAnimation, 'social')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, socialButtonAnimation, 'social')}}
                onMouseLeave={() => {handleDesc('social', false)}}
                onMouseDown={() => {handleAnimation(accentColor, socialButtonAnimation, 'social')}}
                onMouseUp={() => {handleAnimation(secondaryColor, socialButtonAnimation, 'social')}}
                animate={socialButtonAnimation} onClick={() => {handleAction('social')}} className='room-navigation-button'>
                    {socialDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Social</p> : null}
                    <SocialIcon color={textColor} />
                </motion.div>
                <motion.div 
                onMouseEnter={() => {handleDesc('widgets', true)}}
                onMouseLeave={() => {handleDesc('widgets', false)}}
                transition={{duration: 0.2}}
                onMouseOver={() => {handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                onMouseOut={() => {handleAnimation(`rgba(${primaryColor.split('rgb(')[1].split(')')[0]}, 0)`, widgetsButtonAnimation, 'widgets')}}
                onMouseDown={() => {handleAnimation(accentColor, widgetsButtonAnimation, 'widgets')}}
                onMouseUp={() => {handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                animate={widgetsButtonAnimation} onClick={() => {handleAction('widgets')}} className='room-navigation-button'>
                    {widgetDesc ? <p style={{color: textColor, backgroundColor: secondaryColor}}>Widgets</p> : null}
                    <WidgetsIcon color={textColor} />
                </motion.div>
                </>
                : null}
                <div style={{backgroundColor: secondaryColor}} className='room-navigation-filler'></div>
            </div>
        </div>
    )
}
