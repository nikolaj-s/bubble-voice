// library's
import { useAnimation, motion } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';

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
                backgroundColor: primaryColor,
                cursor: 'cursor'
            })
            widgetsButtonAnimation.start({
                backgroundColor: primaryColor,
                cursor: 'cursor'
            })
        } else if (page === 'social') {
            socialButtonAnimation.start({
                backgroundColor: secondaryColor,
                cursor: 'default'
            })
            voiceButtonAnimation.start({
                backgroundColor: primaryColor,
                cursor: 'cursor'
            })
            widgetsButtonAnimation.start({
                backgroundColor: primaryColor,
                cursor: 'cursor'
            })
        } else if (page === 'widgets') {
            widgetsButtonAnimation.start({
                backgroundColor: secondaryColor,
                cursor: 'default'
            })
            socialButtonAnimation.start({
                backgroundColor: primaryColor,
                cursor: 'cursor'
            })
            voiceButtonAnimation.start({
                backgroundColor: primaryColor,
                cursor: 'cursor'
            })
        }
    // eslint-disable-next-line
    }, [page])

    return (
        <div className='room-navigation-container'>
            <div className='room-navigation-button-wrapper'>
                <motion.div 
                transition={{duration: 0.2}}
                onMouseOver={() => {handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                onMouseOut={() => {handleAnimation(primaryColor, voiceButtonAnimation, 'voice')}}
                onMouseDown={() => {handleAnimation(accentColor, voiceButtonAnimation, 'voice')}}
                onMouseUp={() => {handleAnimation(secondaryColor, voiceButtonAnimation, 'voice')}}
                animate={voiceButtonAnimation} onClick={() => {handleAction('voice')}} className='room-navigation-button'>
                    <h3
                    style={{color: textColor}}
                    >Voice / Video</h3>
                </motion.div>
                {permissions?.user_can_view_channel_content ? 
                <>
                <motion.div 
                transition={{duration: 0.2}}
                onMouseOver={() => {handleAnimation(secondaryColor, socialButtonAnimation, 'social')}}
                onMouseOut={() => {handleAnimation(primaryColor, socialButtonAnimation, 'social')}}
                onMouseDown={() => {handleAnimation(accentColor, socialButtonAnimation, 'social')}}
                onMouseUp={() => {handleAnimation(secondaryColor, socialButtonAnimation, 'social')}}
                animate={socialButtonAnimation} onClick={() => {handleAction('social')}} className='room-navigation-button'>
                    <h3
                    style={{color: textColor}}
                    >Social</h3>
                </motion.div>
                <motion.div 
                style={{
                    borderTopRightRadius: 15
                }}
                transition={{duration: 0.2}}
                onMouseOver={() => {handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                onMouseOut={() => {handleAnimation(primaryColor, widgetsButtonAnimation, 'widgets')}}
                onMouseDown={() => {handleAnimation(accentColor, widgetsButtonAnimation, 'widgets')}}
                onMouseUp={() => {handleAnimation(secondaryColor, widgetsButtonAnimation, 'widgets')}}
                animate={widgetsButtonAnimation} onClick={() => {handleAction('widgets')}} className='room-navigation-button'>
                    <h3
                    style={{color: textColor}}
                    >Widgets</h3>
                </motion.div>
                </>
                : null}
            </div>
        </div>
    )
}
