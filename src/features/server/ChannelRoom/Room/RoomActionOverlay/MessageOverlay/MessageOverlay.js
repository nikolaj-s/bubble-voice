// library's
import React from 'react';
import { motion } from 'framer-motion';

// style
import "./MessageOverlay.css";
import { Message } from '../../../../../../components/Message/Message';
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsDisableMessagePopUp } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const MessageOverlay = ({data, onEnd, page}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const messageOverlayDisabled = useSelector(selectMiscSettingsDisableMessagePopUp);

    const accentColor = useSelector(selectPrimaryColor)

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
            borderBottom: `solid 3px ${accentColor}`
        }}
        transition={{duration: 0.3}}
        initial={{top: -400}} animate={{top: 0}} exit={{top: -400}} className='message-overlay-container'>
            <Message overlay={true} message={data} current_message={{content: data}} />
        </motion.div>
    )
}
