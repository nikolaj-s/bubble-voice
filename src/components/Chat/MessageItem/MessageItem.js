import React from 'react';

import styles from './MessageItem.module.css';
import { ImageComponent } from '../../ui/Image/Image';
import LinkPreview from '../../LinkPreview/LinkPreview';
import { NsfwWrapper } from '../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import LinkComponent from '../../LinkComponent/LinkComponent';
import { TimeDisplay } from '../../TimeDisplay/TimeDisplay';
import Spacer from './Spacer/Spacer';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { setExpandedImage } from '../../../features/Media/ExpandedImage/expandedImageSlice';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Ellipsis } from 'lucide-react';
import { triggerContext } from '../../../lib/services/helperFunctions';
import VideoPlayer from '../../ui/Video/VideoPlayer/VideoPlayer';

export const MessageItem = ({message, prevMessage = {}, loading, users = {}}) => {

    const dispatch = useDispatch();

    const isDifferentDay = prevMessage?.formattedDate !== message?.formattedDate;

    const expandImage = () => {

        dispatch(setExpandedImage({image: message.image}));

        dispatch(setOverlay("expandImage"));

    }

    const openCtx = (e) => {
        triggerContext(e, `message-id-${message._id}`)
    }

    return (
        <>
          
            <div 
            id={`message-id-${message._id}`}
            data-context={JSON.stringify({...message, type: 'message'})}
            style={{
                borderColor: users[message.user_id]?.color
            }}
            className={styles.messageItem}>
                <div className={styles.buttons}>
                    <IconButton 
                    Icon={<Ellipsis color='var(--text-color)' />}
                    onClick={openCtx}
                    title={'Options'}
                    position='left'
                    />
                </div>
                <div className={styles.userImageWrapper}>
                    {message.user_id !== prevMessage.user_id &&
                    <div className={styles.userImage}>
                        <ImageComponent src={users[message.user_id]?.user_image} />
                    </div>}
                   {message.user_id !== prevMessage.user_id ? null : <TimeDisplay time={message.formattedTime} />}
                </div>
                <div className={`${styles.messageContent} ${loading ? styles.sending : ''}`}>
                    {message.user_id !== prevMessage.user_id && 
                    <div className={styles.userName}>
                        <h3>{users[message.user_id]?.display_name}</h3>
                        <TimeDisplay time={message.formattedTime} margin={0} />
                    </div>}
                    {message.text && (
                    <p className={styles.textBlock}>{message.text}</p>
                    )}
                    {message.image && loading ?
                    <div className={`${styles.imageSkeleton} ${styles.skeleton}`} />
                    : message.image ?
                    <div 
                    onClick={expandImage}
                    className={styles.imageBlock}>
                        <NsfwWrapper nsfw={message}>
                            <ImageComponent src={message.image} />
                        </NsfwWrapper>
                    </div>
                    : 
                    message.video ?
                    <div className={styles.imageBlock}>
                        <NsfwWrapper nsfw={message}>
                            <VideoPlayer src={message.video} />
                        </NsfwWrapper>
                    </div>
                    :
                    null}
                    {!message.image  && !message.video && !message.link_preview && (<LinkComponent link={message.link} />)}
                    <LinkPreview preview={message.link_preview} /> 
                </div>
            </div>
            {isDifferentDay && (<Spacer date={message.formattedDate} />)}
        </>
    )
}
