import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDirectMessage, selectCurrentDirectMessage, selectDirectMessages} from './MessagesSlice'
import { AnimatePresence, motion } from 'framer-motion';
import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Social } from '../server/ChannelRoom/Room/Social/Social';
import { selectServerMembers } from '../server/ServerSlice';

export const Messages = () => {

    const dispatch = useDispatch();

    const selectedDirectMessage = useSelector(selectCurrentDirectMessage);

    const directMessages = useSelector(selectDirectMessages);

    const index = directMessages.findIndex(i => i.username === selectedDirectMessage);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassState = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const members = useSelector(selectServerMembers);

    const userStatus = members.find(m => m.username === selectedDirectMessage);

    const close = () => {
        dispatch(closeDirectMessage())
    }

    return (
        <AnimatePresence>
            {selectedDirectMessage !== "" ?
            <div 
            
            onClick={close} className='side-tab-outer-container'>
                <motion.div 
                onClick={(e) => {e.stopPropagation()}}
                initial={{opacity: 0, marginLeft: '-600px'}}
                animate={{opacity: 1, marginLeft: 0}}
                exit={{opacity: 0, marginLeft: '-600px'}}
                style={{backgroundColor: glassState ? glassColor : secondaryColor, width: 600}}
                className='saved-media-outer-container'>
                    <Social currentChannel={{persist_data: false, social: directMessages[index]?.messages}} direct_message={true} direct_message_user={selectedDirectMessage} status={userStatus?.status !== 'offline'} />
                </motion.div>
            </div>
            : null}
        </AnimatePresence>
    )
}
