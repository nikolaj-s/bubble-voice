// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';

// state
import { selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
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

    React.useEffect(() => {

        if (channelId === current_channel_id) return document.getElementById('channel-social-tab-button')?.click();

        if (currentSocial !== channelId) return setCurrentSocial(channelId);

    }, [channelId])

    const closeSocialTab = () => {
        dispatch(setChannelSocialId(""));
    }

    return (
        <>
            {currentSocial ?
            <motion.div 
            key={"social-route"}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0
            }}
            style={{
                position: inChannel ? 'absolute' : 'relative',
                width: inChannel ? '500px' : 'calc(100%)',
                height: inChannel ? '850px' : '100%',
                backgroundColor: secondaryColor,
                borderTop: inChannel ? `4px solid ${textColor}` : null,
                borderLeft: inChannel ? `4px solid ${textColor}` : null
            }}
            transition={{duration: 0.2}}
            className='social-route-wrapper-container'>
                <div className='social-route-top-nav'>
                    <h3
                    style={{
                        color: textColor
                    }}
                    >{channel.channel_name} / Social</h3>
                    <div onClick={closeSocialTab} className='close-social-button'>
                        <svg width="100%" style={{objectFit: 'cover'}} height="100%" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.7905 25L18.3717 20.5813C18.0871 20.2866 17.9296 19.8919 17.9332 19.4822C17.9367 19.0725 18.1011 18.6806 18.3908 18.3909C18.6805 18.1012 19.0723 17.9369 19.482 17.9333C19.8917 17.9298 20.2864 18.0873 20.5811 18.3719L24.9998 22.7906L29.4186 18.3719C29.5627 18.2226 29.7351 18.1036 29.9258 18.0217C30.1164 17.9398 30.3214 17.8967 30.5289 17.8949C30.7364 17.8931 30.9421 17.9327 31.1341 18.0112C31.3262 18.0898 31.5006 18.2058 31.6473 18.3525C31.794 18.4992 31.9101 18.6737 31.9886 18.8657C32.0672 19.0577 32.1067 19.2635 32.1049 19.4709C32.1031 19.6784 32.06 19.8834 31.9781 20.0741C31.8962 20.2647 31.7772 20.4371 31.628 20.5813L27.2092 25L31.628 29.4188C31.7772 29.5629 31.8962 29.7353 31.9781 29.9259C32.06 30.1166 32.1031 30.3216 32.1049 30.5291C32.1067 30.7365 32.0672 30.9423 31.9886 31.1343C31.9101 31.3263 31.794 31.5008 31.6473 31.6475C31.5006 31.7942 31.3262 31.9102 31.1341 31.9888C30.9421 32.0674 30.7364 32.1069 30.5289 32.1051C30.3214 32.1033 30.1164 32.0602 29.9258 31.9783C29.7351 31.8964 29.5627 31.7774 29.4186 31.6281L24.9998 27.2094L20.5811 31.6281C20.2864 31.9128 19.8917 32.0702 19.482 32.0667C19.0723 32.0631 18.6805 31.8988 18.3908 31.6091C18.1011 31.3194 17.9367 30.9275 17.9332 30.5178C17.9296 30.1081 18.0871 29.7134 18.3717 29.4188L22.7905 25Z" fill={textColor} />
                        <path d="M25 43.75C27.4623 43.75 29.9005 43.265 32.1753 42.3227C34.4502 41.3805 36.5172 39.9993 38.2583 38.2583C39.9993 36.5172 41.3805 34.4502 42.3227 32.1753C43.265 29.9005 43.75 27.4623 43.75 25C43.75 22.5377 43.265 20.0995 42.3227 17.8247C41.3805 15.5498 39.9993 13.4828 38.2583 11.7417C36.5172 10.0006 34.4502 8.61953 32.1753 7.67726C29.9005 6.73498 27.4623 6.25 25 6.25C20.0272 6.25 15.2581 8.22544 11.7417 11.7417C8.22544 15.2581 6.25 20.0272 6.25 25C6.25 29.9728 8.22544 34.7419 11.7417 38.2583C15.2581 41.7746 20.0272 43.75 25 43.75V43.75ZM25 46.875C19.1984 46.875 13.6344 44.5703 9.53204 40.468C5.42968 36.3656 3.125 30.8016 3.125 25C3.125 19.1984 5.42968 13.6344 9.53204 9.53204C13.6344 5.42968 19.1984 3.125 25 3.125C30.8016 3.125 36.3656 5.42968 40.468 9.53204C44.5703 13.6344 46.875 19.1984 46.875 25C46.875 30.8016 44.5703 36.3656 40.468 40.468C36.3656 44.5703 30.8016 46.875 25 46.875Z" fill={textColor} />
                        </svg>
                    </div>
                </div>
                <Social socialRoute={true} channelId={channelId} currentChannel={channel} />
            </motion.div> : null}
        </>
    )
}
