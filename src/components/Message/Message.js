// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Image } from '../Image/Image'
import { Video } from '../Video/Video'

// state
import {  selectAccentColor, selectGlassPrimaryColor, selectPrimaryColor, selectSecondaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Message.css";
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { Iframe } from '../Iframe/Iframe';
import { MessageLink } from './MessageLink/MessageLink';
import { MessageText } from './MessageText/MessageText';
import { SenderInfo } from './SenderInfo/SenderInfo';
import { setPanelPosition, setSelectedMember } from '../../features/server/ChannelRoom/MemberPanel/MemberPanelSlice';
import { selectServerMembers } from '../../features/server/ServerSlice';
import { DateSpacer } from './DateSpacer/DateSpacer';
import { GetTimeDifference } from '../../util/GetTimeDifference';
import { ProfileImage } from './ProfileImage/ProfileImage';
import { selectHideLinksOnMedia, selectMaximizeMedia } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import { MessageGallery } from './MessageGallery/MessageGallery';
import { ProcessingIndicator } from './ProcessingIndicator/ProcessingIndicator';
import { UploadedFileShare } from './UploadedFileShare/UploadeFileShare';
import { LinkPreview } from './LinkPreview/LinkPreview';

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

    const glassPrimary = useSelector(selectGlassPrimaryColor);

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

        dispatch(setPanelPosition({y: (e.view.innerHeight - 600) < 0 ? 30 : e.pageY, x: e.pageX, origin: e.view.innerHeight - 600 < 0 ? false : (e.view.innerHeight - e.pageY) < 500 ? true : false, left: 330}));
    
    }

    return (
        <>
           
            <div onMouseOut={(e) => {hoverEffect(e, false)}} onMouseOver={(e) => {hoverEffect(e, true)}}
            style={{
                padding: overlay ? null : '0px 5px 0px 0px',
                backgroundColor: hoverState ? glassPrimary : transparentColor
            }}
            id={`${id}/${channel_id}`}
            className={`message-container ${direct_message ? 'direct-message-container' : null}`}>
               
                <ProfileImage previous_message={previous_message} color={user?.color} current_message={current_message} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} user_image={user?.user_image} action={openUserPanel} />
                <div className='message-inner-container'>
                    <div id={`${id}-ctx-message-overlay`} className={'ctx-message-overlay'} />
                    <SenderInfo timeStamp={timeStamp} direct_message={direct_message} pin_to_profile={pin_to_profile} link={message.link} color={user?.color} profile_picture_shape={user?.profile_picture_shape} primaryColor={primaryColor} display_name={user?.display_name} user_image={user?.user_image} action={openUserPanel} persist={persist} id={id} accentColor={accentColor} hover={hoverState} textColor={textColor} perm={perm} index={index}  message={message} current_message={current_message} previous_message={previous_message} pinMessage={pinMessage} pinned={pinned} overlay={overlay} />
                    <MessageText loading={message.loading} color={textColor} text={message.text} />
                    {hideLinksOnMedia && (message.image || message.video || message.iFrame) || message.gallery ? null : message.link_preview ?
                    <LinkPreview data={message.link_preview} />
                    : <MessageLink link={message.link} />}
                    <Iframe marginRight={5}  link={message.iFrame} />
                    <MessageGallery gallery={message.gallery} expand={expandContent} />
                    {message.video_upload ?
                    <UploadedFileShare video={message.video_upload} />
                    : null}
                    {message.image && message.loading ?
                    <ProcessingIndicator />
                    :
                    message.image && !message.gallery ? 
                    <div 
                    style={{maxHeight: maximizeMediaSize ? '100%' : 350}}
                    className='message-image-container'>
                        <Image minLoadHeight={'300px'} altHeight={maximizeMediaSize ? '100%' : 350}  expandContent={expandContent} imgHeight='auto' cursor='pointer' width={null} altWidth={'100%'} loadingState='eager' objectFit='contain' image={message.image} />
                    </div>
                    : null}
                    {message.video ? 
                    <div 
                    style={{maxHeight: maximizeMediaSize ? '100%' : 350}}
                    className='message-outer-video-container'>
                        <Video maxHeight={maximizeMediaSize ? '100%' : 350} id={message.local_id} video={message.video} />
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
