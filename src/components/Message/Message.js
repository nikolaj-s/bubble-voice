// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'

// state
import {  selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

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
import { DateSpacer } from './DateSpacer/DateSpacer';
import { GetTimeDifference } from '../../util/GetTimeDifference';
import { AltSocialMedia } from './AltSocialMedia/AltSocialMedia';
import { ProfileImage } from './ProfileImage/ProfileImage';
import { selectHideLinksOnMedia, selectMaximizeMedia } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { MessageLoadingIndicator } from './MessageLoadingIndicator/MessageLoadingIndicator';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MessageGallery } from './MessageGallery/MessageGallery';

export const Message = ({dashboard = false, direct_message, message, overlay = false, id, channel_id, perm, pinMessage, pinned, index, previous_message, current_message, persist, pin_to_profile}) => {

    const dispatch = useDispatch();

    const [hoverState, setHoverState] = React.useState(false);

    const [user, setUser] = React.useState({});

    const [timeStamp, setTimeStamp] = React.useState("");

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const transparentColor = useSelector(selectTransparentPrimaryColor);

    const members = useSelector(selectServerMembers);

    const maximizeMediaSize = useSelector(selectMaximizeMedia);

    const hideLinksOnMedia = useSelector(selectHideLinksOnMedia);

    React.useEffect(() => {
        setUser(members.find(member => member.username === current_message.username))

        setTimeStamp(GetTimeDifference(current_message?.content?.time))
    }, [])

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
        <>
           
            <div 
            onMouseEnter={(e) => {hoverEffect(e, true)}} onMouseOut={(e) => {hoverEffect(e, false)}} onMouseOver={(e) => {hoverEffect(e, true)}} onMouseLeave={(e) => {hoverEffect(e, false)}}
            style={{
                padding: overlay ? null : '0px 5px 0px 0px',
                backgroundColor: hoverState ? primaryColor : transparentColor
            }}
            id={`${id}/${channel_id}`}
            className={`message-container ${direct_message ? 'direct-message-container' : null}`}>
                {message.loading ? <MessageLoadingIndicator /> : null}
                <ProfileImage previous_message={previous_message} color={user?.color} current_message={current_message} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} user_image={user?.user_image} action={openUserPanel} />
                <div className='message-inner-container'>
                    <div id={`${id}-ctx-message-overlay`} className={'ctx-message-overlay'} />
                    <SenderInfo timeStamp={timeStamp} direct_message={direct_message} pin_to_profile={pin_to_profile} link={message.link} color={user?.color} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} display_name={user?.display_name} user_image={user?.user_image} action={openUserPanel} persist={persist} id={id} accentColor={accentColor} hover={hoverState} textColor={textColor} perm={perm} index={index}  message={message} current_message={current_message} previous_message={previous_message} pinMessage={pinMessage} pinned={pinned} overlay={overlay} />
                    <MessageText color={textColor} text={message.text} />
                    {hideLinksOnMedia && (message.image || message.video || message.iFrame) || message.gallery ? null : <MessageLink link={message.link} />}
                    <AltSocialMedia link={message.link} />
                    <Iframe marginRight={5}  link={message.iFrame} />
                    <TwitterEmbed id={message.twitter} />
                    <MessageGallery gallery={message.gallery} expand={expandContent} />
                    {message.image && !message.gallery ? 
                    <div 
                    style={{maxHeight: maximizeMediaSize ? '100%' : 400}}
                    className='message-image-container'>
                        <Image minLoadHeight={300} altHeight={maximizeMediaSize ? '100%' : 400}  expandContent={expandContent} imgHeight='auto' cursor='pointer' width={null} altWidth={'100%'} loadingState='eager' objectFit='contain' image={message.image} />
                    </div>
                    : null}
                    {message.video ? 
                    <div 
                    style={{maxHeight: maximizeMediaSize ? '100%' : 400}}
                    className='message-outer-video-container'>
                        <Video maxHeight={maximizeMediaSize ? '100%' : 400} id={message.local_id} video={message.video} />
                    </div>
                    : null}
                </div> 
            </div>
            {(previous_message?.content?.date?.split("T")[0] !== current_message?.content?.date?.split("T")[0]) && dashboard === false && current_message?.content?.date?.split("T")[0] ?
            <DateSpacer d={current_message?.content?.date?.split("T")[0]} />
            : null}
        </>
    )
}
