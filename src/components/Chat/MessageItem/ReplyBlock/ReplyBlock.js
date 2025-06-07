import React from 'react'
import { UserIndicator } from '../../../UserIndicator/UserIndicator'

import styles from './ReplyBlock.module.css'
import AttachmentPreview from '../../../AttachmentPreview/AttachmentPreview'
import { useDispatch } from 'react-redux'
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice'

export const ReplyBlock = ({reply_to, users}) => {
    
    const dispatch = useDispatch();

    const viewReply = () => {

        const el = document.getElementById(`message-id-${reply_to._id}`);

        const scrollEl = document.getElementById('chat-scroll-wrapper');
     
        if (el) {

            el.scrollIntoView({block: 'center', 'boundary': scrollEl});

            requestAnimationFrame(() => {
                el.style.backgroundColor = 'var(--card-background-color)';

                setTimeout(() => {

                    el.style.backgroundColor = null;

                }, 1000)
            }, [])

        } else {
            console.log(reply_to.image)
            if (reply_to.image) {
                dispatch(setExpandedImage({image: reply_to.image}));
            }
            

        }

    }

    return (
        <>
        {reply_to && (
            <div 
            className={styles.container}
            style={{
                maxWidth: 450,
            }}  
            >
                <UserIndicator user_id={reply_to.user_id} position='top'  />
                <AttachmentPreview onClick={viewReply} reply={reply_to}  />
            </div>
        )}
        </>
    )
}
