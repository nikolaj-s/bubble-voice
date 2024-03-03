// library's
import React from 'react';
import { motion } from 'framer-motion';

// style
import "./MessageOverlay.css";
import { Message } from '../../../../../../components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { selectSecondaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsDisableMessagePopUp } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectChannelSocialId, selectServerChannels } from '../../../../ServerSlice';
import { playSoundEffect } from '../../../../../settings/soundEffects/soundEffectsSlice';

export const MessageOverlay = ({data, onEnd, page}) => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const messageOverlayDisabled = useSelector(selectMiscSettingsDisableMessagePopUp);

    const socialId = useSelector(selectChannelSocialId);

    const channels = useSelector(selectServerChannels);

    React.useEffect(() => {
        
        const channel = channels.find(c => c._id === data.channel_id);

        if (!channel.auth) return onEnd();

        if (messageOverlayDisabled || socialId) {
            onEnd();
        } else {
            dispatch(playSoundEffect({default: "newMessage"}))

            setTimeout(() => {

                onEnd();
    
            }, 2500)
        }
    // eslint-disable-next-line
    }, [data, socialId, channels])

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
            <Message dashboard={true} overlay={true} message={data.content} current_message={data} />
        </motion.div>
    )
}
