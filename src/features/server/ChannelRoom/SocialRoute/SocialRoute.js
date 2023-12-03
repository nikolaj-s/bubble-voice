// library's
import React from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion';

// state
import { selectDisableTransitionAnimations, selectGlassColor, selectGlassState, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectCurrentChannelId, selectCurrentlyViewChannelSocial } from '../../ServerSlice'

// component's
import { Social } from '../Room/Social/Social'

// style
import "./SocialRoute.css";

export const SocialRoute = () => {

    const [currentSocial, setCurrentSocial] = React.useState("") 

    const channelId = useSelector(selectChannelSocialId);

    const channel = useSelector(selectCurrentlyViewChannelSocial);

    const current_channel_id = useSelector(selectCurrentChannelId);

    const inChannel = window.location.hash.includes('/channel/');

    const secondaryColor = useSelector(selectSecondaryColor);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const disableTransition = useSelector(selectDisableTransitionAnimations);

    React.useEffect(() => {

        if (channelId === current_channel_id) return document.getElementById('channel-social-tab-button')?.click();
    
        if (currentSocial !== channelId) setCurrentSocial(channelId);
    // eslint-disable-next-line
    }, [channelId, current_channel_id])

    return (
        <AnimatePresence>
            {currentSocial ?
            <motion.div 
            transition={disableTransition ? {duration: 0} : {duration: 0.2}}
            key={`social-route-${channelId}`}
            initial={{translateX: '-100%'}}
            animate={{translateX: '0%'}}
            exit={{translateX: '-100%'}}
            
            style={{
                position: 'absolute',
                zIndex: 8,
                width: 'calc(100%)',
                left: 0,
                height: '100%',
               
            }}
            
            className='social-route-wrapper-container'>
               
                <div
                style={{
                    minHeight: 'calc(100%)',
                    marginTop: 0,
                    width: '100%',
                    zIndex: 5,
                }}
                >
                    <Social channelName={channel.name} socialRoute={true} channelId={channelId} currentChannel={channel} />
                </div>
                    
            </motion.div> : null}
        </AnimatePresence>
    )
}
