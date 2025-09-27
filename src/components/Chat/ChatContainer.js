import React from 'react';

import styles from './ChatContainer.module.css';

import { MessageInput } from './MessageInput/MessageInput';

import MessageList from './MessageList/MessageList';

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
    disableInput, reply, id, type
}) => {

    const [isDraggingImage, setIsDraggingImage] = React.useState();

    return (
        <div 
        className={styles.container} 
        onDragEnter={() => {setIsDraggingImage(true)}}
        onKeyDown={(e) => {e.stopPropagation();}}
        onKeyUp={(e) => {e.stopPropagation()}}
        >
            <MessageList 
            type={type}
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
            id={id}
            replyTo={replyTo} value={value} 
            setValue={setValue} send={send} error={error} 
            setImage={setImage} placeholder={placeholder} 
            setIsDraggingImage={setIsDraggingImage}
            isDraggingImage={isDraggingImage}
            />}
        </div>
    )
}
