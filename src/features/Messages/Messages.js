import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentDirectMessage, selectDirectMessages} from './MessagesSlice'
import { AnimatePresence, motion } from 'framer-motion';
import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Social } from '../server/ChannelRoom/Room/Social/Social';
import { selectServerMembers } from '../server/ServerSlice';

export const Messages = () => {

    const selectedDirectMessage = useSelector(selectCurrentDirectMessage);

    const directMessages = useSelector(selectDirectMessages);

    const index = directMessages.findIndex(i => i.username === selectedDirectMessage);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassState = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const members = useSelector(selectServerMembers);

    const userStatus = members.find(m => m.username === selectedDirectMessage);

    return (
        <AnimatePresence>
            {selectedDirectMessage !== "" ?
            <motion.div 
            initial={{opacity: 0, left: '-600px'}}
            animate={{opacity: 1, left: 55}}
            exit={{opacity: 0, left: '-600px'}}
            style={{backgroundColor: glassState ? glassColor : secondaryColor}}
            className='saved-media-outer-container'>
                <Social currentChannel={{persist_data: false, social: directMessages[index]?.messages}} direct_message={true} direct_message_user={selectedDirectMessage} status={userStatus?.status !== 'offline'} />
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
