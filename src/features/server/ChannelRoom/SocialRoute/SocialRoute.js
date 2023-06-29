// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';

// state
import { selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
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

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    React.useEffect(() => {

        if (channelId === current_channel_id) return document.getElementById('channel-social-tab-button')?.click();
    
        if (currentSocial !== channelId) setCurrentSocial(channelId);

    }, [channelId, current_channel_id])

    return (
        <>
            {currentSocial ?
            <motion.div 
            key={"social-route"}
            
            style={{
                position: 'absolute',
                zIndex: 8,
                width: 'calc(100%)',
                left: 0,
                height: '100%',
               
            }}
            transition={{duration: 0.2}}
            className='social-route-wrapper-container'>
               
                <div
                style={{
                    minHeight: 'calc(100%)',
                    marginTop: 0,
                    width: '100%',
                    zIndex: 5,
                    backgroundColor: glass && !inChannel ? glassColor : secondaryColor
                }}
                >
                    <Social channelName={channel.name} socialRoute={true} channelId={channelId} currentChannel={channel} />
                </div>
                    
            </motion.div> : null}
        </>
    )
}
