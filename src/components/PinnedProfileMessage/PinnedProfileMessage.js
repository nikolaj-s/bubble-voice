import React from 'react'
import { Message } from '../Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { motion } from 'framer-motion'
import "./PinnedProfileMessage.css";
import { handlePinMessageToProfile } from '../../features/settings/appSettings/accountSettings/accountSettingsSlice';

export const PinnedProfileMessage = ({message, margin, loading}) => {
    
    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);
    
    const dispatch = useDispatch();

    const handlePin = (id) => {
        dispatch(handlePinMessageToProfile({id: id}))
    }

    return (
        <>
        <div style={{backgroundColor: primaryColor, margin: margin}} className='pinned-profile-message'>
            {loading ? 
             <motion.div 
             style={{
                 background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 height: '100%',
                 backgroundSize: '600% 600%',
                 borderRadius: 5,
                 zIndex: 4
             }}
             initial={{backgroundPosition: '0% 50%'}}
             animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
             transition={{ease: 'linear', duration: 3, repeat: Infinity}}
             ></motion.div>  
            : null}
           {message?._id ?
           <Message pinned_to_profile_state={true} pin_to_profile={handlePin} message={message.content} current_message={message} previous_message={{content: {date: message.content.date}}}  /> 
            :
            <div className='no-pinned-message-container'>
                <p style={{color: textColor}}>No Pinned Message</p>
            </div>
           }
        </div>
        </>
    )
}
