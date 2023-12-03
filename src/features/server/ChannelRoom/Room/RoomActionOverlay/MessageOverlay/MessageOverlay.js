// library's
import React from 'react';
import { motion } from 'framer-motion';

// style
import "./MessageOverlay.css";
import { Message } from '../../../../../../components/Message/Message';
import { useSelector } from 'react-redux';
import { selectSecondaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsDisableMessagePopUp } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const MessageOverlay = ({data, onEnd, page}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const messageOverlayDisabled = useSelector(selectMiscSettingsDisableMessagePopUp);

    React.useEffect(() => {
        if (messageOverlayDisabled) {
            onEnd();
        } else {
            setTimeout(() => {

                onEnd();
    
            }, 2500)
        }
    // eslint-disable-next-line
    }, [data])

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
