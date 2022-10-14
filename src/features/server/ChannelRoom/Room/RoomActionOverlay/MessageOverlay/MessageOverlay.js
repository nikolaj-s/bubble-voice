// library's
import React from 'react';
import { motion } from 'framer-motion';

// style
import "./MessageOverlay.css";
import { Message } from '../../../../../../components/Message/Message';
import { useSelector } from 'react-redux';
import { selectPrimaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const MessageOverlay = ({data, onEnd}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {

        setTimeout(() => {

            onEnd();

        }, 3500)
    }, [data])

    return (
        <motion.div 
        key={"message-prev-overlay"}
        style={{
            backgroundColor: `rgba${primaryColor.split('rgb')[1].split(')')[0]}, 0.5)`
        }}
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='message-overlay-container'>
            <Message overlay={true} message={data} />
        </motion.div>
    )
}
