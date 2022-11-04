// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'
import { MessageLoadingIndicator } from './MessageLoadingIndicator/MessageLoadingIndicator';

// state
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";
import { TextParser } from './TextParser/TextParser';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { SubMenuButton } from '../buttons/subMenuButton/SubMenuButton';

export const Message = ({ message, overlay = false, id, channel_id }) => {

    const dispatch = useDispatch();

    const textColor = useSelector(selectTextColor);
    
    const primaryColor = useSelector(selectPrimaryColor);

    const expandContent = (source) => {
        dispatch(setExpandedContent(source))
    }

    return (
        <div 
        style={{
            border: overlay ? null : `solid 2px ${textColor}`,
            backgroundColor: overlay ? null : primaryColor,
            padding: overlay ? null : 10,
            borderRadius: overlay ? null : 15
        }}
        id={`${id}/${channel_id}`}
        className='message-container'>
            <div className='sender-info-container'>
                <p
                style={{color: textColor}}
                >{message.display_name}</p>
                {message.loading ? 
                <MessageLoadingIndicator />
                : 
                <div className='date-submenu-message-wrapper'>

                <p
                style={{color: textColor, marginRight: 10}}
                >{message.date.split("T")[0]}</p>
                <SubMenuButton  />
                </div>
                }
                
            </div>
            {message.text ? <TextParser text={message.text} /> : null}
            {message.image ? 
            <div 
            style={{
                height: 500,
                backgroundColor: 'black'
            }}
            onClick={() => {expandContent(message.image)}}
            className='message-image-container'>
                <Image loadingState='lazy' objectFit='contain' image={message.image} />
            </div>
            : null}
            {message.video ? 
            <div 
            style={{
                backgroundColor: 'black',
                height: 500
            }}
            className='message-video-container'>
                <Video id={message.local_id} video={message.video} />
            </div>
            : null}
        </div>
    )
}
