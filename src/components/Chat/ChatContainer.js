import React from 'react';

import styles from './ChatContainer.module.css';

import { MessageInput } from './MessageInput/MessageInput';

import MessageList from './MessageList/MessageList';

import {motion} from 'framer-motion'

export const ChatContainer = ({messages = [], send  = () => {}, loadMoreMessages = () => {}, users, loading, error, value, setValue, setImage, sending, loadingMore, returnPos, position}) => {
    
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className={styles.container} >
            <MessageList position={position} returnPos={returnPos} users={users} loading={loading}  messages={messages} sending={sending} loadingMore={loadingMore} loadMoreMessages={loadMoreMessages} />
            <MessageInput value={value} setValue={setValue} send={send} error={error} setImage={setImage} />
        </motion.div>
    )
}
