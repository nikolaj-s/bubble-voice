// library's
import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
// state
import { selectDisableTransitionAnimations, selectGlassColor, selectGlassState, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectCurrentChannelId, selectCurrentlyViewChannelSocial } from '../../ServerSlice'

// component's
import { Social } from '../Room/Social/Social'

// style
import "./SocialRoute.css";
import { ViewSubReddit } from '../ServerDashBoard/ServerMedia/ViewSubReddits/ViewSubReddit';

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

      //  if (channelId === current_channel_id) return document.getElementById('channel-social-tab-button')?.click();
    
        if (currentSocial !== channelId) setCurrentSocial(channelId);
    // eslint-disable-next-line
    }, [channelId, current_channel_id])

    return (
        <>
        {currentSocial ?
        <motion.div 
        initial={{opacity: 0}} animate={{opacity: 1}} 
        exit={{opacity: 0}}
        key={`social-route-${channelId}`}
        className='social-route-wrapper-container'>
            
            <div
            style={{
                minHeight: 'calc(100%)',
                marginTop: 0,
                width: '100%',
                zIndex: 5,
            }}
            >
               {channel.type === 'subreddit' ?
               <ViewSubReddit subreddit_name={channel.channel_name} subreddit={channel.media_state} />
               :
               <Social channelName={channel.name} socialRoute={true} channelId={channelId} currentChannel={channel} />}
            </div>
                
        </motion.div> : null}
        </>
    )
}
