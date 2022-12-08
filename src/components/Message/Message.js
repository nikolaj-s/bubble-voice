// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'
import { MessageLoadingIndicator } from './MessageLoadingIndicator/MessageLoadingIndicator';

// state
import {  selectAccentColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { SubMenuButton } from '../buttons/subMenuButton/SubMenuButton';
import { Iframe } from '../Iframe/Iframe';
import { MessageLink } from './MessageLink/MessageLink';
import { MessageText } from './MessageText/MessageText';
import { PinButton } from '../buttons/PinButton/PinButton';
import { TwitterEmbed } from '../TwitterEmbed/TwitterEmbed';
import { SenderInfo } from './SenderInfo/SenderInfo';

export const Message = ({ message, overlay = false, id, channel_id, perm, pinMessage, pinned, index, previous_message, current_message}) => {

    const dispatch = useDispatch();

    const [hoverState, setHoverState] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const expandContent = (source) => {
        dispatch(setExpandedContent(source))
    }

    const hoverEffect = (e, bool) => {

        setHoverState(bool);

        document.getElementById(`${id}/${channel_id}`).style.backgroundColor = bool ? primaryColor : null;
    }

    return (
        <div 
        onMouseEnter={(e) => {hoverEffect(e, true)}} onMouseLeave={(e) => {hoverEffect(e, false)}}
        style={{
            padding: overlay ? null : '2px 5px 0px 5px',
        }}
        id={`${id}/${channel_id}`}
        className='message-container'>
            <SenderInfo accentColor={accentColor} hover={hoverState} textColor={textColor} perm={perm} index={index}  message={message} current_message={current_message} previous_message={previous_message} pinMessage={pinMessage} pinned={pinned} overlay={overlay} />
            <MessageText color={textColor} text={message.text} />
            <MessageLink link={message.link} />
            <Iframe marginLeft={60} link={message.iFrame} />
            <TwitterEmbed id={message.twitter} />
            {message.image ? 
            <div 
            
            onClick={() => {expandContent(message.image)}}
            className='message-image-container'>
                <Image imgHeight='auto' cursor='pointer' width={null} altWidth={'100%'} loadingState='eager' objectFit='contain' image={message.image} />
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
