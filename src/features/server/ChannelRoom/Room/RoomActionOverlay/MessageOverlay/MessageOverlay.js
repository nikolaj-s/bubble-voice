// library's
import React from 'react';
import { motion } from 'framer-motion';

// style
import "./MessageOverlay.css";
import { Message } from '../../../../../../components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsDisableMessagePopUp, selectMuteSocial } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectChannelSocialId, selectCurrentChannelId, selectServerChannels } from '../../../../ServerSlice';
import { playSoundEffect, selectSocialSoundEffect } from '../../../../../settings/soundEffects/soundEffectsSlice';

export const MessageOverlay = ({data, onEnd, page}) => {

    const [channelName, setChannelName] = React.useState("");

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const messageOverlayDisabled = useSelector(selectMiscSettingsDisableMessagePopUp);

    const muteSocial = useSelector(selectMuteSocial);

    const socialId = useSelector(selectChannelSocialId);

    const channels = useSelector(selectServerChannels);

    const textColor = useSelector(selectTextColor);

    const inChannel = useSelector(selectCurrentChannelId);

    React.useEffect(() => {
        
        const channel = channels.find(c => c._id === data.channel_id);

        if (!inChannel) return onEnd();

        if (!channel.auth) return onEnd();

        if (muteSocial || socialId) {
            onEnd();
        } else {
            dispatch(playSoundEffect({default: "newMessage"}));
            console.log(channel)
            setChannelName(channel.channel_name)

            setTimeout(() => {

                onEnd();
    
            }, 3000)
        }
    // eslint-disable-next-line
    }, [data, socialId, channels, inChannel])

    return (
        <motion.div 
        key={"message-prev-overlay"}
        style={{
            display: messageOverlayDisabled || (page === 'social' || page === "widgets") ? 'none' : 'flex',
            backgroundColor: secondaryColor,
        }}
        initial={{scale: 0}} 
        animate={{scale: 1}} 
        exit={{scale: 0}} className='message-overlay-container'>
            <h3 style={{color: textColor, opacity: 0.7}}>posted in: {channelName}</h3>
            <Message dashboard={true} overlay={true} message={data.content} current_message={data} />
        </motion.div>
    )
}
