// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';

// state
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectCurrentChannelId, selectCurrentlyViewChannelSocial, setChannelSocialId } from '../../ServerSlice'

// component's
import { Social } from '../Room/Social/Social'

// style
import "./SocialRoute.css";

export const SocialRoute = () => {

    const dispatch = useDispatch();

    const [currentSocial, setCurrentSocial] = React.useState("") 

    const channelId = useSelector(selectChannelSocialId);

    const channel = useSelector(selectCurrentlyViewChannelSocial);

    const textColor = useSelector(selectTextColor);

    const current_channel_id = useSelector(selectCurrentChannelId);

    const inChannel = window.location.hash.includes('/channel/');

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {

        if (channelId === current_channel_id) return document.getElementById('channel-social-tab-button')?.click();
    
        if (currentSocial !== channelId) setCurrentSocial(channelId);

    }, [channelId, current_channel_id])

    const closeSocialTab = () => {
        dispatch(setChannelSocialId(""));
    }

    return (
        <>
            {currentSocial ?
            <motion.div 
            key={"social-route"}
            
            style={{
                position: inChannel ? 'absolute' : 'relative',
                zIndex: inChannel ? 4 : 3,
                width: 'calc(100%)',
                height: '100%',
                backgroundColor: secondaryColor,
            }}
            transition={{duration: 0.2}}
            className='social-route-wrapper-container'>
                <div 
                style={{borderBottom: `solid 3px ${primaryColor}`, backgroundColor: primaryColor}}
                className='social-route-top-nav'>
                    <div 
                    style={{backgroundColor: secondaryColor}}
                    className='social-route-title-container'>
                        <h3
                        style={{
                            color: textColor
                        }}
                        >{channel.channel_name} / Social</h3>
                    </div>
                    <div 
                    style={{backgroundColor: secondaryColor}}
                    onClick={closeSocialTab} className='close-social-button'>
                        <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z" fill={textColor}/>
                        </svg>

                    </div>
                </div>
                <Social channelName={channel.name} socialRoute={true} channelId={channelId} currentChannel={channel} />
            </motion.div> : null}
        </>
    )
}
