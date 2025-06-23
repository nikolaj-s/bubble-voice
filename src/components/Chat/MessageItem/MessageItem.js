import React from 'react';

import styles from './MessageItem.module.css';
import { ImageComponent } from '../../ui/Image/Image';
import LinkPreview from '../../LinkPreview/LinkPreview';
import LinkComponent from '../../LinkComponent/LinkComponent';
import { TimeDisplay } from '../../TimeDisplay/TimeDisplay';
import Spacer from './Spacer/Spacer';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Ellipsis, Reply } from 'lucide-react';
import { triggerContext } from '../../../lib/services/helperFunctions';

import { LongPressGestureWrapper } from '../../ui/Gestures/LongPressGestureWrapper';
import { ImageBlock } from './ImageBlock/ImageBlock';
import { VideoBlock } from './VideoBlock/VideoBlock';
import { TextBlock } from './TextBlock/TextBlock';
import { UserBlock } from './UserBlock/UserBlock';
import { ReplyBlock } from './ReplyBlock/ReplyBlock';

export const MessageItem = ({message, prevMessage = {}, loading, users = {}, inSearch = false, isReply, reply = () => {}, notification}) => {

    const isDifferentDay = prevMessage?.formattedDate !== message?.formattedDate;

    const openCtx = (e) => {
        triggerContext(e, `message-id-${message._id}`)
    }

    return (
        <>
            
            {isDifferentDay && !inSearch && (<Spacer date={message.formattedDate} />)}
            <LongPressGestureWrapper onTouchContext={openCtx}>
                <div 
                id={`message-id-${message._id}`}
                data-context={JSON.stringify({...message, type: isReply ? 'reply-message' : 'message', inSearch})}
                style={{
                    borderColor: users[message.user_id]?.color
                }}
                className={styles.messageItem}>
                    <ReplyBlock {...message} users={users} />
                    <div className={styles.messageWrapper}>
                        {(!isReply && !notification) && 
                        <div className={styles.buttons}>
                            <IconButton 
                            Icon={<Reply color='var(--text-color)' />}
                            title={'Reply'}
                            position='bottom'
                            onClick={() => {reply(message)}}
                            />
                            <IconButton 
                            Icon={<Ellipsis color='var(--text-color)' />}
                            onClick={openCtx}
                            
                            title={'Options'}
                            position='bottom'
                            />
                        </div>}
                        <div className={styles.userImageWrapper}>
                            {(message.user_id !== prevMessage.user_id || isDifferentDay || message.reply_to) &&
                            <div className={styles.userImage}>
                                <ImageComponent src={users[message.user_id]?.user_image} />
                            </div>}
                        {message.user_id !== prevMessage.user_id || isDifferentDay || message.reply_to ? null : <TimeDisplay className={styles.time} time={message.formattedTime} />}
                        </div>
                        <div className={`${styles.messageContent} ${loading ? styles.sending : ''}`}>
                            <UserBlock users={users} message={message} prevMessage={prevMessage} isDifferentDay={isDifferentDay} styles={styles} />
                        
                            <TextBlock {...message} styles={styles} />
                            <ImageBlock {...message} styles={styles} loading={message.loading || loading} />
                            <VideoBlock {...message} styles={styles} />
                            {!message.image  && !message.video && !message.link_preview && (<LinkComponent link={message.link} />)}
                            <LinkPreview {...message} /> 
                        </div>
                    </div>
                </div>
                
            </LongPressGestureWrapper>
            {isDifferentDay && inSearch && (<Spacer date={message.formattedDate} />)}
        </>
    )
}
