// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'

// state
import {  selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { Iframe } from '../Iframe/Iframe';
import { MessageLink } from './MessageLink/MessageLink';
import { MessageText } from './MessageText/MessageText';
import { TwitterEmbed } from '../TwitterEmbed/TwitterEmbed';
import { SenderInfo } from './SenderInfo/SenderInfo';
import { setPanelPosition, setSelectedMember } from '../../features/server/ChannelRoom/MemberPanel/MemberPanelSlice';
import { selectServerMembers } from '../../features/server/ServerSlice';
import { selectDisableTransparancyEffects } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const Message = ({direct_message, message, overlay = false, id, channel_id, perm, pinMessage, pinned, index, previous_message, current_message, persist}) => {

    const dispatch = useDispatch();

    const [hoverState, setHoverState] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const members = useSelector(selectServerMembers);

    const user = members.find(member => member.username === current_message.username);

    const expandContent = (source) => {
        dispatch(setExpandedContent(source))
    }

    const hoverEffect = (e, bool) => {

        setHoverState(bool);

    }

    const openUserPanel = (e) => {
        
        const target = e.target.localName !== 'div' || e.target.className === "" ? e.target.offsetParent.className === "" ? e.target.offsetParent.offsetParent : e.target.offsetParent : e.target;
        
        const scroll_top = target.parentElement.scrollTop;

        const l_top = target.offsetTop === 0 ? 70 : target.offsetTop + 25;

        dispatch(setSelectedMember(current_message.username));

        dispatch(setPanelPosition({y: l_top - scroll_top, x: e.pageX, origin: (e.view.innerHeight - e.pageY) < 500 ? true : false, left: 330}));
    }

    return (
        <div 
        onMouseEnter={(e) => {hoverEffect(e, true)}} onMouseLeave={(e) => {hoverEffect(e, false)}}
        style={{
            padding: overlay ? null : '2px 5px 0px 5px',
            backgroundColor: hoverState ? primaryColor : null
        }}
        id={`${id}/${channel_id}`}
        className={`message-container ${direct_message ? 'direct-message-container' : null}`}>
            <div id={`${id}-ctx-message-overlay`} className={'ctx-message-overlay'} />
            <SenderInfo link={message.link} color={user?.color} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} display_name={user?.display_name} user_image={user?.user_image} action={openUserPanel} persist={persist} id={id} accentColor={accentColor} hover={hoverState} textColor={textColor} perm={perm} index={index}  message={message} current_message={current_message} previous_message={previous_message} pinMessage={pinMessage} pinned={pinned} overlay={overlay} />
            <MessageText color={textColor} text={message.text} />
            <MessageLink link={message.link} />
            <Iframe marginRight={5} marginLeft={50} link={message.iFrame} />
            <TwitterEmbed id={message.twitter} />
            {message.image ? 
            <div 
            className='message-image-container'>
                <Image expandContent={expandContent} imgHeight='auto' cursor='pointer' width={null} altWidth={'100%'} loadingState='eager' objectFit='contain' image={message.image} />
            </div>
            : null}
            {message.video ? 
            <div 
            
            className='message-outer-video-container'>
                <Video id={message.local_id} video={message.video} />
            </div>
            : null}
        </div>
    )
}
