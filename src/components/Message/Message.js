// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'
import { MessageLoadingIndicator } from './MessageLoadingIndicator/MessageLoadingIndicator';

// state
import {  selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { SubMenuButton } from '../buttons/subMenuButton/SubMenuButton';
import { Iframe } from '../Iframe/Iframe';
import { MessageLink } from './MessageLink/MessageLink';
import { MessageText } from './MessageText/MessageText';
import { PinButton } from '../buttons/PinButton/PinButton';

export const Message = ({ message, overlay = false, id, channel_id, perm, pinMessage, pinned}) => {

    const dispatch = useDispatch();

    const textColor = useSelector(selectTextColor);

    const expandContent = (source) => {
        dispatch(setExpandedContent(source))
    }

    return (
        <div 
        style={{
            padding: overlay ? null : 5,
        }}
        id={`${id}/${channel_id}`}
        className='message-container'>
            <div className='sender-info-container'>
                <h2
                style={{color: textColor}}
                >{message.display_name}</h2>
                {!message.loading ?
                <p
                    style={{color: textColor, marginRight: 10}}
                >{message?.date?.split("T")[0]}</p> : null}
                {message.loading ? 
                <MessageLoadingIndicator />
                : overlay === false ?
                <div className='date-submenu-message-wrapper'>
                    {perm ? <PinButton description={pinned ? 'unpin' : 'pin'} action={pinMessage} width={15} height={15} pinned={pinned} /> : null}
                    {perm ? <SubMenuButton zIndex={2} description={"More"} width={15} height={15} borderRadius={10} /> : null}
                </div>
                : null}
                
            </div>
            <MessageText color={textColor} text={message.text} />
            <MessageLink link={message.link} />
            <Iframe link={message.iFrame} />
            {message.image ? 
            <div 
            
            onClick={() => {expandContent(message.image)}}
            className='message-image-container'>
                <Image imgHeight='auto' cursor='pointer' width={null} altWidth={'100%'} loadingState='lazy' objectFit='contain' image={message.image} />
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
