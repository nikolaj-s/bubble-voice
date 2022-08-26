// library's
import React from 'react'
import { useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'
import { MessageLoadingIndicator } from './MessageLoadingIndicator/MessageLoadingIndicator';

// state
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";

export const Message = ({ message }) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div 
        style={{
            borderTop: `solid 2px ${textColor}`
        }}
        className='message-container'>
            <div className='sender-info-container'>
                <p
                style={{color: textColor}}
                >{message.display_name}</p>
                {message.loading ? 
                <MessageLoadingIndicator />
                : <p
                style={{color: textColor}}
                >{message.date}</p>}
            </div>
            {message.text ? <p
            style={{color: textColor}}
            >{message.text}</p> : null}
            {message.image ? 
            <div className='message-image-container'>
                <Image objectFit='contain' image={message.image} />
            </div>
            : null}
            {message.video ? 
            <div className='message-video-container'>
                <Video id={message.local_id} video={message.video} />
            </div>
            : null}

        </div>
    )
}
