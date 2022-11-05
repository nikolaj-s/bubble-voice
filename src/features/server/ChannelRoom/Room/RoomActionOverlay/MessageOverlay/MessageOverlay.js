// library's
import React from 'react';
import { motion } from 'framer-motion';

// style
import "./MessageOverlay.css";
import { Message } from '../../../../../../components/Message/Message';
import { useSelector } from 'react-redux';
import { selectPrimaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectMiscSettingsDisableMessagePopUp } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const MessageOverlay = ({data, onEnd, page}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const messageOverlayDisabled = useSelector(selectMiscSettingsDisableMessagePopUp);

    React.useEffect(() => {
        if (messageOverlayDisabled) {
            onEnd();
        } else {
            setTimeout(() => {

                onEnd();
    
            }, 3500)
        }
    // eslint-disable-next-line
    }, [data])

    return (
        <motion.div 
        key={"message-prev-overlay"}
        style={{
            display: messageOverlayDisabled || (page === 'social' || page === "widgets") ? 'none' : 'flex',
            backgroundColor: `rgba${primaryColor.split('rgb')[1].split(')')[0]}, 0.5)`,
        }}
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='message-overlay-container'>
            <Message overlay={true} message={data} />
        </motion.div>
    )
}
