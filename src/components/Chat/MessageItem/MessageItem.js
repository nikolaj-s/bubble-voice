import React from 'react';

import styles from './MessageItem.module.css';
import { ImageComponent } from '../../Image/Image';
import LinkPreview from '../../LinkPreview/LinkPreview';
import { NsfwWrapper } from '../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import LinkComponent from '../../LinkComponent/LinkComponent';
import { TimeDisplay } from '../../TimeDisplay/TimeDisplay';
import Spacer from './Spacer/Spacer';

export const MessageItem = ({message, prevMessage = {}, loading, users = {}}) => {

    return (
        <>
          
            <div 
            data-context={JSON.stringify({...message, type: 'message'})}
            style={{
                borderColor: users[message.user_id]?.user_color
            }}
            className={styles.messageItem}>
                <div className={styles.userImageWrapper}>
                    {message.user_id !== prevMessage.user_id &&
                    <div className={styles.userImage}>
                        <ImageComponent src={users[message.user_id]?.user_image} />
                    </div>}
                    <TimeDisplay time={message.formattedTime} />
                </div>
                <div className={`${styles.messageContent} ${loading ? styles.sending : ''}`}>
                    {message.user_id !== prevMessage.user_id && 
                    <div className={styles.userName}>
                        <h3>{users[message.user_id]?.display_name}</h3>
                    </div>}
                    {message.text && (
                    <p className={styles.textBlock}>{message.text}</p>
                    )}
                    {message.image && loading ?
                    <div className={`${styles.imageSkeleton} ${styles.skeleton}`} />
                    : message.image ?
                    <div className={styles.imageBlock}>
                        <NsfwWrapper nsfw={message}>
                            <ImageComponent src={message.image} />
                        </NsfwWrapper>
                    </div>
                    : null}
                    {!message.image  && !message.video && !message.link_preview && (<LinkComponent link={message.link} />)}
                    <LinkPreview preview={message.link_preview} /> 
                </div>
            </div>
            {prevMessage?.formattedDate !== message?.formattedDate && (<Spacer date={message.formattedDate} />)}
        </>
    )
}
