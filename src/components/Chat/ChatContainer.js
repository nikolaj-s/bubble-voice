import React from 'react';

import styles from './ChatContainer.module.css';

import { MessageInput } from './MessageInput/MessageInput';

import MessageList from './MessageList/MessageList';

import {motion} from 'framer-motion';

import { ReplyTo } from './ReplyTo/ReplyTo';

import PostDisabledPlaceholder from './PostDisabledPlaceholder/PostDisabledPlaceholder';
import { CommandHint } from '../CommandHint/CommandHint';

export const ChatContainer = ({
    messages = [], 
    send  = () => {}, 
    loadMoreMessages = () => {}, 
    users, loading, error, value, 
    setValue, setImage, sending, loadingMore, 
    returnPos = () => {}, position, replyTo, clearReplyTo, 
    placeholder = 'Type a message...',
    name, noMoreMessages,
    disableInput, reply, id
}) => {

    const [isDraggingImage, setIsDraggingImage] = React.useState();

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className={styles.container} 
        onDragEnter={() => {setIsDraggingImage(true)}}
        onKeyDown={(e) => {e.stopPropagation();}}
        onKeyUp={(e) => {e.stopPropagation()}}
        >
            <MessageList 
            id={id}
            reply={reply}
            position={position} returnPos={returnPos} 
            users={users} loading={loading}  
            messages={messages} sending={sending} 
            loadingMore={loadingMore} loadMoreMessages={loadMoreMessages} 
            noMoreMessages={noMoreMessages} name={name}
            />
            <CommandHint value={value} setValue={setValue} />
            <ReplyTo replyTo={replyTo} users={users} clearReplyTo={clearReplyTo} />
            {disableInput ? 
            <PostDisabledPlaceholder channelName={name} />
            : 
            <MessageInput 
            replyTo={replyTo} value={value} 
            setValue={setValue} send={send} error={error} 
            setImage={setImage} placeholder={placeholder} 
            setIsDraggingImage={setIsDraggingImage}
            isDraggingImage={isDraggingImage}
            />}
        </motion.div>
    )
}
